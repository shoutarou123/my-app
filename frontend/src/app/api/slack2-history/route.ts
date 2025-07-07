
export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url);
    const cannel = searchParams.get("channel");
    if (!cannel) {
      return new Response(JSON.stringify({ error: "チャンネル無" }), { status: 400 });
    }
    const res = await fetch(`http://localhost:8000/slack-history?channel=${cannel}`);
    if(!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      return new Response(JSON.stringify({error: "Backend error", details: errorData}), { status: res.status})
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status});
  } catch(error) {
    return new Response(JSON.stringify({ error: "サーバーエラー", details: String(error)}), { status: 500 })
  }
}
