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
            localStorage.setItem('acesso', data.acesso);

            const path = localStorage.getItem('acesso') == 1 ? '/admin' : '/'
            window.location.href = path; // Redireciona para a página inicial ou adm
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
        window.location.href='/';
    } else{
        localStorage.clear()
    }
}

function showHidePassword(){
    const state = document.getElementById("password");
    const icon = document.getElementById("icon-password");

    if(state.type == "password"){
        state.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        state.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}