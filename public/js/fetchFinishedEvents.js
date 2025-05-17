async function carregarEventosConcluidos() {
    try {
        const response = await fetch('/events/eventsFinished');
        const eventos = await response.json();

        const container = document.getElementById('eventFinished-container');
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

            const imgPath = evento.capa_evento ?  `${evento.capa_evento}` : `img/${evento.categoria}.jpg` 

            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
                <div class="card border-0 card-event p-2 pb-0" onclick="goToEvent(${evento.id})">
                    <img class="bd-placeholder-img card-img-top rounded" width="100%" height="215" src="${imgPath}" alt="${evento.titulo}">
                    <div class="card-body px-0">
                        <h5 class="card-title mb-1">${evento.titulo}</h5>
                        <ul class="list-group list-group-flush px-1 pt-2 carditems-description">
                            <li class="list-group-item px-0 border-0 pb-1 pt-0 carditems-description">Organizado por: ${evento.organizador_evento}</li>
                            <li class="list-group-item px-0 border-0 pb-1 pt-0 carditems-description">
                                <i class="fa-solid fa-calendar me-1"></i> ${dataFormatada} às ${horaFormatada}
                            </li>
                        </ul>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <button type="button" class="btn btn-primary saibamais-btn" onclick="goToEvent(${evento.id})" id="eventId-${evento.id}">Saiba Mais</button>
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
    if(!localStorage.id || !localStorage.nome || !localStorage.email || !localStorage.acesso){
        window.location.replace('/login')
    } else{
        window.location.href = `/event?id=${id}`;
    }
    
}

// Chamada quando a página carrega
document.addEventListener('DOMContentLoaded', carregarEventosConcluidos);