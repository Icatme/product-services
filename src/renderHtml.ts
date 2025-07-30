export function renderHtml(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Installation Tutorial & Exclusive Offers</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial;
            margin: 0;
            padding: 0;
            background: #f5f5f5;
            text-align: center;
          }
          .header {
            background: #ff6a00;
            color: #fff;
            padding: 20px 0;
            font-size: 22px;
            font-weight: bold;
          }
          .video {
            padding: 20px;
          }
          .video iframe {
            width: 100%;
            height: 200px;
            border-radius: 10px;
          }
          .gift {
            margin: 0 5%;
            background: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,.1);
          }
          .gift h3 {
            margin: 0 0 10px;
            color: #333;
          }
          .gift p {
            margin: 0 0 15px;
            font-size: 14px;
            color: #666;
          }
          form {
            display: flex;
            flex-direction: column;
          }
          input[type=email] {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 10px;
            font-size: 16px;
          }
          button {
            background: #ff6a00;
            color: #fff;
            border: none;
            padding: 12px;
            border-radius: 4px;
            font-size: 16px;
          }
          button:active {
            opacity: .8;
          }
          .footer {
            font-size: 12px;
            color: #999;
            padding: 10px;
          }
          .database-content {
            margin: 20px 5%;
            background: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,.1);
            text-align: left;
          }
          pre {
            overflow-x: auto;
            background: #f8f8f8;
            padding: 10px;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="header">30-Second Installation Tutorial</div>
        
        <div class="video">
          <iframe src="https://www.youtube.com/embed/your-video-id" frameborder="0" allowfullscreen></iframe>
        </div>
        
        <div class="gift">
          <h3>Get 6 Months Extended Warranty for Free</h3>
          <p>Leave your email, and we'll send the activation code within 2 minutes. No ads, ever.</p>
          <form action="/submitemail" method="post">
            <input type="email" name="email" placeholder="Enter your email" required>
            <input type="hidden" name="source" value="package_insert">
            <button type="submit">Claim Now</button>
          </form>
        </div>
        
        <div class="database-content">
          <h3>数据库内容</h3>
          <pre><code><span style="color: #0E838F">&gt; </span>SELECT * FROM comments LIMIT 3;<br>${content}</code></pre>
        </div>
        
        <div class="footer">© 2025 YourBrand All Rights Reserved</div>
      </body>
    </html>
`;
};
