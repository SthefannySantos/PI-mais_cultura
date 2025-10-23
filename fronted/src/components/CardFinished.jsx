'use client'
import "@/styles/effects.css";

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

const FinishedCard = ({ evento }) => {

    const percent = Math.round((evento.total_inscritos / evento.limite_participantes) * 100);
    
    return(
        <div className="card border-0 rounded-4 p-0 overflow-hidden shadow h-100 card-hover">
            
            <div className="card-body mx-1 text-muted" >
                <div className="d-flex justify-content-between mb-2">
                    <span style={{background: 'var(--mais-cultura-gradient-bg'}} className="rounded-pill px-2 text-white fw-bold">{categories[evento.categoria].toUpperCase()}</span>
                    <span className="fw-bold " style={{color: 'var(--mais-cultura-finished-color)'}}><i className="fa-regular fa-circle-check" aria-hidden="true"></i></span>
                </div>
                <h5 className="card-title mb-2 fw-bold" > {evento.titulo} </h5>
                <ul className="list-group list-group-flush my-1 ">
                    <li className="list-group-item border-0 p-0 mb-1 text-muted"><b>Organizador:</b> {evento.organizador_evento}</li>
                    <li className="list-group-item border-0 p-0 mb-1 text-muted">
                        <b>Realizado em:</b> {formatarData(evento.dt_evento)}
                    </li>
                    <li className="list-group-item border-0 p-0 my-2 text-muted" aria-hidden="true">
                        <div className="d-flex justify-content-between">
                            <span><i className="fa-solid fa-users" aria-hidden="true"></i> {evento.total_inscritos}/{evento.limite_participantes}</span>
                            <span className="fw-bold" style={{color: 'var(--mais-cultura-finished-color)'}}>CONCLUÍDO</span>
                        </div>
                        <div className="progress rounded-pill mt-2" style={{height: '8px', backgroundColor: '#e5e7eb'}}>
                            <div className="progress-bar bg-success" style={{width: `${percent}%`}} ></div>
                        </div>
                    </li>
                </ul>
                
                <button type="button" className="btn w-100 fw-medium p-2 my-1 "
                    style={{color: 'var(--mais-cultura-finished-color)', borderColor: 'var(--mais-cultura-finished-color)'}}
                    id={`eventId-${evento.id}`} disabled
                > CONCLUÍDO</button>

            </div>
        </div>
);

}

export default FinishedCard;
