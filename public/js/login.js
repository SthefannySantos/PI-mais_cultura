checkUserConnected();

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const messageEl = document.getElementById('message');
    
    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('id', data.id);
            localStorage.setItem('nome', data.nome);
            localStorage.setItem('email', data.email);
            window.location.href = "/index.html"; // Redireciona para a página inicial
        } else {
            messageEl.textContent = data.message;
            messageEl.classList.remove('text-success');
            messageEl.classList.add('text-danger');
        }
    } catch (error) {
        messageEl.textContent = 'Erro ao conectar ao servidor';
        messageEl.classList.add('text-danger');
    }
});

function checkUserConnected(){
    if(localStorage.id && localStorage.nome && localStorage.email){
        window.location.href='/index.html';
    } else{
        localStorage.clear()
    }
}