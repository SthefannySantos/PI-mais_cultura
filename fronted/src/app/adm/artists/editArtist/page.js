'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/admMenu";
import Footer from "@/components/Footer";
import { handleProfileChange } from "@/functions/handleCoverImage";
import { useVerifyUser } from "@/hooks/useVerifyUser";
import { useEventId } from "@/hooks/useEventId";

export default function Home() {
    useVerifyUser();
    
    const router = useRouter();
    const artistId = useEventId();

    // States do form
    const [cover, setCover] = useState(null);
    
    const [nome, setNome] = useState("");
    const [atuacao, setAtuacao] = useState("");
    const [descricao, setDescricao] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [instagram, setInstagram] = useState("");
    const [wpp, setWpp] = useState("");
    const [x, setX] = useState("");

    useEffect(() => {
        document.title = "+Cultura | Editar Artista";

        if (!artistId) return; // espera até pegar o id

        fetchArtistData();
    }, [artistId]);

    const fetchArtistData = async () => {
        try {
            const endpoint = `${backendUrl}/user/artist/${artistId}`;

            const res = await fetch(endpoint);
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            // Mapeamento para ambos
            setNome(data.nome_artista || '');
            setAtuacao(data.atuacao || '');
            setDescricao(data.descricao || '');
            setEmail(data.email || '');
            setTelefone(data.telefone || 'general');
            setWpp(data.wpp || '');
            setInstagram(data.instagram || '');
            setX(data.x || '');
            
            setCover(data.profile_pic || null);

        } catch (err) {
            console.error(err);
            alert("Erro ao carregar dados do artista.");
            router.push('/')
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Função auxiliar pra tratar valores vazios
        const clean = (value) => {
            if (!value || value.trim() === "") return "";
            return value;
        };

        formData.append('id', artistId);
        formData.append('nome_artista', clean(nome));
        formData.append('atuacao', clean(atuacao));
        formData.append('descricao', clean(descricao));
        formData.append('email', clean(email));
        formData.append('telefone', clean(telefone));
        formData.append('instagram', clean(instagram));
        formData.append('wpp', clean(wpp));
        formData.append('x', clean(x));

        if (cover) { formData.append('imagem', cover); }

        try {
            const response = await fetch(`${backendUrl}/user/editArtist`, {
                method: "PUT",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert('Artista Atualizado com sucesso');
                window.location.reload();
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar artista. Tente novamente mais tarde.");
        }
    };


    return (
        <>
            <Menu />
            
            <main>
                <section className="pt-5">
                    <div className="container text-center">
                        <h1 className="display-4 fw-bolder">
                            Editar um <span className="mais-cultura-gradient-text">Artista</span>
                        </h1>
                    </div>
                </section>

                <section className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="cultura-card p-5 shadow-lg rounded-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-3">
                                            <label className="form-label">Nome do Artista</label>
                                            <input type="text" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Nome do Artista" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Atuação</label>
                                            <input type="text" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Ex: Cantor" value={atuacao} onChange={(e) => setAtuacao(e.target.value)} required />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Descrição do artista</label>
                                            <textarea className="form-control" rows={5} style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Descreva sobre o artista..." value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Foto do artista (opcional)</label>
                                            <input type="file" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} accept="image/*" onChange={(e) => handleProfileChange(e, setCover)} 
                                            />
                                        </div>

                                        <h4 className="mt-5 mb-2 fw-semibold text-center">Contato</h4>

                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Telefone</label>
                                            <input type="number" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Whatsapp</label>
                                            <input type="number" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} value={wpp} onChange={(e) => setWpp(e.target.value)} />
                                        </div>
                                        
                                        <div className="mb-3">
                                            <label className="form-label">Instagram</label>
                                            <input type="text" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">X / Twitter</label>
                                            <input type="text" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} value={x} onChange={(e) => setX(e.target.value)} />
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn text-white w-50 rounded-pill fw-semibold" style={{ background: "var(--mais-cultura-gradient-bg)" }} >
                                                Enviar
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>            
            </main>

            <Footer />
        </>
    );
}
