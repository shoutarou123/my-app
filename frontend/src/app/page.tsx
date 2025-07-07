"use client";

const SLACK_JISOU_TWEET_CHANNEL_ID = "C06EH0P13MW";
const OLDEST = new Date("2025-07-06T00:00:00+09:00").getTime()/1000;
console.log(OLDEST); // 1751727600000
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

const LATEST = new Date("2025-07-07T00:00:00+09:00").getTime()/1000;

export default function Home() {
  const handleSlackApi = async () => {
    try {
      const res = await fetch(`/api/slack-history?channel=${SLACK_JISOU_TWEET_CHANNEL_ID}&oldest=${OLDEST}&latest=${LATEST}`);
      if (!res.ok) { // responseは返ってきているが200以外
        const errData = await res.json();
        console.log("API Error", errData);
        return;
      }
      const data = await res.json();
      console.log("data", data);
    } catch (error) { // ﾈｯﾄﾜｰｸｴﾗｰやﾀｲﾑｱｳﾄなどﾚｽﾎﾟﾝｽが返ってこない時catchに入る
      console.log("Fetch Error", error);
    }
  };
  return (
    <div>
      <button className="border" onClick={handleSlackApi}>
        Slackから履歴データ取得
      </button>
    </div>
  );
}
