let receitas;

buscarReceitas();

function buscarReceitas() {
  const promessa = axios.get("http://localhost:4000/receitas");
  promessa.then(popularReceitas);
}

//Pegar todas as receitas (resposta da API) e joga na variavel receitas - ETAPA 2
function popularReceitas(resposta) {
  console.log("Ordem de execução: 2 - popularReceitas()");
  console.log(resposta);

  //Deu bom na chamada do GET
  if (resposta.status === 200) {
    console.log("Deuuu boooom");
  }
  receitas = resposta.data;
  renderizarReceitas();
}

// Itera sob o array de receitas e coloca cada receita no DOM - ETAPA 3
function renderizarReceitas() {
  console.log("Ordem de execução: 3 - renderizarReceitas()");
  const ulReceitas = document.querySelector(".receitas");
  ulReceitas.innerHTML = "";

  for (let i = 0; i < receitas.length; i++) {
    ulReceitas.innerHTML += `
            <li>
                <ion-icon name="fast-food-outline"></ion-icon>
                ${receitas[i].titulo}
            </li>   
        `;
  }
}

function cadastrarReceita() {
  const nome = document.querySelector(".nome-receita").value;
  const ingredientes = document.querySelector(".ingredientes-receita").value;
  const preparo = document.querySelector(".modo-preparo-receita").value;

  const novaReceita = {
    titulo: nome,
    ingredientes: ingredientes,
    preparo: preparo
  };

  console.log(novaReceita);

  //Vou pegar a promise de retorno do envio para API - Quero pegar pode pode dar bom ou pode dar ruim
  const promise = axios.post("http://localhost:4000/receitas",novaReceita);
  //Quando a promise é resolvida com SUCESSO
  promise.then(buscarReceitas);
  //Quando a promise é resolvida com FALHA (API pode tá fora, ou você mandou uma receita errada)
  promise.catch(alertaErro);
}
//Vai executar somente quando der ruim no POST
function alertaErro(error) {
  console.log(error.response.status);
  if (error.response.status === 404) {
    alert("Não foi encontrado!");
  }
  //Quando falta algum campo na receita
  if (error.response.status === 422) {
    alert("Verique todos os campos da receita!");
  }
  //Quando o título já existe
  if (error.response.status === 409) {
    alert("Já existe uma receita com esse título!");
  }
}