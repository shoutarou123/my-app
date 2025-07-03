// import { NextResponse } from "next/server";

// export async function GET() {
//   const res = await fetch('http://localhost:8000/slack-history');
//   const data = await res.json();
//   return NextResponse.json(data);
// }
const SLACK_USER_OAUTH_TOKEN = process.env.SLACK_USER_OAUTH_TOKEN;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const channel = searchParams.get("channel");
    if (!channel) {
      return new Response(JSON.stringify({ error: "channel is required" }), { status: 400 });
    }

    const res = await fetch(`http://localhost:8000/slack-history?channel=${channel}`);

    // HTTPエラー（404, 500等）
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return new Response(JSON.stringify({ error: "Backend error", details: errorData }), { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (error) {
    // ネットワークエラーや予期しない例外
    return new Response(JSON.stringify({ error: "Internal Server Error", details: String(error) }), { status: 500 });
  }

  //   const params = new URLSearchParams({ channel, limit: "15" });
  //   try {
  //     const res = await fetch("https://slack.com/api/conversations.history", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${SLACK_USER_OAUTH_TOKEN}`,
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: params.toString(),
  //     });
  //     if (!res.ok) throw new Error("データ取得に失敗しました");
  //     const data = await res.json();
  //     return new Response(JSON.stringify(data), { status: 200 });
  //   } catch (error) {
  //     console.error("データ取得エラー", error);
  //     throw error;
  //   }
}
