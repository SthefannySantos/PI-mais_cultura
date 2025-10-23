'use client';

import { useState, useEffect } from "react";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/admMenu";
import AdmEventCard from "@/components/admEventCard";
import AdmCardFinished from "@/components/AdmCardFinished";
import Footer from "@/components/Footer";
import { useVerifyUser } from "@/hooks/useVerifyUser";

export default function Home() {
    useVerifyUser();
    const [eventsAvaliable, setEventsAvaliable] = useState([]);
    const [eventsFinished, setEventsFinished] = useState([]);
    const [loader, setLoader] = useState(true);

   useEffect(() => {
        document.title = "+Cultura";
        async function fetchData() {
            try {
                const [resAvaliable, resFinished] = await Promise.all([
                    fetch(`${backendUrl}/events/eventsAvaliable`),
                    fetch(`${backendUrl}/events/eventsFinished`)
                ]);

                const [eventosAvaliable, eventosFinished] = await Promise.all([
                    resAvaliable.json(),
                    resFinished.json()
                ]);

                setEventsAvaliable(eventosAvaliable);
                setEventsFinished(eventosFinished);
            } catch (error) {
                console.error("Erro ao carregar eventos:", error);
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

            <section className="d-flex align-items-center" aria-label="home-introduction"
                style={{
                    backgroundImage: 'url(/maiscultura-home.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '65vh',
                }}
            >
                <div className="container text-center text-white mb-2">
                    <h1 className="fw-bold" style={{fontSize: '4em'}}>
                    Painel Administrativo<br />
                        <span className="mais-cultura-gradient-text" >+Cultura! </span>
                    </h1>

                    <h3 className="fw-lighter mt-3">
                       Gerencie e controle os eventos da plataforma.
                    </h3>
                </div>
            </section>


            {loader ? 
            (
                <div className="d-flex justify-content-center align-items-center vh-100" id="loader-div">
                    <div className="spinner-border loader-style" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            ) : (

                <>
                <section className="my-3 p-1" aria-label="eventsAvaliable" style={{minHeight: '25vh'}}>
                    <div className="container">
                        <div className="m-0 my-4 text-center">
                            <h1 className="fw-bolder mb-2 ">Eventos <span className="mais-cultura-gradient-text" >Disponíveis</span></h1>
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5 mb-3" id="eventAvaliable-container">

                            {eventsAvaliable.map(event => (
                                <div key={event.id} className="col-md-4 ">
                                    <AdmEventCard evento={event} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="my-3 p-1" aria-label="eventsFinished" style={{minHeight: '25vh'}}>
                    <div className="container">
                        <div className="m-0 my-4 text-center">
                            <h1 className="fw-bolder mb-2">Eventos <span className="mais-cultura-gradient-text" >Concluídos</span></h1>
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5 mb-3" id="eventAvaliable-container">
                            {eventsFinished.map(event => (
                                <div key={event.id} className="col-md-4 ">
                                    <AdmCardFinished evento={event} />
                                </div>
                            ))}
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
