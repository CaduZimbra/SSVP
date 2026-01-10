elemento.innerText = valorEmCaixa;

function toggleMenu() {
  const menu = document.getElementById("sidebar");
  if (menu.style.width === "250px") {
    menu.style.width = "0";
  } else {
    menu.style.width = "250px";
  }
}

function toggleAba(idElemento, botao) {
    const aba = document.getElementById(idElemento);
    const seta = botao.querySelector('.seta');

    aba.classList.toggle('aba-aberta');

    if (seta) {
        seta.classList.toggle('seta-girada');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    exibirCompromissoDashboard();
});
