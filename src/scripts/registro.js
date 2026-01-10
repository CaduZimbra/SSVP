document.addEventListener('DOMContentLoaded', function() {
    const formRegistro = document.querySelector('form');

    formRegistro.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Pegar os dados dos campos
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;


        // Usuário
        const usuario = {
            nomeSalvo: nome,
            emailSalvo: email,
            senhaSalva: senha
        };

        // 3. Salvando no localStorage do navegador
        localStorage.setItem('usuarioSSVP', JSON.stringify(usuario));

        alert('Conta criada com sucesso! Agora faça o login.');

        
        window.location.href = '../index.html';
    });
});