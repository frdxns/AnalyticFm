const botao = document.querySelector("#buscar");

botao.addEventListener("click", async () => {
  const username = document.querySelector("#username").value;

  console.log(username);

  const resposta = await fetch(`api/top-artistas/${username}`);

  const dados = await resposta.json();

  const artistas = dados.topartists.artist;

  const container = document.querySelector("#artistas");

  container.innerHTML = "";

  artistas.forEach(artista => {
    const div = document.createElement("div");

    div.innerHTML = `<h2> ${artista.name}</h2> <p>${artista.playcount} plays</p>`;

    container.appendChild(div);
  });
});
