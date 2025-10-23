'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/Menu";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export default function Home() {
    const [eventsFinished, setEventsFinished] = useState([]);
    const [loader, setLoader] = useState(true);
    const [selectedCity, setSelectedCity] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        document.title = "+Cultura | Eventos Concluídos";
        async function fetchData() {
            try {
                const response = await fetch(`${backendUrl}/events/eventsFinished`);

                const events = await response.json();

                setEventsFinished(events);
            } catch (error) {
                console.error("Erro ao carregar eventos:", error);
                setEventsFinished([]);
            } finally {
                setLoader(false);
            }
        }

    fetchData();
}, []);

// Cria lista de cidades únicas
    const cities = Array.from(
        new Set(eventsFinished.map(e => e.cidade).filter(c => c && c.trim() !== ""))
    );

    // Filtra eventos pela cidade selecionada
    const filteredEvents = selectedCity ? eventsFinished.filter(e => e.cidade === selectedCity) : eventsFinished;

    return (

    <>

        <Head>
            <title>Eventos Concluídos</title>
            <meta name="description" content="Eventos culturais já realizados" />
        </Head>

        <Menu />
        <main>    

            {loader ? 
            (
                <div className="d-flex justify-content-center align-items-center vh-100" id="loader-div">
                    <div className="spinner-border loader-style" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            ) : (

                <>
                <section className="my-3 p-1" aria-label="eventsAvaliable">
                    <div className="container">
                        <div className="m-0 text-center">
                            <h1 className="fw-bolder mb-3">Eventos <span className="mais-cultura-gradient-text" >Concluídos</span></h1>
                        </div>

                        <div className="d-flex justify-content-end mb-3">
                            <div className="position-relative">
                                <button className="btn btn-secondary" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    <i className="bi bi-funnel-fill"></i> Filtrar <i className="bi bi-caret-down-fill"></i>
                                </button>
                                {dropdownOpen && (
                                    <ul className="dropdown-menu show" style={{ display: "block", position: "absolute", right: 0 }}>
                                        <li>
                                        <button className="dropdown-item" onClick={() => { setSelectedCity(""); setDropdownOpen(false); }}>
                                            Todas as cidades
                                        </button>
                                        </li>
                                        {cities.map(city => (
                                        <li key={city}>
                                            <button className="dropdown-item" onClick={() => { setSelectedCity(city); setDropdownOpen(false); }}>
                                            {city}
                                            </button>
                                        </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        

                        {filteredEvents.length == 0 ? (
                            <div className="justify-content-center align-items-center vh-100" id="loader-div">
                                <h3 className="text-center mt-3 text-suble text-secondary">Não foi possível encontrar eventos concluídos</h3>
                            </div>
                        ) : (
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5 mb-3" id="eventAvaliable-container">
                                {filteredEvents.map(event => (
                                    <div key={event.id} className="col-md-4 ">
                                        <Card evento={event} />
                                    </div>
                                ))}
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