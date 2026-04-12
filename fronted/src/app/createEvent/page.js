'use client';

import { useState, useEffect } from "react";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/Menu";
import AdmMenu from "@/components/admMenu";
import Footer from "@/components/Footer";
import { handleCoverChange } from "@/functions/handleCoverImage";
import { useVerifyUser } from "@/hooks/useVerifyUser";

export default function Home() {
    useVerifyUser();

    const [titulo, setTitulo] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [valor, setValor] = useState(0);
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
    const [mapLink, setMapLink] = useState("");
    const [cover, setCover] = useState(null);
    const [artista, setArtista] = useState(null);
    const [nivelUser, setNivelUser] = useState();
    const [id, setId] = useState();

    const [addressDisabled, setAddressDisabled] = useState(true);
    const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

    useEffect(() => {
        document.title = "+Cultura | Criar Evento";
        setNivelUser(localStorage.getItem("acesso"));
        setId(localStorage.getItem("id"));
    }, []);

    useEffect(() => {
        if (showGuidelinesModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showGuidelinesModal]);

    const handleCEPBlur = async () => {
        const cleanCEP = CEP.replace(/\D/g, "");

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
            setAddressDisabled(false);
        } catch (error) {
            console.error(error);
            alert("Erro ao buscar CEP. Você pode preencher manualmente.");
            setAddressDisabled(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowGuidelinesModal(true);
    };

    const sendEvent = async () => {
        const enderecoCompleto = local
            ? `${local}, ${rua}, ${num} - ${bairro}, ${cidade} - SP`
            : `${rua}, ${num} - ${bairro}, ${cidade} - SP`;

        const formData = new FormData();

        formData.append("titulo", titulo);
        formData.append("descricao", descricao);
        formData.append("valor", String(valor));
        formData.append("dt_evento", date);
        formData.append("fim_inscricao", deadline);
        formData.append("limite_participantes", maxParticipants);
        formData.append("categoria", category);
        formData.append("local_evento", enderecoCompleto);
        formData.append("cidade", cidade);
        formData.append("estado", "SP");
        formData.append("map_link", mapLink || "");
        formData.append("nivel_solicitado", nivelUser);
        formData.append("artista", nivelUser == 2 ? artista : id);

        if (cover) {
            formData.append("imagem", cover);
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
            alert("Erro ao enviar o evento. Tente novamente mais tarde.");
        }
    };

    return (
        <>
            {nivelUser == 2 ? <AdmMenu /> : <Menu />}

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

                <section className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div
                                    className="cultura-card p-5 shadow-lg rounded-4"
                                    style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}
                                >
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="form-label">Título do Evento</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                placeholder="Digite o título"
                                                value={titulo}
                                                onChange={(e) => setTitulo(e.target.value)}
                                                required
                                            />
                                        </div>

                                        {nivelUser == 2 && (
                                            <div className="mb-4">
                                                <label className="form-label">Organizador</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                    placeholder="Nome do organizador do evento"
                                                    value={artista || ""}
                                                    onChange={(e) => setArtista(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        )}

                                        <div className="mb-4">
                                            <label className="form-label">Valor</label>
                                            <input
                                                type="number"
                                                step={0.1}
                                                className="form-control"
                                                style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                placeholder="Digite 0 se for gratuíto"
                                                value={valor}
                                                onChange={(e) => setValor(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <fieldset className="mb-4">
                                            <legend className="fs-6 fw-semibold mb-1">Informações Básicas</legend>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Categoria</label>
                                                    <select
                                                        className="form-select"
                                                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        required
                                                    >
                                                        <option value="teatro">Teatro</option>
                                                        <option value="musica">Música</option>
                                                        <option value="danca">Dança</option>
                                                        <option value="cinema">Cinema</option>
                                                        <option value="literatura">Literatura</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label">Limite de Participantes</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        className="form-control"
                                                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                        placeholder="Ex: 50"
                                                        value={maxParticipants}
                                                        onChange={(e) => setMaxParticipants(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset className="mb-4">
                                            <legend className="fs-6 fw-semibold mb-1">Datas</legend>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Data e Hora do Evento</label>
                                                    <input
                                                        type="datetime-local"
                                                        className="form-control"
                                                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label">Fim das Inscrições</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                        value={deadline}
                                                        onChange={(e) => setDeadline(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset className="mb-4">
                                            <legend className="fs-6 fw-semibold mb-1">
                                                Endereço (Válido somente para São Paulo)
                                            </legend>

                                            <div className="mb-3">
                                                <label className="form-label mt-3">Local do Evento</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                    placeholder="Digite o local"
                                                    value={local}
                                                    onChange={(e) => setLocal(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-md-4">
                                                    <label className="form-label">CEP</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                        placeholder="00000-000"
                                                        value={CEP}
                                                        onChange={(e) => setCEP(e.target.value)}
                                                        onBlur={handleCEPBlur}
                                                        required
                                                    />
                                                </div>

                                                <div className="col-md-8">
                                                    <label className="form-label">Rua</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                        value={rua}
                                                        onChange={(e) => setRua(e.target.value)}
                                                        disabled={addressDisabled}
                                                        required
                                                    />
                                                </div>

                                                <div className="col-md-3">
                                                    <label className="form-label">N°</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                        value={num}
                                                        onChange={(e) => setNum(e.target.value)}
                                                        disabled={addressDisabled}
                                                        required
                                                    />
                                                </div>

                                                <div className="col-md-5">
                                                    <label className="form-label">Bairro</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                        value={bairro}
                                                        onChange={(e) => setBairro(e.target.value)}
                                                        disabled={addressDisabled}
                                                        required
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <label className="form-label">Cidade</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                        value={cidade}
                                                        onChange={(e) => setCidade(e.target.value)}
                                                        disabled={addressDisabled}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </fieldset>

                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">Descrição do Evento</label>
                                            <textarea
                                                className="form-control"
                                                rows={5}
                                                style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                placeholder="Descreva o evento..."
                                                value={descricao}
                                                onChange={(e) => setDescricao(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Link para Google Maps (opcional)</label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                placeholder="Link para o Google Maps"
                                                value={mapLink}
                                                onChange={(e) => setMapLink(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">Capa do Evento (opcional)</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}
                                                accept="image/*"
                                                onChange={(e) => handleCoverChange(e, setCover)}
                                            />
                                        </div>

                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn text-white w-50 rounded-pill fw-semibold"
                                                style={{ background: "var(--mais-cultura-gradient-bg)" }}
                                            >
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

            {showGuidelinesModal && (
                <>
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div
                                className="modal-content border-0 rounded-4"
                                style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}
                            >
                                <div className="modal-header border-0">
                                    <h5 className="modal-title fw-bold">
                                        Confirmar envio do evento
                                    </h5>
                                </div>

                                <div className="modal-body">
                                    <p>
                                        Ao continuar, você declara que está ciente e de acordo com as diretrizes da plataforma.
                                    </p>

                                    <p>
                                        As informações do evento poderão ser exibidas publicamente no sistema e também
                                        utilizadas por terceiros através da API pública do Mais Cultura.
                                    </p>

                                    <p>
                                        Ao confirmar, você assume a responsabilidade pelas informações fornecidas.
                                    </p>

                                    <p className="mb-0">
                                        <a
                                            href="/PrivacyPolicy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fw-semibold text-dark link-warning link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                                            style={{ color: "var(--mais-cultura-gradient-text)" }}
                                        >
                                            Ler diretrizes e política de privacidade
                                        </a>
                                    </p>
                                </div>

                                <div className="modal-footer border-0 d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary rounded-pill px-4"
                                        onClick={() => setShowGuidelinesModal(false)}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn text-white rounded-pill px-4"
                                        style={{ background: "var(--mais-cultura-gradient-bg)" }}
                                        onClick={async () => {
                                            setShowGuidelinesModal(false);
                                            await sendEvent();
                                        }}
                                    >
                                        Confirmar envio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            <Footer />
        </>
    );
}