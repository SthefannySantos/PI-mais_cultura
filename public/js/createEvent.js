checkUserConnected();

document.getElementById('create-event').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('localEvento', document.getElementById('local').value);
    formData.append('organizador', document.getElementById('organizador').value);
    formData.append('dt_evento', document.getElementById('data').value);
    formData.append('fim_inscricao', document.getElementById('fim-inscricao').value);
    formData.append('categoria', document.getElementById('categoria').value);
    formData.append('maxParticipantes', document.getElementById('total').value);
    formData.append('desc', document.getElementById('descricao').value);

    // Pega o arquivo da imagem
    const imagemInput = document.getElementById('imagem');
    if(imagemInput.files.length > 0) {
        formData.append('imagem', imagemInput.files[0]);
    }

    try {
        const response = await fetch('/events/createEvent', {
            method: 'POST',
            body: formData, // importante: sem headers Content-Type
        });

        const dataResponse = await response.json();

        const messageEl = document.getElementById('message');
        if (response.ok) {
            messageEl.textContent = 'Evento cadastrado com sucesso!';
            messageEl.classList.remove('text-danger');
            messageEl.classList.add('text-success');
            window.location.href = '/admin/home';
        } else {
            messageEl.textContent = dataResponse.message;
            messageEl.classList.remove('text-success');
            messageEl.classList.add('text-danger');
        }
    } catch (error) {
        const messageEl = document.getElementById('message');
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