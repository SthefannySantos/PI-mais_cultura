async function carregarEvento() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id')

    try {
    const response = await fetch(`http://localhost:3000/events/eventData/${id}`);
    const eventData = await response.json();

    const dataEvento = new Date(eventData.dt_evento);

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
    

    if(subscribed == personLimit || concluido == 'S'){
        document.getElementById('subscribe-btn').disabled = true;
    }

    } catch (error) {
        console.log('Erro ao procurar evento')
    }
}

carregarEvento()