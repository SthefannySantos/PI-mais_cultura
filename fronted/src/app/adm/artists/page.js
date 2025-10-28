'use client';

import { useState, useEffect } from "react";
import { backendUrl } from "@/lib/api";

import Menu from "@/components/admMenu";
import Card from "@/components/AdmArtistCard";
import CreateArtist from "@/components/CreateArtists";
import Footer from "@/components/Footer";
import { useVerifyUser } from "@/hooks/useVerifyUser";

export default function Home() {
    useVerifyUser();
    
    const [artists, setArtists] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        document.title = "+Cultura | Artistas";

        async function fetchData() {
            try {
                const userId = localStorage.getItem('id');
                if (!userId) return;

                const response = await fetch(`${backendUrl}/user/artistsData`);
                const data = await response.json();

                 if (!response.ok) { setArtists([]); }

                setArtists(data || []);
            } catch (error) {
                console.error("Erro ao carregar artistas:", error);
                setArtists([]);
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

                        {/* Seção de Solicitações */}
                        <section className="my-5 p-1" aria-label="minhas-solicitacoes" style={{minHeight: '75vh'}}>
                            <div className="container">
                                <div className="m-0 text-center">
                                    <h1 className="fw-bolder mb-3">
                                        Todos os <span className="mais-cultura-gradient-text">Artistas</span>
                                    </h1>
                                </div>

                                {artists.length === 0 ? (
                                    
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-3">
                                        <div className="col">
                                            <CreateArtist />
                                        </div>
                                    </div>

                                ) : (
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-3">
                                        {artists.map(artist => (
                                            <div key={artist.id} className="col">
                                                <Card artist={artist} />
                                            </div>
                                        ))}
                                         <div className="col">
                                            <CreateArtist />
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
