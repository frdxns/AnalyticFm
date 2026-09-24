from flask import Flask, jsonify, render_template
from services.lastfm import pegar_top_artistas
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/top-artistas/<usuario>")
def top_artistas(usuario):
    dados = pegar_top_artistas(usuario)
    return jsonify(dados)


if __name__ == "__main__":
    app.run(debug=True)