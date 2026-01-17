
function toggleMenu() {
  const menu = document.getElementById("sidebar");
  if (menu.style.width === "270px") {
    menu.style.width = "0";
  } else {
    menu.style.width = "270px";
  }
}

const botoes = document.querySelectorAll('.tab-btn');
const conteudos = document.querySelectorAll('.aba-conteudo');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {

    // 1. Remove active de todos os botões
    botoes.forEach(b => b.classList.remove('active'));

    // 2. Fecha todos os conteúdos
    conteudos.forEach(c => c.classList.remove('aba-aberta'));

    // 3. Ativa o botão clicado
    botao.classList.add('active');

    // 4. Abre o conteúdo correspondente
    const idConteudo = botao.getAttribute('data-tab');
    const conteudo = document.getElementById(idConteudo);

    conteudo.classList.add('aba-aberta');
  });
});

const botaoMenuPerfil = document.getElementById("botao-menu-perfil");
const menuPerfil = document.getElementById("menu-perfil");
const fecharMenu = document.getElementById("fechar-menu");

botaoMenuPerfil.addEventListener("click", () => {
    menuPerfil.classList.add("ativo");
});

fecharMenu.addEventListener("click", () => {
    menuPerfil.classList.remove("ativo");
});