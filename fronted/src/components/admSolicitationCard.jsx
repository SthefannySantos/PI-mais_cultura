'use client'
import "@/styles/effects.css";
import { backendUrl } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

// dentro do seu componente AdminCard

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

const handleApprove = async (id) => {
  if (!confirm("Deseja aprovar esta solicitação?")) return;
  
  try {
    const response = await fetch(`${backendUrl}/events/approveSolicitation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert("Solicitação aprovada com sucesso!");
      window.location.reload();
    } else {
      alert("Erro: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao aprovar solicitação.");
  }
};

const handleReject = async (id) => {
  if (!confirm("Tem certeza que deseja rejeitar esta solicitação?")) return;
  
  try {
    const response = await fetch(`${backendUrl}/events/rejectSolicitation/${id}`, {
      method: "DELETE",
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert("Solicitação rejeitada com sucesso!");
      window.location.reload();
    } else {
      alert("Erro: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao rejeitar solicitação.");
  }
};


const AdminCard = ({ evento }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  
  const percent = Math.round(
    (evento.total_inscritos / evento.limite_participantes) * 100
  );
  const imgPath = evento.capa_evento
    ? `${backendUrl}${evento.capa_evento}`
    : `/events-categories/${evento.categoria}.jpg`;

  return (
    <div className="card border-0 rounded-5 p-0 overflow-hidden shadow h-100 card-hover" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
      <img src={imgPath} alt={evento.titulo} />

      {/* Tag da categoria */}
      <span
        className="position-absolute top-0 end-0 m-3 rounded-pill px-2 text-white fw-bold"
        style={{ background: "var(--mais-cultura-gradient-bg)" }}
      >
        {categories[evento.categoria]?.toUpperCase()}
      </span>

      <div className="card-body mx-1">
        <h5 className="card-title mb-1">{evento.titulo}</h5>

        <ul className="list-group list-group-flush my-1">
          <li className="list-group-item border-0 p-0 mb-1" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text-muted)" }}>
            <i className="fa-regular fa-user" aria-hidden="true"></i>{" "}
            {evento.organizador_evento}
          </li>
          <li className="list-group-item border-0 p-0 mb-1" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text-muted)" }}>
            <i className="fa-regular fa-calendar me-1" aria-hidden="true"></i>{" "}
            {formatarData(evento.dt_evento)}
          </li>
        </ul>

        {/* Botões administrativos */}
            <div className="my-2">
            {/* Concluir evento */}
            <button
                type="button"
                className="btn text-white rounded-pill fw-medium p-2 w-100 mb-2"
                style={{ background: "var(--mais-cultura-gradient-bg)" }} onClick={() => router.push(`/adm/solicitations/solicitation?id=${evento.id}`)}
            >
                Saiba Mais
            </button>

            {/* Editar e Excluir lado a lado */}
            <div className="d-flex gap-2">
                <button type="button" className="btn btn-outline-success rounded-pill fw-medium flex-fill p-2" onClick={() => handleApprove(evento.id)} >
                  <i className="bi bi-check2"></i>
                </button>

                <button type="button" className="btn btn-outline-danger rounded-pill fw-medium flex-fill p-2" onClick={() => handleReject(evento.id)} >
                  <i className="bi bi-x-lg"></i>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminCard;
