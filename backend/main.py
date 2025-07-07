from fastapi import FastAPI # Fast APIの本体をｲﾝﾎﾟｰﾄ これでAPIｻｰﾊﾞｰを構築できる
from fastapi.middleware.cors import CORSMiddleware # CORS用のﾐﾄﾞﾙｳｪｱをｲﾝﾎﾟｰﾄ
import os
import requests
from dotenv import load_dotenv

load_dotenv() # .envの環境変数をPythonで使えるようにするもの

app = FastAPI() # FastAPIのｲﾝｽﾀﾝｽを作成 これがAPIｻｰﾊﾞｰの本体

app.add_middleware( # FastAPIにﾐﾄﾞﾙｳｪｱ(ﾘｸｴｽﾄやﾚｽﾎﾟﾝｽを横断的に処理する仕組み)を追加するﾒｿｯﾄﾞ
    CORSMiddleware, # 異なるｵﾘｼﾞﾝ(ﾄﾞﾒｲﾝやﾎﾟｰﾄ)からのﾘｸｴｽﾄを許可・制御するための仕組み
    allow_origins = ["http://localhost:3000"], # Next.jsのURLを許可
    allow_credentials=True, # 認証情報（cookie）を含むﾘｸｴｽﾄも許可
    allow_methods=["*"], # 全てのHTTPﾒｿｯﾄﾞを許可
    allow_headers=["*"], # 全てのﾍｯﾀﾞｰを許可
)

SLACK_USER_OAUTH_TOKEN = os.environ.get('SLACK_USER_OAUTH_TOKEN') # osはPythonの標準ﾗｲﾌﾞﾗﾘのosﾓｼﾞｭｰﾙ os.environは環境変数を管理する辞書のようなｵﾌﾞｼﾞｪｸﾄ

@app.get("/slack-history") # GET APIｴﾝﾄﾞﾎﾟｲﾝﾄ
def get_slack_history(channel: str, oldest: int, latest: int): # ｸｴﾘﾊﾟﾗﾒｰﾀとしてchannelを受け取る strはｸｴﾘﾊﾟﾗﾒｰﾀのchannelを文字列で受け取る記述
    url = "https://slack.com/api/conversations.history"
    headers = {
      "Authorization": f"Bearer {SLACK_USER_OAUTH_TOKEN}" # fを付けることで{}の中に変数や数式を埋め込める
    }
    params = {
      "channel": channel,
      "oldest": oldest,
      "latest": latest,
      "limit": 15
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()
