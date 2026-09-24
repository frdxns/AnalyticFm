import requests, os, pprint
from dotenv import load_dotenv

load_dotenv()

URL = "http://ws.audioscrobbler.com/2.0/"
API_KEY = os.getenv("LASTFM_API_KEY")

def pegar_top_artistas(usuario):
    params = {
        "method": "user.gettopartists",
        "user": usuario,
        "api_key": API_KEY,
        "format": "json",
        "limit" : 5
    }

    response = requests.get(URL, params= params)

    return response.json()