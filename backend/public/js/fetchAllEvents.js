checkUserConnected();

async function carregarEventos() {
    try {
        const user = localStorage.getItem('id');
        const response = await fetch(`/events/allEvents`);
        const eventos = await response.json();

        const container = document.getElementById('eventAvaliable-container');
        container.innerHTML = ''; // Limpa antes de preencher

        eventos.forEach(evento => {
            const dataEvento = new Date(evento.dt_evento);
            const dataFormatada = dataEvento.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
            });
            const horaFormatada = dataEvento.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            });

            const imgPath = evento.capa_evento ?  `${evento.capa_evento}` : `../img/${evento.categoria}.jpg`;

            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
                <div class="card border-0 card-event p-2 pb-0">
                    <img class="bd-placeholder-img card-img-top rounded rounded-2" width="100%" height="215" src="${imgPath}" alt="${evento.titulo}">
                    <div class="card-body px-0">
                        <h5 class="card-title mb-1" onclick="goToEvent(${evento.id})" > ${evento.titulo}</h5>
                        <ul class="list-group list-group-flush px-1 pt-2 carditems-description">
                            <li class="list-group-item px-0 border-0 pb-1 pt-0 carditems-description">Organizado por: ${evento.organizador_evento}</li>
                            <li class="list-group-item px-0 border-0 pb-1 pt-0 carditems-description">
                                <i class="fa-solid fa-calendar me-1"></i> ${dataFormatada} às ${horaFormatada}
                            </li>
                        </ul>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            ${evento.concluido === 'N' ? `
                                <button type="button" class="btn btn-primary btn-success" onclick="finishEvent(${evento.id})" id="eventId-${evento.id}"> <i class="bi bi-check-circle-fill" style="margin-right: 5px"></i> Concluir evento</button>
                            ` : `<span class="text-success">Evento concluído</span>`}
                            <small class="text-muted">
                                <button type="button" class="btn btn-primary bg-secondary border-0 me-1 mb-1" onclick="editEvent(${evento.id})" id="eventId-${evento.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button type="button" class="btn btn-primary bg-danger border-0 me-1 mb-1" onclick="deleteEvent(${evento.id})" id="eventId-${evento.id}"><i class="fa-solid fa-trash"></i></button>
                            </small>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
    }
    
};

function goToEvent(id){
    if(!localStorage.id || !localStorage.nome || !localStorage.email){
        window.location.replace('/login')
    } else{
        window.location.href = `/event?id=${id}`;
    }
    
}

function editEvent(id){
    if(!localStorage.id || !localStorage.nome || !localStorage.email){
        window.location.replace('/login')
    } else{
        window.location.href = `/admin/editEvent?id=${id}`;
    }
    
}

async function finishEvent(id){
    if(!localStorage.id || !localStorage.nome || !localStorage.email){
        window.location.replace('/login')
    } else{
        try {
            const response = await fetch('/events/concluirEvento', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
        } catch (error) {
            console.log('Erro ao conectar ao servidor');
        } finally {
            window.location.reload();
        }
    }
}

async function deleteEvent(id){
    const userId = localStorage.id;
    if(!userId || !localStorage.nome || !localStorage.email || !localStorage.acesso == 1){
        window.location.replace('/login')
    } else{
        try{
            const response = await fetch(`/events/deleteEvent/${id}`, {
                method: 'DELETE',
            });
            window.location.reload();
        } catch (err) {
            console.log('Não foi possivel cancelar inscrição');
            window.location.reload();
        }
    }
}

function checkUserConnected(){
    if(!localStorage.id || !localStorage.nome || !localStorage.email || !localStorage.acesso == 1){
        window.location.href='/login';
    } else {
        return
    }
}

// Chamada quando a página carrega
document.addEventListener('DOMContentLoaded', carregarEventos);