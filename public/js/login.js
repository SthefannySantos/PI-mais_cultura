document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login bem-sucedido!');
        window.location.href = "/index.html"; // Redireciona para a página inicial
    } else {
        alert(data.mensagem || 'Login falhou!');
    }
});
