import { renderHtml } from "./renderHtml";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle email submission
    if (request.method === "POST" && url.pathname === "/submitemail") {
      const formData = await request.formData();
      const email = formData.get("email");
      const source = formData.get("source") || "package_insert";
      
      if (!email || typeof email !== "string") {
        return new Response("Invalid email", { status: 400 });
      }
      
      try {
        await env.DB.prepare("INSERT OR IGNORE INTO emails (email, source) VALUES (?, ?)")
          .bind(email, source)
          .run();
        
        return new Response("<html><body><h1>Email submitted successfully</h1><p>Redirecting to home page...</p><script>setTimeout(() => window.location.href='/', 2000)</script></body></html>", {
          status: 200,
          headers: {
            "content-type": "text/html; charset=utf-8",
          },
        });
      } catch (error) {
        console.error("Database error:", error);
        return new Response("Failed to save email: " + email + " Error: " + (error instanceof Error ? error.message : String(error)), { status: 500 });
      }
    }
    
    // Debug endpoint to check database
    if (url.pathname === "/debug") {
      try {
        const tables = await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
        const emails = await env.DB.prepare("SELECT COUNT(*) as count FROM emails").all();
        const recentEmails = await env.DB.prepare("SELECT email, created_at FROM emails ORDER BY created_at DESC LIMIT 5").all();
        return new Response(JSON.stringify({ 
          tables: tables.results || [], 
          email_count: emails.results?.[0]?.count || 0,
          recent_emails: recentEmails.results || []
        }, null, 2), {
          headers: { "content-type": "application/json" }
        });
      } catch (error) {
        return new Response("Debug error: " + (error instanceof Error ? error.message : String(error)), {
          headers: { "content-type": "text/plain" }
        });
      }
    }

    // Handle main page - show installation tutorial page
    return new Response(renderHtml(""), {
      headers: {
        "content-type": "text/html",
      },
    });
  },
} satisfies ExportedHandler<Env>;
