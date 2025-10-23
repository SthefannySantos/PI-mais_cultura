"use client";
import { useState, useEffect } from "react";
import { backendUrl } from "@/lib/api";
import { EventDateFormated, EventHourFormated } from "@/functions/localData";

export default function SolicitationModal({ id, show, onClose }) {
  const [solicitation, setSolicitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eventCover, setEventCover] = useState(null);

  useEffect(() => {
    if (!show || !id) return;

    async function fetchSolicitation() {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/events/solicitationData/${id}`);
        if (!res.ok) throw new Error("Solicitação não encontrada");
        const data = await res.json();

        const imgPath = data.capa_evento
          ? `${backendUrl}${data.capa_evento}`
          : `/events-categories/${data.categoria}.jpg`;

        setSolicitation(data);
        setEventCover(imgPath);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar detalhes da solicitação");
        onClose();
      } finally {
        setLoading(false);
      }
    }

    fetchSolicitation();
  }, [id, show]);

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
        tabIndex="-1"
        style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
        }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        style={{
            width: "100%",
            height: "100%",
            margin: 0,
            maxWidth: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content rounded-4 h-100">
          {loading ? (
            <div className="p-5 text-center">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3">Carregando...</p>
            </div>
          ) : (
            <>
              {/* Capa */}
              <div
                className="modal-header text-white"
                style={{
                  background: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${eventCover}) center/cover no-repeat`,
                  height: "220px",
                  alignItems: "flex-end",
                }}
              >
                <h3 className="fw-bold m-0">{solicitation.titulo}</h3>
              </div>

              <div className="modal-body p-4">
                <div className="row mb-3">
                  <div className="col-md-4 mb-2">
                    <strong>Data:</strong> <br />
                    {EventDateFormated(solicitation.dt_evento)}
                  </div>
                  <div className="col-md-4 mb-2">
                    <strong>Horário:</strong> <br />
                    {EventHourFormated(solicitation.dt_evento)}
                  </div>
                  <div className="col-md-4 mb-2">
                    <strong>Local:</strong> <br />
                    {solicitation.local_evento}
                  </div>
                </div>

                <p className="lead text-justify mb-3">{solicitation.descricao}</p>

                <p className="mb-2">
                  <strong>Organizador:</strong> {solicitation.organizador_evento}
                </p>
                <p className="mb-2">
                  <strong>Categoria:</strong> {solicitation.categoria}
                </p>
                <p className="mb-0">
                  <strong>Inscrições até:</strong>{" "}
                  {EventDateFormated(solicitation.fim_inscricao)}
                </p>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill"
                  onClick={onClose}
                >
                  Fechar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
