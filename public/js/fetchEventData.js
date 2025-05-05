const params = new URLSearchParams(window.location.search);
const id = params.get('id')
const userId = localStorage.getItem('id');

async function carregarEvento() {
    
    try {
    const eventId = id;
    const response = await fetch(`/events/eventData/${id}`);
    const eventData = await response.json();

    const dataEvento = new Date(eventData.dt_evento);

    const userState = await verifyIfSubscribed(userId, eventId);

    const dataFormatada = new Date(dataEvento).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: "long",
        year:"numeric"
    });

    const horaFormatada = new Date(dataEvento).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const subscribed = eventData.total_inscritos;
    const personLimit = eventData.limite_participantes;
    const concluido = eventData.concluido;
    const categoria = eventData.categoria;
    const dataLimite = eventData.fim_inscricao;

    const PeriodoFimInscricao = new Date(dataLimite);
    PeriodoFimInscricao.setHours(23, 59, 59, 999);

    const dataFimInscricao = PeriodoFimInscricao.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: "long",
        year:"numeric"
    });

    const today = new Date();

    document.getElementById('event-title').innerText = eventData.titulo;
    document.getElementById('event-creator').innerText = eventData.organizador_evento;
    document.getElementById('event-location').innerText = eventData.local_evento;
    document.getElementById('event-category').src = `img/${categoria}.jpg`;
    document.getElementById('event-description').innerHTML = eventData.descricao;
    document.getElementById('event-subscribed').innerText = subscribed;
    document.getElementById('event-participantsLimit').innerText = personLimit;
    document.getElementById('event-date').innerText = `${dataFormatada} às ${horaFormatada}`;
    document.getElementById('date-limit').innerHTML = concluido == 'S' ? `` : `Inscreva-se até <b>${dataFimInscricao}</b>   `;
    document.getElementById('event-status').innerHTML = concluido == 'S' ? `<h4  class="fw-bold">Evento Concluído</h4    >` : ``;

    if (userState == 'Disponivel'){
        document.getElementById('subscribe-state').innerText = 'Inscreva-se';
    } else {
        document.getElementById('subscribe-state').innerText = 'Já inscrito';
    }


    if(subscribed == personLimit || concluido == 'S' || userState != 'Disponivel' || (today >= PeriodoFimInscricao)){
        document.getElementById('subscribe-btn').disabled = true;
    }

    } catch (error) {
        console.log('Erro ao procurar evento')
    }
};

async function verifyIfSubscribed(userInfo, eventInfo){
    try {
        const otherResponse = await fetch(`/action/verifyUserSubscribed/${userInfo}/${eventInfo}`);
        const eventstate = await otherResponse.json();

        const isSubscribed = eventstate.message;
        return isSubscribed;
    } catch (error) {
        console.log('Não foi possivel verificar se o usuário está inscrito');
    }
}


async function subscribeEvent(){

    if(!localStorage.id || !localStorage.nome || !localStorage.email || !localStorage.acesso){
        window.location.replace('/login')
    } else {
        
        const eventId = id;

        try{
            const userState = await verifyIfSubscribed(userId, eventId);
    
            if (userState == 'Disponivel'){
                const response = await fetch('/action/subscribeEvent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, eventId})
                });
    
                window.location.reload();
            }
        } catch (error) {
            console.log('Usuário já inscrito');
        }

    }

}

carregarEvento()