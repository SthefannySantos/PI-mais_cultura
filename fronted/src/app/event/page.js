'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { EventDateFormated, EventHourFormated, participateDisabled, verifyUserData } from "@/functions/localData";
import { useEventId } from "@/hooks/useEventId";

export default function Home() {
    const [event, setEvent] = useState({});
    const [loader, setLoader] = useState(true);
    const [subscribed, setSubscribed] = useState(false);
    const [eventCover, setEventCover] = useState();
    const [artistId, setArtistId] = useState(null);

    const router = useRouter();

    const idUrl = useEventId();

    useEffect(() => {
        document.title = "+Cultura | Evento";

        if (!idUrl) return; // espera até pegar o id

        async function fetchAllData() {
            try {
                // Ambas as requisições
                const [eventResponse, subscribedResponse] = await Promise.all([
                    fetch(`${backendUrl}/events/eventData/${idUrl}`),
                    fetch(`${backendUrl}/action/verifyUserSubscribed/${localStorage.getItem('id')}/${idUrl}`)
                ]);

                
                // Verifica se a requisição do evento deu certo
                if (!eventResponse.ok) {
                    throw new Error(`Evento não encontrado! status: ${eventResponse.status}`);
                }
                
                const eventFetched = await eventResponse.json();

                // Verifica se a requisição de inscrição deu certo
                let isSubscribed = false;
                if (subscribedResponse.ok) {
                    const eventState = await subscribedResponse.json();
                    isSubscribed = eventState.message === 'Inscrito';
                }

                const imgPath = eventFetched.capa_evento
                    ? `${backendUrl}${eventFetched.capa_evento}`
                    : `/events-categories/${eventFetched.categoria}.jpg`;

                setEvent(eventFetched);
                setEventCover(imgPath);
                setSubscribed(isSubscribed);

                console.log('1')
                if (eventFetched.artista_cod) {
                    try {
                        const artistRes = await fetch(`${backendUrl}/action/getArtistProfile/${eventFetched.artista_cod}`);
                        if (!artistRes.ok) throw new Error("Artista não encontrado");
                        const artistData = await artistRes.json();
                        console.log('2')
                        console.log(artistData)
                        setArtistId(artistData || null);
                    } catch {
                        setArtistId(null);
                    }
                } else { setArtistId(null); }
            } catch (error) {
                setEvent([]);
                alert('Evento não encontrado ou não existente');
                router.push('/');
            } finally {
                setLoader(false);
            }
        }

        fetchAllData();
    }, [idUrl]);

    async function subscribeEvent(){

        if (!verifyUserData()) { router.push('/login'); return; }

        const userId = localStorage.getItem('id');

        try{
            const response = await fetch(`${backendUrl}/action/subscribeEvent`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, eventId: idUrl })
            });

             if (!response.ok) { throw new Error(`Não foi possível se inscrever! status: ${response.status}`); }
             
             setSubscribed(true);
            alert('Inscrição realizada com sucesso!');
        } catch (error) {
            console.log('Usuário já inscrito');
            alert('Erro ao se inscrever ou usuário já inscrito')
        }

    }


    return (

    <>

        <Menu />
        <main >    

            {loader ? 
            (
                <div className="d-flex justify-content-center align-items-center vh-100" id="loader-div">
                    <div className="spinner-border loader-style" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            ) : (

                <>

                <section className="position-relative w-100 text-white" aria-label="eventsAvaliable">
                    <div className="d-flex align-items-end justify-content-start bg-dark bg-opacity-75"
                        style={{width: "100%", height: "60vh", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url("${eventCover}")`}}>
                        <div className="container pb-5">
                        <h1 className="display-4 fw-bold mb-3 title-blur">{event.titulo}</h1>
                        </div>
                    </div>
                </section>


                <section className="py-4" aria-label="eventsAvaliable">
                    <div className="container">

                        <div className="row">
                            <div className="col lg-8 mb-lg-0">
                                
                                <div className="cultura-card mb-4 p-4 " style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                                    <h2 className="fw-bold mb-3">Informações</h2>
                                    <div className="row g-4 d-flex align-items-center">
                                        <div className="col-md-3">
                                            <div className="d-flex align-items-center">
                                                <i className="fa-regular fa-calendar me-3 mais-cultura-gradient-text"></i>
                                                <div>
                                                    <small className="d-block"  style={{ color: "var(--card-text-muted)" }}>Data</small>
                                                    <strong>{EventDateFormated(event.dt_evento)}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="d-flex align-items-center">
                                                <i className="fa-regular fa-clock me-3 mais-cultura-gradient-text"></i>
                                                <div>
                                                    <small className="d-block" style={{ color: "var(--card-text-muted)" }}>Horário</small>
                                                    <strong>{EventHourFormated(event.dt_evento)}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <i className="fa-solid fa-location-dot me-3 mais-cultura-gradient-text"></i>
                                                <div>
                                                    <small className="d-block" style={{ color: "var(--card-text-muted)" }}>Local</small>
                                                    <strong>{event.local_evento}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div className="cultura-card mb-4 p-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                                    <h2 className="fw-bold mb-3">Sobre o evento</h2>

                                    <div className="mb-4">
                                        <p className="lead text-justify">
                                            {event.descricao}
                                        </p>

                                        <p className="lead text-justify">
                                            Inscreva-se até <span className="fw-medium">{EventDateFormated(event.fim_inscricao)}</span>
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4">
                                <div className="cultura-card mb-4 p-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }} >
                                    <div className="border-0 p-0 mb-3" style={{ color: "var(--card-text-muted)" }} aria-hidden="true">
                                        <div className="d-flex justify-content-between">
                                            <span><i className="fa-solid fa-users" aria-hidden="true"></i> {event.total_inscritos}/{event.limite_participantes}</span>
                                            <span>{Math.round((event.total_inscritos / event.limite_participantes) * 100)}%</span>
                                        </div>
                                        <div className="progress rounded-pill mt-2" style={{height: '8px', backgroundColor: '#e5e7eb'}}>
                                            <div className="progress-bar" role="progressbar" style={{width: `${Math.round((event.total_inscritos / event.limite_participantes) * 100)}%`, background: 'var(--mais-cultura-gradient-bg)'}}></div>
                                        </div>
                                    </div>

                                    <div className="mb-3 text-center fs-5" style={{ color: "var(--card-text-muted)" }}>
                                        <i className="bi bi-tag me-1"></i>
                                        <span className="fw-medium"> {event.valor == 0 ? 'Gratuito' : `R$ ${event.valor}`}</span>
                                    </div>

                                    {subscribed ? (
                                        <button type="button" aria-label={`Participe do nosso evento`} className="btn w-100 text-white rounded-pill fw-medium p-2 my-1 mb-4 border-0" style={{ background: "var(--mais-cultura-gradient-bg)",}} disabled> Participando </button>
                                    ) : (
                                        <button type="button" aria-label={`Participe do nosso evento`} className="btn w-100 text-white rounded-pill fw-medium p-2 my-1 mb-4 border-0" style={{ background: "var(--mais-cultura-gradient-bg)",}} disabled={participateDisabled(event)} onClick={subscribeEvent} > Participar </button>
                                    )}

                                    <div className="border-top pt-3 mb-4">
                                        <h5 className="fw-bold">Organizador</h5>
                                        <p className="fw-medium mb-2">{event.organizador_evento}</p>
                                        {artistId && (
                                            <a className="link-hover" style={{color: '#8B5CF6'}} onClick={() => router.push(`/artist?id=${artistId}`)}> Ver perfil do Organizador </a>
                                        )}
                                    </div>

                                    {event.map_link && (
                                        <div className="border-top pt-3 mb-4">
                                            <h5 className="fw-bold mb-3">Como chegar?</h5>
                                            <button type="button" aria-label={`Participe do nosso evento`} className="btn w-100 text-white rounded-pill fw-medium p-2 my-1 mb-2 location-card" onClick={() => router.push(`${event.map_link}`)}> <i className="fa-solid fa-location-dot me-1"></i> Ver no Google Maps </button>
                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>
                    </div>
                </section>


                </>

            )}

            

        </main>

        <Footer />

        </>
    );
}
