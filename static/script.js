const botao = document.querySelector("#buscar");

botao.addEventListener("click", async () => {
  //pegando nome de usuario digitado
  const username = document.querySelector("#username").value;

  //PEGANDO OS DADOS DA API
  //DADOS DE ARTISTAS
  const resposta_artistas = await fetch(`api/top-artistas/${username}`);
  const top_artistas = await resposta_artistas.json();
  const artistas = top_artistas.topartists.artist;

  //DADOS DE MUSICAS
  const resposta_musicas = await fetch(`api/top-musicas/${username}`);
  const top_musicas = await resposta_musicas.json();
  const musicas = top_musicas.toptracks.track;

  //DADOS DE ALBUNS
  const resposta_albuns = await fetch(`api/top-albuns/${username}`);
  const top_albuns = await resposta_albuns.json();
  const albuns = top_albuns.topalbums.album;

  //PEGANDO A DIV DE CADA CONTEUDO
  const container_artistas = document.querySelector("#artistas");
  const container_musicas = document.querySelector("#musicas");
  const container_albuns = document.querySelector("#albuns");

  container_albuns.classList.add("card");
  container_musicas.classList.add("card");
  container_artistas.classList.add("card");

  //LIMPANDO O CONTEUDO ANTES DE MOSTRAR NA TELA
  container_artistas.innerHTML = "";
  container_musicas.innerHTML = "";
  container_albuns.innerHTML = "";

  //MOSTRANDO NA TELA CADA CONTEUDO, ARTISTA, MUSICA E ALBUM, RESPECTIVAMENTE
  artistas.forEach(artista => {
    const div_artistas = document.createElement("div");

    div_artistas.innerHTML = `<h2> ${artista.name}</h2> <p>${artista.playcount} plays</p>`;

    container_artistas.appendChild(div_artistas);
  });

  musicas.forEach(musica => {
    const div_musicas = document.createElement("div");

    div_musicas.innerHTML = `<h2>${musica.name}</h2> <p>${musica.playcount} plays</p>`;

    container_musicas.appendChild(div_musicas);
  });

  albuns.forEach(album => {
    const div_albuns = document.createElement("div");

    div_albuns.innerHTML = `<h2>${album.name}</h2> <p>${album.playcount} plays</p>`;

    container_albuns.appendChild(div_albuns);
  });
});
