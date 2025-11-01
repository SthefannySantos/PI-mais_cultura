'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // useParams no app router
import Menu from "@/components/Menu";
import AdmMenu from "@/components/admMenu";
import Footer from "@/components/Footer";
import { backendUrl } from "@/lib/api";
import { handleCoverChange } from "@/functions/handleCoverImage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toDate, toDateTimeLocal } from "@/functions/localData";
import { useVerifyUser } from "@/hooks/useVerifyUser";
import { useEventId } from "@/hooks/useEventId";

export default function EditEvent() {
    useVerifyUser();

    const router = useRouter();
    const eventId = useEventId();

    // States do form
    const [titulo, setTitulo] = useState("");
    const [valor, setValor] = useState(0);
    const [maxParticipants, setMaxParticipants] = useState(null);
    const [category, setCategory] = useState("teatro");
    const [date, setDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const [local, setLocal] = useState("");
    const [rua, setRua] = useState("");
    const [num, setNum] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [descricao, setDescricao] = useState("");
    const [mapLink, setMapLink] = useState('');
    const [cover, setCover] = useState(null);
    const [artista, setArtista] = useState(null);

    const [addressDisabled, setAddressDisabled] = useState(true);

    const nivelUser = useLocalStorage("acesso");
    const idUser = useLocalStorage("id");

    useEffect(() => {
        document.title = "+Cultura | Editar Evento";

        if (nivelUser !== null) { // só busca quando o hook tiver retornado algo
            fetchEventData();
        }
    }, [nivelUser]);

    const fetchEventData = async () => {
        try {
            let endpoint = `${backendUrl}/events/`;
            
            if (nivelUser == 1) {
                endpoint += `solicitationData/${eventId}`;
            } else if (nivelUser == 2) {
                endpoint += `eventData/${eventId}`;
            }

            const res = await fetch(endpoint);
            const data = await res.json();


            if (!res.ok) throw new Error(data.message);

            // Mapeamento para ambos
            setTitulo(data.titulo || '');
            setValor(data.valor || 0);
            setMaxParticipants(data.limite_participantes || '');
            setArtista(data.organizador_evento || data.id_user || ''); // se solicitação pega id_user
            setCategory(data.categoria || 'teatro');
            setDate(toDateTimeLocal(data.dt_evento) || '');
            setDeadline(toDate(data.fim_inscricao) || '');
            setDescricao(data.descricao || '');
            setMapLink(data.map_link || '');
            setCover(data.capa_evento || null);
            setAddressDisabled(false);

            setLocal(data.local_evento);

        } catch (err) {
            console.error(err);
            alert("Erro ao carregar dados do evento.");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('valor', String(valor));
        formData.append('descricao', descricao);
        formData.append('dt_evento', date);
        formData.append('fim_inscricao', deadline);
        formData.append('limite_participantes', maxParticipants);
        formData.append('categoria', category);
        formData.append('local_evento', local);
        formData.append('cidade', cidade);
        formData.append('estado', 'SP');
        formData.append('map_link', mapLink || '');
        formData.append('nivel_solicitado', nivelUser);
        formData.append('artista', nivelUser == 2 ? artista : idUser);
        if (cover) formData.append('imagem', cover);

        try {
            const response = await fetch(`${backendUrl}/events/updateEvent/${eventId}`, {
                method: "PUT",
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                alert("Evento atualizado com sucesso!");

                const path = nivelUser == 2 ? "adm/" : "/"
                router.push(path); // redireciona para a lista
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao enviar a atualização. Tente novamente mais tarde.");
        }
    };

    return (
        <>
            {nivelUser == 2 ? (
                <AdmMenu />
            ) : ( <Menu /> )}

            <main>
                {/* Mesma estrutura do form */}
                <section className="pt-5">
                    <div className="container">
                        <div className="row text-center">
                            <h1 className="display-4 fw-bolder">Editar <span className="mais-cultura-gradient-text">Evento</span></h1>
                        </div>
                    </div>
                </section>
                {/* Form */}
                <section className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="cultura-card p-5 shadow-lg rounded-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4"> {/* Título */}
                                            <label className="form-label">Título do Evento</label>
                                            <input type="text" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Digite o título" value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)} required />
                                        </div>

                                        <div className="mb-4"> {/* Valor */}
                                            <label className="form-label">Valor</label>
                                            <input type="number" step={0.1} className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Digite 0 se for gratuíto" value={valor}
                                            onChange={(e) => setValor(e.target.value)} required />
                                        </div>

                                        {nivelUser == 2 && (
                                            <div className="mb-4"> {/* Título */}
                                                <label className="form-label">Organizador</label>
                                                <input type="text" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Nome do organizador do evento" value={artista} onChange={(e) => setArtista(e.target.value)} required />
                                            </div>
                                        )}

                                        

                                        {/* Categoria e Limite */}
                                        <fieldset className="mb-4">
                                            <legend className="fs-6 fw-semibold mb-1">Informações Básicas</legend>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Categoria</label>
                                                    <select className="form-select" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} value={category} onChange={(e) => setCategory(e.target.value)} >
                                                        <option value="teatro">Teatro</option>
                                                        <option value="musica">Música</option>
                                                        <option value="danca">Dança</option>
                                                        <option value="cinema">Cinema</option>
                                                        <option value="literatura">Literatura</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Limite de Participantes</label>
                                                    <input type="number" min={1} className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Ex: 50" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} required />
                                                </div>
                                            </div>
                                        </fieldset>

                                        {/* Datas */}
                                        <fieldset className="mb-4">
                                            <legend className="fs-6 fw-semibold mb-1">Datas</legend>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Data e Hora do Evento</label>
                                                    <input type="datetime-local" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} value={date} onChange={(e) => setDate(e.target.value)} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Fim das Inscrições</label>
                                                    <input type="date" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                                                </div>
                                            </div>
                                        </fieldset>

                                        {/* Endereço */}
                                        <fieldset className="mb-4">
                                            <legend className="fs-6 fw-semibold mb-1">Endereço (Válido somente para São Paulo)</legend>
                                            <div className="mb-3 "> {/* Local */}
                                                <label className="form-label mt-3">Local do Evento</label>
                                                <input type="text" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Digite o título" value={local}
                                                onChange={(e) => setLocal(e.target.value)} required />
                                            </div>
                                        </fieldset>

                                        {/* Descrição */}
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Descrição do Evento</label>
                                            <textarea className="form-control" rows={5} style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Descreva o evento..." value={descricao} onChange={(e) => setDescricao(e.target.value)} required
                                            />
                                        </div>

                                        <div className="mb-4"> {/* Google Maps */}
                                            <label className="form-label">Link para Google Maps (opcional)</label>
                                            <input type="url" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Link para o google maps" value={mapLink}
                                            onChange={(e) => setMapLink(e.target.value)} />
                                        </div>

                                        <div className="mb-4"> {/* Capa */}
                                            <label className="form-label">Capa do Evento (opcional)</label>
                                            <input type="file" className="form-control" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} accept="image/*" onChange={(e) => handleCoverChange(e, setCover)} />

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
