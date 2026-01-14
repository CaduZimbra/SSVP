document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.querySelector('form');

    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();

        
        const emailDigitado = document.getElementById('email').value;
        const senhaDigitada = document.getElementById('password').value;

        
        const usuarioSalvoTexto = localStorage.getItem('usuarioSSVP');

        
        if (!usuarioSalvoTexto) {
            alert('Nenhum usuário cadastrado! Vá em "Registrar-se" primeiro.');
            return;
        }

        
        const usuarioSalvo = JSON.parse(usuarioSalvoTexto);

        
        if (emailDigitado === usuarioSalvo.emailSalvo && senhaDigitada === usuarioSalvo.senhaSalva) {
            
            alert('Bem-vindo de volta, ' + usuarioSalvo.nomeSalvo + '!');
            window.location.href = '../pages/inicio.html'; 

        } else {
            alert('Email ou senha incorretos!');
        }
    });
});