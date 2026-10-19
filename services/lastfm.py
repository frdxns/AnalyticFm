import requests, os, json
from dotenv import load_dotenv

load_dotenv()

URL = "http://ws.audioscrobbler.com/2.0/"
API_KEY = os.getenv("LASTFM_API_KEY")

def pegar_top_artistas2(usuario, metodo, periodo, limite):
    params = {
        "method": metodo,
        "period": periodo,
        "user": usuario,
        "api_key": API_KEY,
        "format": "json",
        "limit" : limite
    }

    response = requests.get(URL, params= params)

    if response.status_code == 200:
    
        dados = response.json()

        if metodo == "user.gettopartists":
            artistas = dados["topartists"]["artist"]
            dadosformatados = [{
                "titulo": artista["name"],
                "plays": artista["playcount"],
                "url": artista["url"]
            }for artista in artistas]

        elif metodo == "user.gettoptracks":
            musicas = dados["toptracks"]["track"]
            dadosformatados = [{
                "titulo": musica["name"],
                "artista": musica["artist"]["name"],
                "plays": musica["playcount"],
                "url": musica["url"]
            }for musica in musicas]

        elif metodo == "user.gettopalbums":
            albuns = dados["topalbums"]["album"]
            dadosformatados = [{
                "titulo": album["name"],
                "artista": album["artist"]["name"],
                "plays": album["playcount"],
                "url": album["url"]
            }for album in albuns]

        dadosfinal = json.dumps(dadosformatados)
        return dadosfinal   
    elif response.status_code == 404:
        return 404
    else:
        return "ERRO"