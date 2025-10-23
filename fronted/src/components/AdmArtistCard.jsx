'use client'
import "@/styles/effects.css";
import { backendUrl } from "@/lib/api";
import { useRouter } from 'next/navigation';

const Card = ({ artist }) => {
    const router = useRouter();
    
    const imgPath = artist.profile_pic ? `${backendUrl}${artist.profile_pic}` : `/artist-icon.png`;
    
    return(
        <div className="card border-0 rounded-5 p-0 overflow-hidden shadow h-100 card-hover text-center">
            {/* Imagem circular */}
            <img 
                src={imgPath} 
                alt="" 
                className="rounded-circle mx-auto mt-3"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
            
            <div className="card-body mx-1">
                <h5 className="card-title mb-1">{artist.nome_artista}</h5>
                
                <button 
                    type="button" 
                    aria-label={`Saiba mais sobre o evento`} 
                    className="btn w-100 text-white rounded-pill fw-medium p-2 my-1"
                    style={{ background: "var(--mais-cultura-gradient-bg)"}}
                    onClick={() => router.push(`/adm/artists/editArtist?id=${artist.id}`)}
                > 
                    Editar
                </button>
            </div>
        </div>
    );
}

export default Card;