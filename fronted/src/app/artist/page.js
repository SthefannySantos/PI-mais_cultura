'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { formatPhone } from "@/functions/localData";
import ContactCard from "@/components/contactCard";
import { useEventId } from "@/hooks/useEventId";

export default function Home() {
    const [event, setEvent] = useState({});
    const [loader, setLoader] = useState(true);
    const [subscribed, setSubscribed] = useState(false);
    const [eventCover, setEventCover] = useState();
    const [artistData, setArtistData] = useState();
    const [artistProfile, setArtistProfile] = useState();

    const router = useRouter();

    const idUrl = useEventId();

    useEffect(() => {
        document.title = "+Cultura | Artista";

        if (!idUrl) return; // espera até pegar o id

        async function fetchData() {
            try {
                // Ambas as requisições
                const response = await fetch(`${backendUrl}/user/artist/${idUrl}`);

                // Verifica se a requisição do evento deu certo
                if (!response.ok) { throw new Error(`Artista não encontrado! status: ${response.status}`); }

                const artistFetched = await response.json();

                console.log(artistFetched);

                const imgPath = artistFetched.profile_pic ? `${backendUrl}${artistFetched.profile_pic}` : `/artist-icon.png`;

                setArtistData(artistFetched);
                setArtistProfile(imgPath);
            } catch (error) {
                setArtistData([]);
                alert('Artista não encontrado ou não existente');
                /* router.push('/'); */
            } finally {
                setLoader(false);
            }
        }

        fetchData();
    }, [idUrl]);

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

                <section className="py-4" aria-label="eventsAvaliable" style={{minHeight: '65vh'}}>
                    <div className="container">

                        <div className="row justify-content-center" >
                            <div className="text-center col-lg-6 col-mb-8">
                                
                                <div className="cultura-card mb-4 p-4 " style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                                    <div className="mb-3">
                                        <img className="rounded-circle border border-4 " height="" src={artistProfile} alt={""} style={{ height: '150px', width: '150px', objectFit: 'cover'}} />
                                    </div>
                                    <h1 className="fw-bold mb-2">{artistData.nome_artista}</h1>
                                    <h5 className="mais-cultura-gradient-text fw-bold mb-3">{artistData.atuacao}</h5>
                                    <p className="mb-4" style={{ color: "var(--card-text-muted)" }}>
                                      {artistData.descricao}
                                    </p>
                                    <h5 className="fw-bold mb-2">Contato</h5>

                                    {artistData.email && (
                                        <ContactCard 
                                            href={`mailto:${artistData.email}`}
                                            iconClass="fa-regular fa-envelope" 
                                            label="Email" 
                                            value={artistData.email}
                                        />
                                    )}

                                    {artistData.telefone && (
                                        <ContactCard 
                                            href={`tel:+55${artistData.telefone}`}
                                            iconClass="fa-solid fa-phone" 
                                            label="Telefone" 
                                            value={formatPhone(artistData.telefone)}
                                        />
                                    )}

                                    {artistData.wpp && (
                                        <ContactCard 
                                            href={`https://wa.me/55${artistData.wpp}`} 
                                            iconClass="bi bi-whatsapp" 
                                            label="Whatsapp" 
                                            value={formatPhone(artistData.wpp)}
                                            external
                                        />
                                    )}

                                    {artistData.instagram && (
                                        <ContactCard 
                                            href={`https://instagram.com/${artistData.instagram}`} 
                                            iconClass="bi bi-instagram" 
                                            label="Instagram" 
                                            value={`@${artistData.instagram}`}
                                            external
                                        />
                                    )}

                                    {artistData.x && (
                                        <ContactCard
                                            href={`https://www.x.com/${artistData.x}`} 
                                            iconClass="bi bi-twitter-x" 
                                            label="X" 
                                            value={`@${artistData.x}`}
                                            external
                                        />
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
