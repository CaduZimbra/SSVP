let valorEmCaixa = 1500.00;
const elemento = document.getElementById('valorSaldo');
elemento.innerText = valorEmCaixa;

const botao = document.getElementById('ultimaEscala');
const abaUltima = document.getElementById('abaUltima');

botao.addEventListener('click', function(){
    abaUltima.classList.toggle('destaque')
});

const botaoDois = document.getElementById('proximaEscala');
const abaProxima = document.getElementById('abaProxima');

botaoDois.addEventListener('click', function(){
    abaProxima.classList.toggle('destaque')
});

const botaoTres = document.getElementById('menuLateral');
const conteudoMenu = document.getElementById('barra');

botaoTres.addEventListener('click',  function(){
    conteudoMenu.classList.toggle('barraLateral')
});
