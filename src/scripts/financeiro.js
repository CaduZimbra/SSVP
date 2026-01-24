// Funções de Interface
function toggleMenu() {
    const menu = document.getElementById("sidebar");
    menu.style.width = (menu.style.width === "270px") ? "0" : "270px";
}

function abrirModal() {
    document.getElementById("modalCadastro").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalCadastro").style.display = "none";
}

function toggleAba(id, botao) {
    const conteudoInterno = document.getElementById(id);
    const seta = botao.querySelector('.seta');
    

    if (conteudoInterno.classList.contains('card-expandido')) {
        conteudoInterno.classList.remove('card-expandido');
        seta.style.transform = "rotate(0deg)";
    } else {
        conteudoInterno.classList.add('card-expandido');
        seta.style.transform = "rotate(180deg)";
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderizarAtas();

    const botoes = document.querySelectorAll('.tab-btn');
    const conteudos = document.querySelectorAll('.aba-conteudo');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            botoes.forEach(b => b.classList.remove('active'));
            conteudos.forEach(c => c.classList.remove('aba-aberta'));
            botao.classList.add('active');
            const idConteudo = botao.getAttribute('data-tab');
            document.getElementById(idConteudo).classList.add('aba-aberta');
        });
    });

    // Menu Perfil
    const botaoMenuPerfil = document.getElementById("botao-menu-perfil");
    const menuPerfil = document.getElementById("menu-perfil");
    const fecharMenu = document.getElementById("fechar-menu");

    if(botaoMenuPerfil) {
        botaoMenuPerfil.addEventListener("click", () => menuPerfil.classList.add("ativo"));
    }
    if(fecharMenu) {
        fecharMenu.addEventListener("click", () => menuPerfil.classList.remove("ativo"));
    }

    // Salvar Nova Ata
    const formAta = document.getElementById('formAtaReuniao');
    if (formAta) {
        formAta.addEventListener('submit', (e) => {
            e.preventDefault();

            const novaAta = {
                id: Date.now(),
                numero: document.getElementById('NumeroAta').value,
                membros: document.getElementById('Num').value,
                data: document.getElementById('dataAta').value,
                inicio: document.getElementById('inicioAta').value,
                coleta: document.getElementById('coletaAta').value,
                escala: document.getElementById('escalaAta').value,
                obras: document.getElementById('obrasAta').value,
                pendencias: document.getElementById('pendenciasAta').value,
                termino: document.getElementById('terminoAta').value
            };

            let atas = JSON.parse(localStorage.getItem('atas_ssvp')) || [];
            atas.push(novaAta);
            localStorage.setItem('atas_ssvp', JSON.stringify(atas));

            formAta.reset();
            fecharModal();
            renderizarAtas(); 
        });
    }
});

function renderizarAtas() {
    const listaContainer = document.getElementById('AtasReunioes');
    if (!listaContainer) return;

    const atas = JSON.parse(localStorage.getItem('atas_ssvp')) || [];
    
    if (atas.length === 0) {
        listaContainer.innerHTML = '<p style="color: #666; margin-top: 20px;">Nenhuma ata registrada.</p>';
        return;
    }

    listaContainer.innerHTML = ''; 

    atas.forEach(ata => {
        const card = document.createElement('div');
        card.className = 'itemPainelFim'; 
        card.innerHTML = `
    <div class="conteudoEscala">
        <h3>Ata Nº ${ata.numero}</h3>
        <button class="botaoAba" onclick="toggleAba('info-ata-${ata.id}', this)">
            <img src="../assets/setaBaixo.png" class="seta">
        </button>
    </div>
    <div class="aba-conteudo-detalhe" id="info-ata-${ata.id}">
        <div class="detalhes-grid" style="padding: 20px; text-align: left; color: white;">
            <p><strong>Data:</strong> ${ata.data.split('-').reverse().join('/')}</p>
            <p><strong>Membros:</strong> ${ata.membros}</p>
            <hr>
            <p><strong>Início:</strong> ${ata.inicio || '-'}</p>
            <p><strong>Coleta:</strong> ${ata.coleta || '-'}</p>
            <p><strong>Escala:</strong> ${ata.escala || '-'}</p>
            <p><strong>Obras Espirituais:</strong> ${ata.obras || '-'}</p>
            <p><strong>Pendências:</strong> ${ata.pendencias || '-'}</p>
            <p><strong>Término:</strong> ${ata.termino || '-'}</p>
            <button onclick="excluirAta(${ata.id})" class="btn-excluir">Remover Registro</button>
        </div>
    </div>
`;
        listaContainer.appendChild(card);
    });
}

function excluirAta(id) {
    if(confirm("Deseja remover esta ata?")) {
        let atas = JSON.parse(localStorage.getItem('atas_ssvp')) || [];
        atas = atas.filter(a => a.id !== id);
        localStorage.setItem('atas_ssvp', JSON.stringify(atas));
        
        renderizarAtas();
    }
}