from fastapi import FastAPI # Fast APIの本体をｲﾝﾎﾟｰﾄ これでAPIｻｰﾊﾞｰを構築できる
from fastapi.middleware.cors import CORSMiddleware # CORS用のﾐﾄﾞﾙｳｪｱをｲﾝﾎﾟｰﾄ
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI() # FastAPIのｲﾝｽﾀﾝｽを作成 これがAPIｻｰﾊﾞｰの本体

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"], # Next.jsのURLを許可
    allow_credentials=True, # 認証情報（cookie）を含むﾘｸｴｽﾄも許可
    allow_methods=["*"], # 全てのHTTPﾒｿｯﾄﾞを許可
    allow_headers=["*"],
)

SLACK_USER_OAUTH_TOKEN = os.environ.get('SLACK_USER_OAUTH_TOKEN')

@app.get("/slack-history") # GET APIｴﾝﾄﾞﾎﾟｲﾝﾄ
def get_slack_history(channel: str): # ｸｴﾘﾊﾟﾗﾒｰﾀとしてchannelを受け取る strはｸｴﾘﾊﾟﾗﾒｰﾀのchannelを文字列で受け取る記述
    url = "https://slack.com/api/conversations.history"
    headers = {
      "Authorization": f"Bearer {SLACK_USER_OAUTH_TOKEN}"
    }
    params = {
      "channel": channel,
      "limit": 15
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()
