'use client';

import { useState, useEffect } from "react";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/admMenu";
import Footer from "@/components/Footer";
import { handleProfileChange } from "@/functions/handleCoverImage";
import { useVerifyUser } from "@/hooks/useVerifyUser";

export default function Home() {
    useVerifyUser();

    // States do form
    const [cover, setCover] = useState(null);
    
    const [codArtista, setCodArtista] = useState("");
    const [nome, setNome] = useState("");
    const [atuacao, setAtuacao] = useState("");
    const [descricao, setDescricao] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [instagram, setInstagram] = useState("");
    const [wpp, setWpp] = useState("");
    const [x, setX] = useState("");

    useEffect(() => {
        document.title = "+Cultura | Criar Artista";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Função auxiliar pra tratar valores vazios
        const clean = (value) => {
            if (!value || value.trim() === "") return "";
            return value;
        };

        formData.append('id_user', clean(codArtista));
        formData.append('nome_artista', clean(nome));
        formData.append('atuacao', clean(atuacao));
        formData.append('descricao', clean(descricao));
        formData.append('email', clean(email));
        formData.append('telefone', clean(telefone));
        formData.append('instagram', clean(instagram));
        formData.append('wpp', clean(wpp));
        formData.append('x', clean(x));

        if (cover) {
            formData.append('imagem', cover);
        }

        try {
            const response = await fetch(`${backendUrl}/user/createArtist`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert('Artista Cadastrado com sucesso');
                window.location.reload();
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao criar artista. Tente novamente mais tarde.");
        }
    };


    return (
        <>
            <Menu />
            
            <main>
                <section className="pt-5">
                    <div className="container text-center">
                        <h1 className="display-4 fw-bolder">
                            Criar um <span className="mais-cultura-gradient-text">Artista</span>
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
                                            <label className="form-label">Cód. Artista</label>
                                            <input type="text" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Código do artista" value={codArtista}onChange={(e) => setCodArtista(e.target.value)} required />
                                        </div>

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
