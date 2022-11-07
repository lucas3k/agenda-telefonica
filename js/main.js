// usando o modo restrito do javascript para "prevenir" erros
"use strict";

// eventos do botão de submit "o verdim"
const events = ["click", "touchstart"];

// selecionado os inputs e os demais campos que estou usando
const inpName = document.querySelector('[data-input-notebook="name"]');
const inpPhone = document.querySelector('[data-input-notebook="phone"]');
const btnNoteSubmit = document.querySelector('[data-btn="notebook-submit"]');
const insertList = document.querySelector('[data-list="insert-list"]');
const title = document.querySelector('[data-title="title-notebook"]');

// classe Note
class Note {
  constructor() {
    this.id = 1;
    this.arrayDado = [];
    this.editId = null;
  }
}

// classe handleNote estendendo os métodos e propriedades da classe Note
class HandleNote extends Note {
  constructor(id, nome, phone) {
    super(id);
    this.nome = nome;
    this.phone = phone;
  }

  // modelo da lista de contatos
  listModel(nome, telefone, id) {
    return `
      <li class="content-list-item">
        <section class="content-list-item-container">
          <p class="content-list-item-name">Nome: ${nome}</p>
          <span>-</span>
          <p class="content-list-item-phone">Telefone: ${telefone}</p>
        </section>

        <section class="content-list-item-container">
          <button
            class="content-list-item-button"
            onclick="handleNote.initEdit(${id})"
            type="button"
          >
            Editar
          </button>

          <button
            class="content-list-item-button"
            onclick="handleNote.delete(${id})"
            type="button"
          >
            Excluir
          </button>
        </section>
      </li>
    `;
  }

  // pegando os dados dos inputs e retornando um objeto com os dados dos inputs e o id
  getDados() {
    return {
      id: this.id,
      nome: inpName.value.trim(),
      phone: inpPhone.value.trim(),
    };

    /*
      obs: o trim() é usado para remover os espaços em branco no inicio e no final da string
    */
  }

  // validando os dados dos inputs se estão vazios ou não
  validate(dados) {
    if (dados.nome === "" || dados.phone === "") {
      // exibindo mensagem caso os inputs estejam vazios (sem valor)
      alert("Preencha todos os campos");
      return false;
    }

    return true;
  }

  // adicionando os dados do objeto no array e incrementando o id
  addNote(dados) {
    this.arrayDado.push(dados);
    this.id++;

    /*
      obs: o push() é usado para adicionar um item no final do array
    */
  }

  // mudando o texto do botão e do título
  changeText(textBtn, textTitle) {
    btnNoteSubmit.innerHTML = textBtn;
    title.innerHTML = textTitle;

    /*
      obs: o innerHTML é usado para inserir um conteúdo html dentro de um elemento
      elemento sendo as tag's h1, p, span, div, etc...
    */
  }

  //  setando os dados nos inputs (fazendo aparecer os valores no campos)
  setDados(name, phone) {
    inpName.value = name;
    inpPhone.value = phone;
  }

  /*
    setando os dados nos inputs e mudando o texto do botão e do título
    setando o editId com o id do item que será editado
    e pegando os dados dos itens que serão editados
  */
  initEdit(id) {
    this.editId = id;

    const dados = this.arrayDado.find((item) => item.id === id);

    /*
      obs: o find() é usado para encontrar um item no array
    */

    this.setDados(dados.nome, dados.phone);

    this.changeText("Salvar", "Editar contato");
  }

  // setando no array todos os items e substituindo o item que será editado
  editNote(id, dados) {
    this.arrayDado = this.arrayDado.map((item) => {
      if (item.id === id) {
        item = dados;
        item.id = id;
      }

      /*
        obs: o map() é usado para percorrer o array e retornar um novo array
      */

      return item;
    });
  }

  /*
    limpando os campos dos inputs e mudando o texto do botão e do título
    colocando o foco no primeiro input (input de nome!)
    setando o editId como null
  */
  clearFields() {
    this.setDados("", "");

    inpName.focus();

    /*
      obs: o focus() é usado para colocar o foco em um elemento
    */

    this.changeText("Adicionar", "Adicionar contato");

    this.editId = null;
  }

  // colocando na tela a lista de contatos (usando o innerHTML)
  listNote() {
    insertList.innerHTML = "";

    this.arrayDado.forEach((item) => {
      insertList.innerHTML += this.listModel(item.nome, item.phone, item.id);
    });

    /*
      obs: o forEach() é usado para percorrer o array
      igual ao for() {...}
    */
  }

  /*
    deletando um item do array
    e listando novamente os itens do array na tela
  */
  delete(id) {
    this.arrayDado = this.arrayDado.filter((item) => item.id !== id);

    /*
      obs: o filter() é usado para filtrar os itens do array
      como se fosse um filtro de café (rsrsrs)
    */

    this.listNote();
  }

  // onde estou chamando todos os métodos da classe HandleNote para poder funcionar a lógica
  // de adicionar, editar e excluir os contatos
  start() {
    const dados = this.getDados();

    if (this.validate(dados)) {
      if (!this.editId) {
        this.addNote(dados);
      } else {
        this.editNote(this.editId, dados);
      }

      this.listNote();
      this.clearFields();
    }
  }
}

const handleNote = new HandleNote();

const handleSubmit = (e) => {
  e.preventDefault();

  handleNote.start();
};

events.forEach((event) => btnNoteSubmit.addEventListener(event, handleSubmit));
/*
  obs: o addEventListener() é usado para adicionar um evento em um elemento
  sendo um evento como click, mouseover, mouseout, etc... evento de mouse, teclado, touch, etc...
*/
