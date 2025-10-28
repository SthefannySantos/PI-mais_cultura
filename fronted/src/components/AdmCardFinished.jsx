'use client'
import "@/styles/effects.css";
import { useRouter } from "next/navigation";
import { backendUrl } from "@/lib/api";

const formatarData = (isoString) => {
  const data = new Date(isoString);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const categories = {
  musica: "Música",
  danca: "Dança",
  cinema: "Cinema",
  teatro: "Teatro",
  literatura: "Literatura",
};

const FinishedCard = ({ evento }) => {
  const router = useRouter();
  const percent = Math.round(
    (evento.total_inscritos / evento.limite_participantes) * 100
  );

  const handleDeleteEvent = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;

    try {
      const response = await fetch(`${backendUrl}/events/deleteEvent/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Evento excluído com sucesso!");
         window.location.reload();
      } else {
        const data = await response.json();
        alert("Erro: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir evento.");
    }
  };

  return (
    <div className="card border-0 rounded-4 p-0 overflow-hidden shadow h-100 card-hover" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
      <div className="card-body mx-1" style={{ color: "var(--card-text)" }}>
        <div className="d-flex justify-content-between mb-2">
          <span
            style={{ background: "var(--mais-cultura-gradient-bg)" }}
            className="rounded-pill px-2 text-white fw-bold"
          >
            {categories[evento.categoria].toUpperCase()}
          </span>
          <span
            className="fw-bold"
            style={{ color: "var(--mais-cultura-finished-color)" }}
          >
            <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
          </span>
        </div>

        <h5 className="card-title mb-2 fw-bold">{evento.titulo}</h5>

        <ul className="list-group list-group-flush my-1">
          <li className="list-group-item border-0 p-0 mb-1" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text-muted)" }}>
            <b>Organizador:</b> {evento.organizador_evento}
          </li>
          <li className="list-group-item border-0 p-0 mb-1" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text-muted)" }}>
            <b>Realizado em:</b> {formatarData(evento.dt_evento)}
          </li>
          <li className="list-group-item border-0 p-0 my-2" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text-muted)" }} aria-hidden="true">
            <div className="d-flex justify-content-between">
              <span>
                <i className="fa-solid fa-users" aria-hidden="true"></i>{" "}
                {evento.total_inscritos}/{evento.limite_participantes}
              </span>
              <span
                className="fw-bold"
                style={{ color: "var(--mais-cultura-finished-color)" }}
              >
                CONCLUÍDO
              </span>
            </div>
            <div
              className="progress rounded-pill mt-2"
              style={{ height: "8px", backgroundColor: "#e5e7eb" }}
            >
              <div
                className="progress-bar bg-success"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </li>
        </ul>

        {/* Botões Editar e Excluir */}
        <div className="d-flex gap-2 mt-2">
          <button
            type="button"
            className="btn btn-outline-primary rounded-pill fw-medium flex-fill p-2"
            onClick={() => router.push(`/editEvent?id=${evento.id}`)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>

          <button
            type="button"
            className="btn btn-outline-danger rounded-pill fw-medium flex-fill p-2"
            onClick={() => handleDeleteEvent(evento.id)}
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishedCard;
