from flask import Flask, jsonify, render_template
from services.lastfm import *
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/top-artistas/<usuario>/<metodo>/<periodo>/<limite>")
def top_artistas(usuario, metodo, periodo, limite):
    dados = pegar_top_artistas2(usuario, metodo, periodo, limite)
    return jsonify(dados)

if __name__ == "__main__":
    app.run(debug=True)