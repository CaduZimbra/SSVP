document.addEventListener('DOMContentLoaded', () => {
    const diasElemento = document.getElementById('dias');
    const mesElemento = document.getElementById('mes');
    const btnAnterior = document.getElementById('anterior');
    const btnProximo = document.getElementById('proximo');

    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let dataAtual = new Date();
    const hoje = new Date();

    function renderizarCalendario() {
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth();

        const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
        const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();

        mesElemento.textContent = `${meses[mes]} ${ano}`;
        diasElemento.innerHTML = '';

        // 🔹 Dias do mês anterior
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

    const indiceDiaSemana = (primeiroDiaSemana + dia - 1) % 7;

    // Domingo (0) ou Sábado (6)
    if (indiceDiaSemana === 0 || indiceDiaSemana === 6) {
        div.classList.add('fim-de-semana');
    }

    // Dia de hoje
    if (
        dia === hoje.getDate() &&
        mes === hoje.getMonth() &&
        ano === hoje.getFullYear()
    ) {
        div.classList.add('hoje');
    }

    diasElemento.appendChild(div);
}

        //  Dias do próximo mês (completar semanas)
        const totalCelulas = diasElemento.children.length;
        const diasRestantes = totalCelulas % 7 === 0 ? 0 : 7 - (totalCelulas % 7);

        for (let i = 1; i <= diasRestantes; i++) {
            const div = document.createElement('div');
            div.textContent = i;
            div.classList.add('vazio');
            diasElemento.appendChild(div);
        }
    }

    btnAnterior.addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        renderizarCalendario();
    });

    btnProximo.addEventListener('click', () => {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
        renderizarCalendario();
    });

    renderizarCalendario();
});
