'use client'
import "@/styles/effects.css";
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

const categories = {
    'musica': 'Música', 'danca': 'Dança', 'cinema': 'cinema', 'teatro': 'Teatro', 'literatura': 'Literatura'
};


const Card = ({ evento }) => {

    const router = useRouter();
    
    const percent = Math.round((evento.total_inscritos / evento.limite_participantes) * 100);
    const imgPath = evento.capa_evento ? `${backendUrl}${evento.capa_evento}` : `/events-categories/${evento.categoria}.jpg`;

    return(
        <div className="card border-0 rounded-5 p-0 overflow-hidden shadow h-100 card-hover" style={{ maxHeight: '260px', backgroundColor: "var(--card-bg)", color: "var(--card-text)" }} >
            <img className="" height="" src={imgPath} alt={""} />
    
            {/* Tag da categoria */}
            <span className="position-absolute top-0 end-0 m-3 rounded-pill px-2 text-white fw-bold"
                style={{ background: 'var(--mais-cultura-gradient-bg)' }}>
                {categories[evento.categoria]?.toUpperCase()}
            </span>
            
            <div className="card-body mx-1" >
                <h5 className="card-title mb-1" > {evento.titulo} </h5>
                <ul className="list-group list-group-flush my-1" >
                    <li className="list-group-item border-0 p-0 mb-1" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text-muted)" }}><i className="fa-regular fa-user" aria-hidden="true"></i> {evento.organizador_evento}</li>
                    <li className="list-group-item border-0 p-0 mb-1" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text-muted)" }}>
                        <i className="fa-regular fa-calendar me-1" aria-hidden="true"></i> {formatarData(evento.dt_evento)}
                    </li>
                    <li className="list-group-item border-0 p-0 mb-1" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text-muted)" }} aria-hidden="true">
                        <div className="d-flex justify-content-between">
                            <span><i className="fa-solid fa-users" aria-hidden="true"></i> {evento.total_inscritos}/{evento.limite_participantes}</span>
                            <span>{percent}%</span>
                        </div>
                        <div className="progress rounded-pill mt-2" style={{height: '8px', backgroundColor: '#e5e7eb'}}>
                            <div className="progress-bar" role="progressbar" style={{width: `${percent}%`, background: 'var(--mais-cultura-gradient-bg)'}}></div>
                        </div>
                    </li>
                </ul>
                
                <button type="button" aria-label={`Saiba mais sobre o evento`} className="btn w-100 text-white rounded-pill fw-medium p-2 my-1"
                    id={`eventId-${evento.id}`} style={{ background: "var(--mais-cultura-gradient-bg)",}} onClick={() => { router.push(`/event?id=${evento.id}`) }}
                > Saiba Mais</button>

            </div>
        </div>
);

}

export default Card;
