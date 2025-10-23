'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/Menu";
import AdmMenu from "@/components/admMenu";
import Footer from "@/components/Footer";
import { handleCoverChange } from "@/functions/handleCoverImage";
import { useVerifyUser } from "@/hooks/useVerifyUser";

export default function Home() {
    useVerifyUser();

    // States do form
    const [titulo, setTitulo] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [category, setCategory] = useState("teatro");
    const [date, setDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const [local, setLocal] = useState("");
    const [CEP, setCEP] = useState("");
    const [rua, setRua] = useState("");
    const [num, setNum] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [descricao, setDescricao] = useState("");
    const [mapLink, setMapLink] = useState('');
    const [cover, setCover] = useState(null);
    const [artista, setArtista] = useState(null);
    const [nivelUser, setNivelUser] = useState();
    const [id, setId] = useState();


    const [addressDisabled, setAddressDisabled] = useState(true);

    useEffect(() => {
        document.title = "+Cultura | Criar Evento";
        setNivelUser(localStorage.getItem('acesso'));
        setId(localStorage.getItem('id'));
}, []);

// Função para buscar o CEP
const handleCEPBlur = async () => {
    const cleanCEP = CEP.replace(/\D/g, ''); // remove tudo que não for número

    if (!cleanCEP || cleanCEP.length !== 8) {
        alert("Digite um CEP válido (8 números).");
        setAddressDisabled(true);
        return;
    }

    try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
        const data = await res.json();

        if (data.erro) {
            alert("CEP não encontrado. Preencha o endereço manualmente.");
            setAddressDisabled(false);
            setRua("");
            setBairro("");
            setCidade("");

            return;
        }

        setRua(data.logradouro || "");
        setBairro(data.bairro || "");
        setCidade(data.localidade || "");
        setAddressDisabled(false); // habilita para possível edição
    } catch (error) {
        console.error(error);
        alert("Erro ao buscar CEP. Você pode preencher manualmente.");
        setAddressDisabled(false);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const enderecoCompleto = local ? `${local}, ${rua}, ${num} - ${bairro}, ${cidade} - SP` : `${rua}, ${num} - ${bairro}, ${cidade} - SP`;

    const formData = new FormData();

        formData.append('titulo', titulo);
        formData.append('descricao', descricao);
        formData.append('dt_evento', date);
        formData.append('fim_inscricao', deadline);
        formData.append('limite_participantes', maxParticipants);
        formData.append('categoria', category);
        formData.append('local_evento', enderecoCompleto);
        formData.append('cidade', cidade);
        formData.append('estado', 'SP');
        formData.append('map_link', mapLink || '');
        formData.append('nivel_solicitado', nivelUser);
        formData.append('artista', nivelUser == 2 ? artista : id);

        if (cover) {
            formData.append('imagem', cover);
        }


    try {
        const response = await fetch(`${backendUrl}/events/createEvent`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            window.location.reload();
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao enviar a mensagem. Tente novamente mais tarde.");
    }
};

return (

    <>


        {nivelUser == 2 ? (
            <AdmMenu />
        ) : ( <Menu /> )}
        
        <main>

            <section className="pt-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="text-center">
                            <h1 className="display-4 fw-bolder">
                            Criar um <span className="mais-cultura-gradient-text">Evento</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-4 ">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="cultura-card p-5 shadow-lg rounded-4">
                            
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4"> {/* Título */}
                                        <label className="form-label">Título do Evento</label>
                                        <input type="text" className="form-control" placeholder="Digite o título" value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)} required />
                                    </div>

                                    {nivelUser == 2 && (
                                        <div className="mb-4"> {/* Título */}
                                            <label className="form-label">Organizador</label>
                                            <input type="text" className="form-control" placeholder="Nome do organizador do evento" value={artista} onChange={(e) => setArtista(e.target.value)} required />
                                        </div>
                                    )}

                                    

                                    {/* Categoria e Limite */}
                                    <fieldset className="mb-4">
                                        <legend className="fs-6 fw-semibold mb-1">Informações Básicas</legend>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Categoria</label>
                                                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required >
                                                    <option value="teatro">Teatro</option>
                                                    <option value="musica">Música</option>
                                                    <option value="danca">Dança</option>
                                                    <option value="cinema">Cinema</option>
                                                    <option value="literatura">Literatura</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Limite de Participantes</label>
                                                <input type="number" min={1} className="form-control" placeholder="Ex: 50" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} required />
                                            </div>
                                        </div>
                                    </fieldset>

                                    {/* Datas */}
                                    <fieldset className="mb-4">
                                        <legend className="fs-6 fw-semibold mb-1">Datas</legend>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Data e Hora do Evento</label>
                                                <input type="datetime-local" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Fim das Inscrições</label>
                                                <input type="date" className="form-control" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                                            </div>
                                        </div>
                                    </fieldset>

                                    {/* Endereço */}
                                    <fieldset className="mb-4">
                                        <legend className="fs-6 fw-semibold mb-1">Endereço (Válido somente para São Paulo)</legend>
                                        <div className="mb-3 "> {/* Local */}
                                            <label className="form-label mt-3">Local do Evento</label>
                                            <input type="text" className="form-control" placeholder="Digite o título" value={local}
                                            onChange={(e) => setLocal(e.target.value)} required />
                                        </div>
                                        <div className="row g-3">
                                        <div className="col-md-4">
                                            <label className="form-label">CEP</label>
                                            <input type="text" className="form-control" placeholder="00000-000" value={CEP} onChange={(e) => setCEP(e.target.value)} onBlur={handleCEPBlur} required />

                                        </div>
                                        <div className="col-md-8">
                                            <label className="form-label">Rua</label>
                                            <input type="text" className="form-control" value={rua} onChange={(e) => setRua(e.target.value)} disabled={addressDisabled} required />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">N°</label>
                                            <input type="text" className="form-control" value={num} onChange={(e) => setNum(e.target.value)} disabled={addressDisabled} required />
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label">Bairro</label>
                                            <input type="text" className="form-control" value={bairro} onChange={(e) => setBairro(e.target.value)} disabled={addressDisabled} required />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">Cidade</label>
                                            <input type="text" className="form-control" value={cidade} onChange={(e) => setCidade(e.target.value)} disabled={addressDisabled} required />
                                        </div>
                                        </div>
                                    </fieldset>

                                    {/* Descrição */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Descrição do Evento</label>
                                        <textarea className="form-control" rows={5} placeholder="Descreva o evento..." value={descricao} onChange={(e) => setDescricao(e.target.value)} required
                                        />
                                    </div>

                                    <div className="mb-4"> {/* Google Maps */}
                                        <label className="form-label">Link para Google Maps (opcional)</label>
                                        <input type="url" className="form-control" placeholder="Link para o google maps" value={mapLink}
                                        onChange={(e) => setMapLink(e.target.value)} />
                                    </div>

                                    <div className="mb-4"> {/* Capa */}
                                        <label className="form-label">Capa do Evento (opcional)</label>
                                        <input type="file" className="form-control" accept="image/*" onChange={(e) => handleCoverChange(e, setCover)} />

                                    </div>

                                    {/* Botão */}
                                    <div className="text-center">
                                        <button type="submit" className="btn text-white w-50 rounded-pill fw-semibold" style={{ background: "var(--mais-cultura-gradient-bg)" }}
                                        > Enviar </button>
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
