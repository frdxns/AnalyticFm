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

    //PEGANDO A DIV DE CADA CONTEUDO
    const container = document.querySelector("#tops");

    container.classList.add("card");

    //LIMPANDO O CONTEUDO ANTES DE MOSTRAR NA TELA
    container.innerHTML = "";

    //MOSTRANDO NA TELA CADA CONTEUDO, ARTISTA, MUSICA E ALBUM, RESPECTIVAMENTE
    const alerta = document.querySelector(".alerta");
    if (topbruto != 404) {
      alerta.classList.remove("alerta-mostrar");
      topbruto.forEach(posicao => {
        const div_top = document.createElement("div");

        if (posicao.artista == undefined) {
          posicao.artista = "";
        }

        div_top.innerHTML = `<li><div id="posicao-rank"><h2><a href="${posicao.url}" target="_blank">${posicao.titulo}</a></h2> <a href="${posicao.url}" target = "_blank" rel="noopener noreferrer" class="nome-artista">${posicao.artista}</a></div> <p class="plays">${posicao.plays} plays</p></li>`;

        container.appendChild(div_top);
      });
    } else {
      alerta.classList.add("alerta-mostrar");
    }
  } catch (erro) {
    console.error("ocorreu um erro", erro);
  }
}

//MENU DE PESQUISA
const mostrarmenu = document.querySelector("#mostrar");
const nav = document.querySelector("#navegacao");
const icone = document.querySelector("header i");
const main = document.querySelector("main");
mostrarmenu.addEventListener("click", clicar);

function clicar() {
  nav.classList.toggle("mostrando");
  icone.classList.toggle("fa-bars");
  icone.classList.toggle("fa-xmark");
  main.classList.toggle("shifted");
}
