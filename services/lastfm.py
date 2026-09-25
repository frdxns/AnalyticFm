import requests, os,pprint
from dotenv import load_dotenv

load_dotenv()

URL = "http://ws.audioscrobbler.com/2.0/"
API_KEY = os.getenv("LASTFM_API_KEY")

def pegar_top_artistas(usuario):
    params = {
        "method": "user.gettopartists",
        "period": "7day",
        "user": usuario,
        "api_key": API_KEY,
        "format": "json",
        "limit" : 5
    }

    response = requests.get(URL, params= params)

    return response.json()

def pegar_top_musicas(usuario):
    params = {
        "method": "user.gettoptracks",
        "period": "7day",
        "user": usuario,
        "api_key": API_KEY,
        "format": "json",
        "limit" : 5
    }

    response = requests.get(URL, params= params)

    return response.json()


def pegar_top_albuns(usuario):
    params = {
        "method": "user.gettopalbums",
        "user": usuario,
        "period": "7day",
        "api_key": API_KEY,
        "format": "json",
        "limit" : 5
    }

    response = requests.get(URL, params= params)

    return response.json()

def pegar_recentes(usuario):
    params = {
        "method": "user.getrecenttracks",
        "user": usuario,
        "extended" : 1,
        "api_key": API_KEY,
        "format": "json",
        "limit" : 1
        }
    
    response = requests.get(URL, params= params)
    
    return response.json()


dados = pegar_recentes("frdxns")
pprint.pprint(dados)
recentes = dados["recenttracks"]["track"]


if "@attr" in recentes[0]:
    if recentes[0]["@attr"]["nowplaying"]:
        print(recentes[0]["name"])
else:
    print(recentes[0]["name"])