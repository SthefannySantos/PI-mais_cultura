'use client'
import { backendUrl } from "@/lib/api";
import { useRouter } from 'next/navigation';

const formatarData = (isoString) => {
  const data = new Date(isoString);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const Card = ({ evento }) => {
  const router = useRouter();

  return (
    <div className="card border-0 rounded-5 p-0 overflow-hidden shadow h-100 card-hover">

      <div className="card-body d-flex flex-column align-items-center justify-content-center mx-1">
        <button
          type="button"
          aria-label="Criar Evento"
          className="btn d-flex flex-column align-items-center justify-content-center rounded-5 p-3"
          onClick={() => router.push(`/createEvent`)}
        >
          <i className="bi bi-plus-circle mais-cultura-gradient-text fs-1" ></i>
          <span className="mais-cultura-gradient-text fw-bold fs-4">Criar Evento</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
