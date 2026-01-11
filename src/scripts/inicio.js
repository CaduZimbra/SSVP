let valorEmCaixa = 1500.00;
const elemento = document.getElementById('valorSaldo');
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

// Trecho do inicio.js que faz a mágica
function exibirCompromissoDashboard() {
    const container = document.getElementById('exibirProximoCompromisso');
    if (!container) return; // Segurança caso o elemento não exista na página

    const eventos = JSON.parse(localStorage.getItem('eventos_ssvp')) || {};
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let proximaData = null;
    let menorDiferenca = Infinity;

    for (let dataStr in eventos) {

        const partes = dataStr.split('-');
        const dataEvento = new Date(partes[0], partes[1] - 1, partes[2]);
        
        const diferenca = dataEvento - hoje;

        if (diferenca >= 0 && diferenca < menorDiferenca) {
            menorDiferenca = diferenca;
            proximaData = dataStr;
        }
    }

    if (proximaData) {
        const dataFormatada = proximaData.split('-').reverse().join('/');
        container.innerHTML = `
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Evento:</strong> ${eventos[proximaData]}</p>
        `;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    atualizarContadorFamilias();
});

function atualizarContadorFamilias() {
    const contadorElemento = document.querySelector('#familia p');
    
    if (contadorElemento) {
        const familias = JSON.parse(localStorage.getItem('familias_ssvp')) || [];
    
        contadorElemento.innerText = familias.length;
    }
}

