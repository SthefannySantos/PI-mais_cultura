const params = new URLSearchParams(window.location.search);
const id = params.get('id')
const userId = localStorage.getItem('id');

async function carregarEvento() {
    
    try {
    const eventId = id;
    const response = await fetch(`http://localhost:3000/events/eventData/${id}`);
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

    document.getElementById('event-title').innerText = eventData.titulo;
    document.getElementById('event-creator').innerText = eventData.organizador_evento;
    document.getElementById('event-location').innerText = eventData.local_evento;
    document.getElementById('event-category').src = `img/${categoria}.jpg`;
    document.getElementById('event-description').innerHTML = eventData.descricao;
    document.getElementById('event-subscribed').innerText = subscribed;
    document.getElementById('event-participantsLimit').innerText = personLimit;
    document.getElementById('event-date').innerText = `${dataFormatada} às ${horaFormatada}`;

    if (userState == 'Disponivel'){
        document.getElementById('subscribe-state').innerText = 'Inscreva-se';
    } else {
        document.getElementById('subscribe-state').innerText = 'Já inscrito';
    }
    

    if(subscribed == personLimit || concluido == 'S' || userState != 'Disponivel'){
        document.getElementById('subscribe-btn').disabled = true;
    }

    } catch (error) {
        console.log('Erro ao procurar evento')
    }
};

async function verifyIfSubscribed(userInfo, eventInfo){
    try {
        const otherResponse = await fetch(`http://localhost:3000/action/verifyUserSubscribed/${userInfo}/${eventInfo}`);
        const eventstate = await otherResponse.json();

        const isSubscribed = eventstate.message;
        return isSubscribed;
    } catch (error) {
        console.log('Não foi possivel verificar se o usuário está inscrito');
    }
}


async function subscribeEvent(){
    const eventId = id;

    try{
        const userState = await verifyIfSubscribed(userId, eventId);

        if (userState == 'Disponivel'){
            const response = await fetch('http://localhost:3000/action/subscribeEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, eventId})
            });

            window.location.reload();
        }else {
            console.log('aoba')
        }
    } catch (error) {
        console.log('Usuário já inscrito');
    }
}

carregarEvento()