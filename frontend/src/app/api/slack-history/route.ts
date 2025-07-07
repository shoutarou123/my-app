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
    const oldest = searchParams.get("oldest");
    const latest = searchParams.get("latest");
    if (!channel) {
      return new Response(JSON.stringify({ error: "channel is required" }), { status: 400 }); // JSONはｵﾌﾞｼﾞｪｸﾄのままだとｴﾗｰになるので文字列にする
    }

    const res = await fetch(`http://localhost:8000/slack-history?channel=${channel}&oldest=${oldest}&latest=${latest}`);

    // HTTPエラー（404, 500等）
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({})); // responseがJSONでない場合や空の場合にｴﾗｰをそのままにしておくとPromiseがrejectされたままになり未処理の例外になる。そのためcatch()で捕まえてｴﾗｰが発生しても空のｵﾌﾞｼﾞｪｸﾄを返すことで以降の処理が安全に進むようにしている。ｴﾗｰ発生時そのまま例外が伝播しAPI全体が500ｴﾗｰになるのど、意図しない動作やﾃﾞﾊﾞｯｸﾞ困難なｴﾗｰになる可能性がある
      return new Response(JSON.stringify({ error: "Backend error", details: errorData }), { status: res.status }); // error, detailsは予約語でも何でもなく好きなｷｰ名にすることができる。ここではﾊﾞｯｸｴﾝﾄﾞから返ってきたものをﾌﾛﾝﾄに返している。
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status });

  } catch (error) { // errorにはｴﾗｰｵﾌﾞｼﾞｪｸﾄが入っている名称は任意の変数でよい,messageやname、stackなどのﾌﾟﾛﾊﾟﾃｨを持つ
    // ネットワークエラーや予期しない例外
    return new Response(JSON.stringify({ error: "Internal Server Error", details: String(error) }), { status: 500 }); // errorは文字列にしないと使えないJSON.stringifyすると空のｵﾌﾞｼﾞｪｸﾄになってしまう。文字列にﾊﾟｰｽしてdetailsに格納している。
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
