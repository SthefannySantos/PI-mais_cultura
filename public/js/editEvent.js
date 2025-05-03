const params = new URLSearchParams(window.location.search);
const id = params.get('id');

checkUserConnected();

function formatarDataHora(data) {
    const d = new Date(data);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    const horas = String(d.getHours()).padStart(2, '0');
    const minutos = String(d.getMinutes()).padStart(2, '0');
    return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
}

function formatarData(data) {
    const d = new Date(data);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

async function carregarEvento() {
    try {
    const response = await fetch(`/events/eventData/${id}`);
    const eventData = await response.json();

    document.getElementById('titulo').value = eventData.titulo;
    document.getElementById('descricao').value = eventData.descricao;
    document.getElementById('local').value = eventData.local_evento;
    document.getElementById('categoria').value = eventData.categoria;   
    document.getElementById('organizador').value = eventData.organizador_evento;
    document.getElementById('data').value = formatarDataHora(eventData.dt_evento);
    document.getElementById('fim-inscricao').value = formatarData(eventData.fim_inscricao);
    document.getElementById('total').value = eventData.limite_participantes;

    } catch (error) {
        console.log('Erro ao procurar evento')
    }   
};

function checkUserConnected(){
    if(!localStorage.id || !localStorage.nome || !localStorage.email || !localStorage.acesso == 1){
        window.location.href='/login';
    } else {
        return
    }
}

carregarEvento()


document.getElementById('edit-event').addEventListener('submit', async (event) => {
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
        const response = await fetch('/events/editEvent', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, desc, localEvento, categoria, organizador, dt_evento, fim_inscricao, maxParticipantes, id })
        });
        
        const dataResponse = await response.json();
        
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
        messageEl.textContent = 'Erro ao conectar ao servidor';
        messageEl.classList.add('text-danger');
    }
});

