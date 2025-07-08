"use client";

import { useState } from "react";

const SLACK_JISOU_TWEET_CHANNEL_ID = "C06EH0P13MW";

export default function Home() {
  const [oldestDate, setOldestDate] = useState("");
  const [latestDate, setLatestDate] = useState("");
  const [channelId, setChannelId] = useState("");

  const UnixTimestampFarmattedOldestDate = new Date(`${oldestDate}T00:00:00+09:00`).getTime() / 1000;

  const UnixtimestampFarmattedLatestDate = new Date(`${latestDate}T00:00:00+09:00`).getTime() / 1000;

  const handleSlackApi = async () => {
    try {
      const res = await fetch(
        `/api/slack-history?channel=${channelId}&oldest=${UnixTimestampFarmattedOldestDate}&latest=${UnixtimestampFarmattedLatestDate}`
      );
      if (!res.ok) {
        // responseは返ってきているが200以外
        const errData = await res.json();
        console.log("API Error", errData);
        return;
      }
      const data = await res.json();
      console.log("data", data);
    } catch (error) {
      // ﾈｯﾄﾜｰｸｴﾗｰやﾀｲﾑｱｳﾄなどﾚｽﾎﾟﾝｽが返ってこない時catchに入る
      console.log("Fetch Error", error);
    }
  };
  return (
    <div>
      <div>
        <label>チャンネルID</label>C06EH0P13MW
        <input
          className="border rounded-md p-1"
          placeholder="チャンネルIDを入力"
          type="text"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
         />
      </div>
      <div>
        <label>いつから</label>
        <input
          className="border rounded-md"
          type="date"
          value={oldestDate}
          onChange={(e) => setOldestDate(e.target.value)}
         />
      </div>
      <div>
        <label>いつまで</label>
        <input
          className="border rounded-md"
          type="date"
          value={latestDate}
          onChange={(e) => setLatestDate(e.target.value)}
        />
      </div>

      <button className="border rounded-md bg-teal-500" onClick={handleSlackApi}>
        Slackから履歴データ取得
      </button>
    </div>
  );
}
