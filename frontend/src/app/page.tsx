"use client";

const SLACK_JISOU_TWEET_CHANNEL_ID = "C06EH0P13MW";

export default function Home() {
  const handleSlackApi = async () => {
    try {
      const res = await fetch(`/api/slack-history?channel=${SLACK_JISOU_TWEET_CHANNEL_ID}`);
      if (!res.ok) {
        const errData = await res.json();
        console.log("API Error", errData);
        return;
      }
      const data = await res.json();
      console.log("data", data);
    } catch (error) {
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
