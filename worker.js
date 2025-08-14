export default {
  async fetch(req) {
    if (req.method !== "POST") return new Response("POST only", { status: 405 });
    const { messages } = await req.json();

    // Provider: OpenAI
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        stream: true
      })
    });

    return new Response(upstream.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}