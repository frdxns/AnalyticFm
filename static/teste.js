fetch(`api/top-artistas/frdxns`)
  .then(response => response.json())
  .then(dados => {
    console.log(dados);
  });
