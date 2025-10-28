'use client';

import { useState, useEffect } from "react";
import Menu from "@/components/admMenu";
import Card from "@/components/admSolicitationCard";
import Footer from "@/components/Footer";
import { backendUrl } from "@/lib/api";
import { useVerifyUser } from "@/hooks/useVerifyUser";

export default function Home() {
    useVerifyUser();
    
    const [solicitations, setSolicitations] = useState([]);
    const [loader, setLoader] = useState(true);

    // Pega os eventos do backend
    useEffect(() => {
        document.title = "+Cultura | Solicitações";
        async function fetchData() {
            try {
                const response = await fetch(`${backendUrl}/events/allSolicitations`);

                 if (!response.ok) {
                    if (response.status === 404) {
                        setSolicitations([]); return;
                    }
                    throw new Error("Erro ao buscar artistas");
                }

                const events = await response.json();

                setSolicitations(Array.isArray(events) ? events : []);
            } catch (error) {
                console.error("Erro ao carregar eventos:", error);
                setSolicitations([]);
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
                    <section className="my-3 p-1" aria-label="eventsAvaliable">
                        <div className="container">
                            <div className="m-0 text-center">
                                <h1 className="fw-bolder mb-3">
                                    Eventos <span className="mais-cultura-gradient-text">Disponíveis</span>
                                </h1>
                            </div>


                            {solicitations.length === 0 ? (
                                <div className="justify-content-center align-items-center vh-100" id="loader-div">
                                    <h3 className="text-center mt-3 text-suble text-secondary">
                                        Não foi possível encontrar eventos disponíveis
                                    </h3>
                                </div>
                            ) : (
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5 mb-3" id="eventAvaliable-container">
                                    {solicitations.map(event => (
                                        <div key={event.id} className="col-md-4">
                                            <Card evento={event} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
