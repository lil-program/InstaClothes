import json
import os
from typing import Dict

import requests
from dotenv import load_dotenv

load_dotenv(override=True)


# テスター1のIDトークンを取得
def generate_tester1_token_header() -> Dict[str, str]:
    API_KEY = os.environ.get("API_KEY")
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"
    payload = json.dumps(
        {
            "email": os.environ.get("TESTER1_MAIL"),
            "password": os.environ.get("TESTER1_PASSWORD"),
            "returnSecureToken": True,
        }
    )
    response = requests.post(
        url, data=payload, headers={"Content-Type": "application/json"}
    )
    id_token = response.json().get("idToken")

    return {"Authorization": f"Bearer {id_token}"}
