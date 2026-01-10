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

function exibirCompromissoDashboard() {
    const container = document.getElementById('exibirProximoCompromisso');
    const eventos = JSON.parse(localStorage.getItem('eventos_ssvp')) || {};
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas os dias

    let proximaData = null;
    let menorDiferenca = Infinity;

    // Percorre todas as datas salvas
    for (let dataStr in eventos) {
        const dataEvento = new Date(dataStr); 
        // Se a dataStr for "2026-01-20", o JS Date trata corretamente
        
        const diferenca = dataEvento - hoje;

        // Se a data for hoje ou no futuro E for a mais próxima encontrada até agora
        if (diferenca >= 0 && diferenca < menorDiferenca) {
            menorDiferenca = diferenca;
            proximaData = dataStr;
        }
    }

    // Se encontrou algo, atualiza o HTML
    if (proximaData) {
        const dataFormatada = proximaData.split('-').reverse().join('/'); // Transforma YYYY-MM-DD em DD/MM/YYYY
        container.innerHTML = `
            <p><strong>Data:</strong> ${dataFormatada}</p>
            <p><strong>Evento:</strong> ${eventos[proximaData]}</p>
        `;
    }
}