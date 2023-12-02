document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector('form');
  const lista = document.createElement('ul');
  const limparCamposBtn = document.createElement('button');
  const excluirItemBtn = document.createElement('button');
  const excluirTodosBtn = document.createElement('button');
  const pesquisaInput = document.createElement('input');

  // Adiciona os botões e o input
  limparCamposBtn.textContent = 'Limpar Campos';
  excluirItemBtn.textContent = 'Excluir Item';
  excluirTodosBtn.textContent = 'Excluir Todos';
  pesquisaInput.placeholder = 'Pesquisar';

  formulario.insertAdjacentElement('afterend', limparCamposBtn);
  formulario.insertAdjacentElement('afterend', excluirItemBtn);
  formulario.insertAdjacentElement('afterend', excluirTodosBtn);
  formulario.insertAdjacentElement('afterend', pesquisaInput);
  formulario.insertAdjacentElement('afterend', lista);

  // Adiciona evento de submit ao formulário
  formulario.addEventListener('submit', function (event) {
      event.preventDefault();
      adicionarItem();
  });

  // Adiciona evento de clique para os botões
  limparCamposBtn.addEventListener('click', limparCampos);
  excluirItemBtn.addEventListener('click', excluirItem);
  excluirTodosBtn.addEventListener('click', excluirTodos);
  pesquisaInput.addEventListener('input', pesquisarItens);

  // Função para adicionar item à lista
  function adicionarItem() {
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      const mensagem = document.getElementById('mensagem').value;
      const dataEnvio = new Date().toLocaleString();

      const item = {
          nome,
          email,
          telefone,
          mensagem,
          dataEnvio,
      };

      // Adiciona o item à lista
      const listItem = document.createElement('li');
      listItem.textContent = `${nome} - ${email} - ${telefone} - ${mensagem} - ${dataEnvio}`;
      lista.appendChild(listItem);

      // Limpa os campos do formulário
      limparCampos();

      // Salva no local storage
      salvarNoLocalStorage(item);
  }

  // Função para limpar os campos do formulário
  function limparCampos() {
      formulario.reset();
  }

  // Função para excluir o item selecionado
  function excluirItem() {
      const selectedListItem = lista.querySelector('li:hover');
      if (selectedListItem) {
          lista.removeChild(selectedListItem);
          excluirDoLocalStorage(selectedListItem.textContent);
      }
  }

  // Função para excluir todos os itens da lista
  function excluirTodos() {
      while (lista.firstChild) {
          lista.removeChild(lista.firstChild);
      }
      limparLocalStorage();
  }

  // Função para pesquisar itens na lista
  function pesquisarItens() {
      const termoPesquisa = pesquisaInput.value.toLowerCase();
      const itens = lista.getElementsByTagName('li');

      Array.from(itens).forEach(function (item) {
          const textoItem = item.textContent.toLowerCase();
          item.style.display = textoItem.includes(termoPesquisa) ? 'block' : 'none';
      });
  }

  // Função para salvar item no local storage
  function salvarNoLocalStorage(item) {
      let itens = JSON.parse(localStorage.getItem('itens')) || [];
      itens.push(item);
      localStorage.setItem('itens', JSON.stringify(itens));
  }

  // Função para excluir item do local storage
  function excluirDoLocalStorage(textoItem) {
      let itens = JSON.parse(localStorage.getItem('itens')) || [];
      itens = itens.filter(item => item.nome !== textoItem);
      localStorage.setItem('itens', JSON.stringify(itens));
  }

  // Função para limpar o local storage
  function limparLocalStorage() {
      localStorage.removeItem('itens');
  }

  // Carrega os itens do local storage ao carregar a página
  function carregarItensLocalStorage() {
      let itens = JSON.parse(localStorage.getItem('itens')) || [];
      itens.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = `${item.nome} - ${item.email} - ${item.telefone} - ${item.mensagem} - ${item.dataEnvio}`;
          lista.appendChild(listItem);
      });
  }

  carregarItensLocalStorage();
});
