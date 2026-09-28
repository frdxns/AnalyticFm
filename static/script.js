const botao = document.querySelector("#buscar");
const metodos = document.querySelector("#metodos");
const periodos = document.querySelector("#periodos");
const limites = document.querySelector("#limite");

botao.addEventListener("click", buscardados);
metodos.addEventListener("change", buscardados);
periodos.addEventListener("change", buscardados);
limites.addEventListener("change", buscardados);

async function buscardados() {
  try {
    const username = document.querySelector("#username").value;
    const metodo = document.querySelector("#metodos").value;
    const periodo = document.querySelector("#periodos").value;
    const limite = document.querySelector("#limite").value;
    let metodoselecionado;
    let periodoselecionado;

    if (metodo == "Artistas") {
      metodoselecionado = "user.gettopartists";
      console.log(metodoselecionado);
    } else if (metodo == "Musicas") {
      metodoselecionado = "user.gettoptracks";
    } else if (metodo == "Albuns") {
      metodoselecionado = "user.gettopalbums";
    }

    if (periodo == "7") {
      periodoselecionado = "7day";
    } else if (periodo == "30") {
      periodoselecionado = "1month";
    } else if (periodo == "90") {
      periodoselecionado = "3month";
    } else if (periodo == "180") {
      periodoselecionado = "6month";
    } else if (periodo == "365") {
      periodoselecionado = "12month";
    } else if (periodo == "tudo") {
      periodoselecionado == "overall";
    }

    //PEGANDO OS DADOS DA API
    //DADOS DE ARTISTAS
    const resposta = await fetch(
      `api/top-artistas/${username}/${metodoselecionado}/${periodoselecionado}/${limite}`,
    );
    const respostajson = await resposta.json();
    const topbruto = JSON.parse(respostajson);
    console.log(topbruto);

    //PEGANDO A DIV DE CADA CONTEUDO
    const container = document.querySelector("#artistas");

    container.classList.add("card");

    //LIMPANDO O CONTEUDO ANTES DE MOSTRAR NA TELA
    container.innerHTML = "";

    //MOSTRANDO NA TELA CADA CONTEUDO, ARTISTA, MUSICA E ALBUM, RESPECTIVAMENTE
    topbruto.forEach(posicao => {
      const div_top = document.createElement("div");

      if (posicao.artista == undefined) {
        posicao.artista = "";
      }

      div_top.innerHTML = `<h2> ${posicao.titulo}</h2> <div id="posicaoartista"><p id="partista">${posicao.artista}</p> <p id="plays">${posicao.plays} plays</p></div>`;

      container.appendChild(div_top);
    });
  } catch (erro) {
    console.error("ocorreu um erro", erro);
  }
}

mostrarmenu = document.querySelector("#mostrar");
nav = document.querySelector("#navegacao");

mostrarmenu.addEventListener("click", clicar);

function clicar() {
  if (navegacao.style.display == "block") {
    navegacao.style.display = "none";
  } else {
    navegacao.style.display = "block";
  }
}
