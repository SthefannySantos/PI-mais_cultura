'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/Menu";
import Card from "@/components/Card";
import CardFinished from "@/components/CardFinished";
import Footer from "@/components/Footer";
import { useVerifyUser } from "@/hooks/useVerifyUser";
import ThemeToggle from "@/components/ThemeToggle";

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

                setEventsAvaliable(eventosAvaliable.slice(0, 3));
                setEventsFinished(eventosFinished.slice(0, 3));
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
                    Bem-vindo ao <br />
                        <span className="mais-cultura-gradient-text" >+Cultura! </span>
                    </h1>

                    <h3 className="fw-lighter mt-3">
                        Descubra e participe de eventos culturais na sua região.
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
                            <h4 className="fw-lighter m-0 mb-1">Confira o que está por vir <Link href="/eventsAvaliable" className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover">aqui</Link></h4>
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5 mb-3" id="eventAvaliable-container">

                            {eventsAvaliable.map(event => (
                                <div key={event.id} className="col-md-4 ">
                                    <Card evento={event} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="my-3 p-1" aria-label="eventsFinished" style={{minHeight: '25vh'}}>
                    <div className="container">
                        <div className="m-0 my-4 text-center">
                            <h1 className="fw-bolder mb-2">Eventos <span className="mais-cultura-gradient-text" >Concluídos</span></h1>
                            <h4 className="fw-lighter m-0 mb-1">Veja os eventos que marcaram presença <Link href="/eventsFinished" className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover">aqui</Link></h4>
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5 mb-3" id="eventAvaliable-container">
                            {eventsFinished.map(event => (
                                <div key={event.id} className="col-md-4 ">
                                    <CardFinished evento={event} />
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
