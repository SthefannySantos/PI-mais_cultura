'use client';

import { useState, useEffect } from "react";
import { backendUrl } from "@/lib/api";

import Menu from "@/components/Menu";
import Card from "@/components/Card";
import CardSolicitation from "@/components/CardSolicitation";
import CreateSolicitation from "@/components/CreateSolicitation";
import Footer from "@/components/Footer";
import { useVerifyUser } from "@/hooks/useVerifyUser";

export default function Home() {
    useVerifyUser();

    const [events, setEvents] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        document.title = "+Cultura | Meus Eventos";

        async function fetchData() {
            try {
                const userId = localStorage.getItem('id');
                if (!userId) return;

                const response = await fetch(`${backendUrl}/action/artistEvents/${userId}`);
                const data = await response.json();

                setEvents(data.eventos || []);
                setRequests(data.solicitacoes || []);
            } catch (error) {
                console.error("Erro ao carregar eventos:", error);
                setEvents([]);
                setRequests([]);
            } finally {
                setLoader(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <Menu />
            <main>
                {loader ? (
                    <div className="d-flex justify-content-center align-items-center vh-100" id="loader-div">
                        <div className="spinner-border loader-style" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Seção de Eventos */}
                        <section className="my-3 p-1" aria-label="meus-eventos" style={{minHeight: '25vh'}}>
                            <div className="container ">
                                <div className="m-0 text-center">
                                    <h1 className="fw-bolder mb-3">
                                        Meus <span className="mais-cultura-gradient-text">Eventos</span>
                                    </h1>
                                </div>

                                {events.length === 0 ? (
                                    <div className="text-center mt-3 text-secondary">
                                        <h4>Nenhum evento encontrado</h4>
                                    </div>
                                ) : (
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-3">
                                        {events.map(event => (
                                            <div key={event.id} className="col">
                                                <Card evento={event} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Seção de Solicitações */}
                        <section className="my-5 p-1" aria-label="minhas-solicitacoes" style={{minHeight: '25vh'}}>
                            <div className="container">
                                <div className="m-0 text-center">
                                    <h1 className="fw-bolder mb-3">
                                        Minhas <span className="mais-cultura-gradient-text">Solicitações</span>
                                    </h1>
                                </div>

                                {requests.length === 0 ? (
                                    
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-3 ">
                                        <div className="col">
                                            <CreateSolicitation />
                                        </div>
                                    </div>

                                ) : (
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-3">
                                        {requests.map(request => (
                                            <div key={request.id} className="col">
                                                <CardSolicitation evento={request} />
                                            </div>
                                        ))}
                                         <div className="col">
                                            <CreateSolicitation />
                                        </div>

                                    </div>
                                )}
                            </div>
                        </section>
                    </>
                )}
            </main>

            <Footer />
        </>
    );
}
