document.addEventListener('DOMContentLoaded', () => {
    const diasElemento = document.getElementById('dias');
    const mesElemento = document.getElementById('mes');
    const btnAnterior = document.getElementById('anterior');
    const btnProximo = document.getElementById('proximo');
    const btnBusca = document.getElementById('busca');
    
    // Elementos do Modal
    const modal = document.getElementById('modalEvento');
    const fecharModal = document.querySelector('.close-modal');
    const inputEvento = document.getElementById('inputEvento');
    const btnSalvar = document.getElementById('btnSalvar');
    const btnExcluir = document.getElementById('btnExcluir');
    const btnEditar = document.getElementById('btnEditar');
    
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let dataAtual = new Date();
    const hoje = new Date();
    let dataSelecionada = "";

    // Carregar eventos do LocalStorage
    let eventos = JSON.parse(localStorage.getItem('eventos_ssvp')) || {};

    function renderizarCalendario() {
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();

        const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
        const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();

        mesElemento.textContent = `${meses[mes]} ${ano}`;
        diasElemento.innerHTML = '';

        // Dias do mês anterior (vazios)
        const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();
        for (let i = primeiroDiaSemana; i > 0; i--) {
            const div = document.createElement('div');
            div.textContent = ultimoDiaMesAnterior - i + 1;
            div.classList.add('vazio');
            diasElemento.appendChild(div);
        }

        // Dias do mês atual
        for (let dia = 1; dia <= ultimoDiaMes; dia++) {
            const div = document.createElement('div');
            div.textContent = dia;
            const dataChave = `${ano}-${mes + 1}-${dia}`;
            const indiceDiaSemana = (primeiroDiaSemana + dia - 1) % 7;

            if (indiceDiaSemana === 0 || indiceDiaSemana === 6) div.classList.add('fim-de-semana');
            if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) div.classList.add('hoje');

            // Verifica se tem evento para marcar no calendário
            if (eventos[dataChave]) {
                div.classList.add('tem-evento');
            }

            // Clique no dia abre o modal
            div.addEventListener('click', () => abrirModal(dataChave));
            diasElemento.appendChild(div);
        }
        
        // Completar a última semana
        const totalCelulas = diasElemento.children.length;
        const diasRestantes = totalCelulas % 7 === 0 ? 0 : 7 - (totalCelulas % 7);
        for (let i = 1; i <= diasRestantes; i++) {
            const div = document.createElement('div');
            div.textContent = i;
            div.classList.add('vazio');
            diasElemento.appendChild(div);
        }
    }

    function abrirModal(dataChave) {
        dataSelecionada = dataChave;
        document.getElementById('modalDataTitulo').textContent = `Dia ${dataChave.split('-')[2]}`;
        
        if (eventos[dataChave]) {
            document.getElementById('visualizarEvento').style.display = 'block';
            document.getElementById('formEvento').style.display = 'none';
            document.getElementById('textoEventoExibicao').textContent = eventos[dataChave];
        } else {
            document.getElementById('visualizarEvento').style.display = 'none';
            document.getElementById('formEvento').style.display = 'block';
            inputEvento.value = "";
        }
        modal.style.display = 'flex';
    }

    btnSalvar.addEventListener('click', () => {
        const texto = inputEvento.value.trim();
        if (texto) {
            eventos[dataSelecionada] = texto;
            localStorage.setItem('eventos_ssvp', JSON.stringify(eventos));
            modal.style.display = 'none';
            renderizarCalendario();
        }
    });

    btnExcluir.addEventListener('click', () => {
        delete eventos[dataSelecionada];
        localStorage.setItem('eventos_ssvp', JSON.stringify(eventos));
        modal.style.display = 'none';
        renderizarCalendario();
    });

    btnEditar.addEventListener('click', () => {
        inputEvento.value = eventos[dataSelecionada];
        document.getElementById('visualizarEvento').style.display = 'none';
        document.getElementById('formEvento').style.display = 'block';
    });

    fecharModal.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };

    // --- Navegação ---
    btnAnterior.onclick = () => { dataAtual.setMonth(dataAtual.getMonth() - 1); renderizarCalendario(); };
    btnProximo.onclick = () => { dataAtual.setMonth(dataAtual.getMonth() + 1); renderizarCalendario(); };
    const painelBusca = document.getElementById('painelBusca');
    const buscaMes = document.getElementById('buscaMes');
    const buscaAno = document.getElementById('buscaAno');
    const confirmarBusca = document.getElementById('confirmarBusca');

    btnBusca.addEventListener('click', () => {
        painelBusca.style.display =
            painelBusca.style.display === 'flex' ? 'none' : 'flex';

        buscaMes.value = dataAtual.getMonth();
        buscaAno.value = dataAtual.getFullYear();
    });

    confirmarBusca.addEventListener('click', () => {
        const mes = parseInt(buscaMes.value);
        const ano = parseInt(buscaAno.value);

        if (isNaN(ano)) {
            alert("Digite um ano válido.");
            return;
        }

        dataAtual = new Date(ano, mes);
        renderizarCalendario();
        painelBusca.style.display = 'none';
    });
    renderizarCalendario();
});
function toggleMenu() {
  const menu = document.getElementById("sidebar");
  if (menu.style.width === "270px") {
    menu.style.width = "0";
  } else {
    menu.style.width = "270px";
  }
}

const botaoMenuPerfil = document.getElementById("botao-menu-perfil");
const menuPerfil = document.getElementById("menu-perfil");
const fecharMenu = document.getElementById("fechar-menu");

botaoMenuPerfil.addEventListener("click", () => {
    menuPerfil.classList.add("ativo");
});

fecharMenu.addEventListener("click", () => {
    menuPerfil.classList.remove("ativo");
});