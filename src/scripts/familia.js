// --- FUNÇÕES GLOBAIS (O HTML as chama diretamente) ---

function abrirModal() {
    document.getElementById("modalCadastro").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalCadastro").style.display = "none";
}
function adicionarCampoMembro() {
    const container = document.getElementById("areaMembros");
    const div = document.createElement("div");
    div.className = "membroMais";
    div.innerHTML = `
        <input type="text" class="membro-input" placeholder="Nome do membro">
        <button type="button" onclick="this.parentElement.remove()" class="btn-add" style="background:#ff4d4d">-</button>
    `;
    container.appendChild(div);
}

function excluirFamilia(id) {
    if(confirm("Deseja remover esta família?")) {
        let familias = JSON.parse(localStorage.getItem('familias_ssvp')) || [];
        familias = familias.filter(f => f.id !== id);
        localStorage.setItem('familias_ssvp', JSON.stringify(familias));
        renderizarFamilias();
    }
}

function toggleAba(id, botao) {
    const aba = document.getElementById(id);
    const seta = botao.querySelector('.seta');
    if (aba.classList.contains('aba-aberta')) {
        aba.classList.remove('aba-aberta');
        seta.style.transform = "rotate(0deg)";
    } else {
        aba.classList.add('aba-aberta');
        seta.style.transform = "rotate(180deg)";
    }
}



function renderizarFamilias() {
    const listaContainer = document.getElementById('listaFamilias');
    if (!listaContainer) return;

    const familias = JSON.parse(localStorage.getItem('familias_ssvp')) || [];
    listaContainer.innerHTML = ''; 

    familias.forEach(f => {
        const card = document.createElement('div');
        card.className = 'itemPainelFim'; 
        card.innerHTML = `
            <div class="conteudoEscala">
                <h3>${f.nome}</h3>
                <button class="botaoAba" onclick="toggleAba('info-${f.id}', this)">
                    <img src="../assets/setaBaixo.png" class="seta">
                </button>
            </div>
            <div class="aba-conteudo" id="info-${f.id}">
                <div style="padding: 20px; color: white;">
                    <p><strong>Membros:</strong> ${f.membros}</p>
                    <p><strong>CPF:</strong> ${f.cpf}</p>
                    <p><strong>Endereço:</strong> ${f.endereco}</p>
                    <p><strong>Data:</strong> ${f.data.split('-').reverse().join('/')}</p>
                    <button onclick="excluirFamilia(${f.id})" style="margin-top:15px; background:#ff4d4d; color:white; border:none; padding:8px 15px; border-radius:5px; cursor:pointer;">Remover</button>
                </div>
            </div>
        `;
        listaContainer.appendChild(card);
    });
}
function toggleMenu() {
  const menu = document.getElementById("sidebar");
  if (menu.style.width === "250px") {
    menu.style.width = "0";
  } else {
    menu.style.width = "250px";
  }
}
document.addEventListener('DOMContentLoaded', () => {
    renderizarFamilias();

    const form = document.getElementById('formFamilia');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputsMembros = document.querySelectorAll('.membro-input');
            const listaMembros = Array.from(inputsMembros).map(i => i.value).filter(v => v !== "");

            const novaFamilia = {
                id: Date.now(),
                nome: document.getElementById('nomeFamilia').value,
                membros: listaMembros.join(", "),
                cpf: document.getElementById('cpf').value,
                endereco: document.getElementById('endereco').value,
                data: document.getElementById('dataAdmissao').value
            };

            let familias = JSON.parse(localStorage.getItem('familias_ssvp')) || [];
            familias.push(novaFamilia);
            localStorage.setItem('familias_ssvp', JSON.stringify(familias));

            form.reset();
            fecharModal();
            renderizarFamilias();
        });
    }
});