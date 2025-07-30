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
        const stmt = env.DB.prepare("INSERT OR IGNORE INTO emails (email, source) VALUES (?, ?)");
        await stmt.bind(email, source).run();
        
        return new Response("Email submitted successfully", {
          status: 200,
          headers: {
            "content-type": "text/html",
            "Refresh": "2; url=/",
          },
        });
      } catch (error) {
        console.error("Database error:", error);
        return new Response("Failed to save email"+email, { status: 500 });
      }
    }
    
    // Handle main page
    const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
    const { results } = await stmt.all();

    return new Response(renderHtml(JSON.stringify(results, null, 2)), {
      headers: {
        "content-type": "text/html",
      },
    });
  },
} satisfies ExportedHandler<Env>;
