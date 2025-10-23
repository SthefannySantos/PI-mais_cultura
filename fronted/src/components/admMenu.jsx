'use client'
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin";
import Link from "next/link";

const admMenu = () => {

    useVerifyAdmin();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/"; // redireciona após logout
    };
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light" aria-label="Menu" id="menu-area">
            
            <div className="container-fluid px-3 fw-medium">
                <Link className="navbar-brand fw-bold" href="/adm">
                    <span style={{
                        background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>+Cultura </span>
                </Link>

                <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
        
                <div className="collapse navbar-collapse" id="navbarsExample11">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" style={{color: '#6B7280'}} href="/adm/solicitations">Solicitações</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={{color: '#6B7280'}} href="/createEvent">Criar Evento</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={{color: '#6B7280'}} href="/adm/users">Usuários</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={{color: '#6B7280'}} href="/adm/artists">Artistas</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-danger" role="button" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>     
        </nav>
    );
}

export default admMenu;
