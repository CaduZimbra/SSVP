
const saldoDisplay = document.querySelector('#saldo h3:last-child');
const tipoOperacao = document.querySelector('#tipo-de-operacao');
const valorInput = document.querySelector('#valor-input');
const descricao =  document.querySelector('#descricao');
const btnEnviar = document.querySelector('#submit-operacao');
const extratoContainer = document.querySelector('#extrato');


let financeiro = JSON.parse(localStorage.getItem('minha_conta')) || {
    saldo: 0,
    historico: []
};

function atualizarTela() {

    saldoDisplay.innerText = financeiro.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });


    extratoContainer.innerHTML = '<h3 class = "name-extrato">Extrato</h3>';
    financeiro.historico.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-extrato';
        div.innerHTML = `
            <br>
            <p>Tipo: <strong>${item.tipo}</strong></p>
            <p>Descrição: ${item.descricao}</p>
            <p>Valor: ${item.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
             <p>Data: ${item.data}</p>
        `;
        extratoContainer.appendChild(div);
    });
}

function salvarDados() {
    localStorage.setItem('minha_conta', JSON.stringify(financeiro));
}


btnEnviar.addEventListener('click', () => {
    const valor = parseFloat(valorInput.value);
    const tipo = tipoOperacao.value;
    const descreve = descricao.value;

    if (isNaN(valor) || valor <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    if (tipo === 'entrada') {
        financeiro.saldo += valor;
    } else {
        if (valor > financeiro.saldo) {
            alert("Saldo insuficiente!");
            return;
        }
        financeiro.saldo -= valor;
    }

    const novaTransacao = {
        data: new Date().toLocaleDateString('pt-br') + ' ' + new Date().toLocaleTimeString('pt-br'),
        tipo: tipo.toUpperCase(),
        descricao: descreve,
        valor: valor
    };

    financeiro.historico.unshift(novaTransacao);

    salvarDados();
    atualizarTela();
    finalizarEnvio();


    valorInput.value = '';
});

function finalizarEnvio() {
    descricao.value = "";
    descricao.style.height = "auto"; 
    document.getElementById('valor-input').value = "";
}



atualizarTela();

