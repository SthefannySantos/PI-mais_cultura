'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/Menu";
import CardSubscribed from "@/components/CardSubscribed";
import Footer from "@/components/Footer";
import { useVerifyUser } from "@/hooks/useVerifyUser";

export default function Home() {
    useVerifyUser();
    
    const [eventsSubscribed, setEventsSubscribed] = useState([]);
    const [loader, setLoader] = useState(true);
    const [id, setId] = useState();

    useEffect(() => {
        document.title = "+Cultura | Eventos Inscritos";
        setId(localStorage.getItem('id'));

        async function fetchData() {
            try {
                const response = await fetch(`${backendUrl}/action/userEventsSubscribed/${localStorage.getItem('id')}`);

                 if (!response.ok) {
                    if (response.status === 404) {
                        setEventsSubscribed([]); return;
                    }
                    throw new Error("Erro ao buscar artistas");
                }

                const events = await response.json();

                setEventsSubscribed(Array.isArray(events) ? events : []);
            } catch (error) {
                console.error("Erro ao carregar eventos:", error);
                setEventsSubscribed([]);
            } finally {
                setLoader(false);
            }
        }

    fetchData();
}, []);

    console.log(eventsSubscribed)


    return (

    <>

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
                    <section className="my-3 p-1" aria-label="eventsSubscribed">
                        <div className="container">
                            <div className="m-0 text-center">
                                <h1 className="fw-bolder mb-3">Eventos <span className="mais-cultura-gradient-text" >Inscritos</span></h1>
                            </div>
                            

                                {Array.isArray(eventsSubscribed) && eventsSubscribed.length > 0 ? (
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5 mb-3" id="eventsSubscribed-container">
                                        {eventsSubscribed.map(event => (
                                            <div key={event.id} className="col-md-4 ">
                                                <CardSubscribed evento={event} userId={id} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="justify-content-center align-items-center vh-100" id="loader-div">
                                        <h3 className="text-center mt-3 text-suble text-secondary">Não foi possível encontrar eventos inscritos</h3>
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