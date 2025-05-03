checkUserConnected();

async function carregarEventos() {
    try {
        const user = localStorage.getItem('id');
        const response = await fetch(`/action/userEventsSubscribed/${user}`);
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

            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
                <div class="card border-0 card-event p-2 pb-0" onclick="goToEvent(${evento.id})">
                    <img class="bd-placeholder-img card-img-top rounded" width="100%" height="215" src="img/${evento.categoria}.jpg" alt="${evento.titulo}">
                    <div class="card-body px-0">
                        <h5 class="card-title mb-1"> ${evento.titulo}</h5>
                        <ul class="list-group list-group-flush px-1 pt-2 carditems-description">
                            <li class="list-group-item px-0 border-0 pb-1 pt-0 carditems-description">Organizado por: ${evento.organizador_evento}</li>
                            <li class="list-group-item px-0 border-0 pb-1 pt-0 carditems-description">
                                <i class="fa-solid fa-calendar me-1"></i> ${dataFormatada} às ${horaFormatada}
                            </li>
                        </ul>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            ${evento.concluido === 'N' ? `
                                <button type="button" class="btn btn-primary saibamais-btn" onclick="cancelUserSubscription(${evento.id})" id="eventId-${evento.id}">Cancelar Inscrição</button>
                            ` : `<span class="text-success">Evento concluído</span>`}
                            <small class="text-muted"><i class="fa-solid fa-user"></i> ${evento.total_inscritos}/${evento.limite_participantes}</small>
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

async function cancelUserSubscription(id){
    const userId = localStorage.id;
    if(!userId || !localStorage.nome || !localStorage.email){
        window.location.replace('/login')
    } else{
        try{
            const response = await fetch(`/action/cancelSubscription/${userId}/${id}`, {
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
    if(!localStorage.id || !localStorage.nome || !localStorage.email){
        window.location.href='/login';
    } else {
        return
    }
}

// Chamada quando a página carrega
document.addEventListener('DOMContentLoaded', carregarEventos);