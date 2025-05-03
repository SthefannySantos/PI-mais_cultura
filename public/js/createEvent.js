checkUserConnected();

document.getElementById('create-event').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const localEvento = document.getElementById('local').value;
    const organizador = document.getElementById('organizador').value;
    const dt_evento = document.getElementById('data').value;
    const fim_inscricao = document.getElementById('fim-inscricao').value;
    const categoria = document.getElementById('categoria').value;
    const maxParticipantes = document.getElementById('total').value;
    const desc = document.getElementById('descricao').value;
    const messageEl = document.getElementById('message');
    
    try {
        const response = await fetch('/events/createEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, desc, localEvento, categoria, organizador, dt_evento, fim_inscricao, maxParticipantes  })
        });
        
        const dataResponse = await response.json();
        
        if (response.ok) {
            messageEl.textContent = 'Evento cadastrado com sucesso!';
            messageEl.classList.remove('text-danger');
            messageEl.classList.add('text-success');
            window.location.href = '/admin/home'
        } else {
            messageEl.textContent = dataResponse.message;
            messageEl.classList.remove('text-success');
            messageEl.classList.add('text-danger');
        }
    } catch (error) {
        messageEl.textContent = 'Erro ao conectar ao servidor';
        messageEl.classList.add('text-danger');
    }
});

function checkUserConnected(){
    if(!localStorage.id || !localStorage.nome || !localStorage.email || !localStorage.acesso == 1){
        window.location.href='/login';
    } else {
        return
    }
}