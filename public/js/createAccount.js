checkUserConnected();

document.getElementById('cadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const messageEl = document.getElementById('message');
    
    try {
        const response = await fetch('/user/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });
        
        const data = await response.json()
        
        if (response.ok) {
            messageEl.textContent = data.message;
            messageEl.classList.add('text-success');
            window.location.href = "/login"; // Redireciona para a página de login (+seguro e n preciso fazer mais uma chamada no banco)
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
        window.location.href='/login';
    } else{
        localStorage.clear()
    }
}