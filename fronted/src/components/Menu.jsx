'use client'
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";

const Menu = () => {

    const nivelUser = useLocalStorage("acesso");

    const isLoggedIn = useIsLoggedIn();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/"; // redireciona após logout
    };
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light" aria-label="Menu" id="menu-area">
            
            <div className="container-fluid px-3 fw-medium">
                <Link className="navbar-brand fw-bold" href="/">
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
                            <Link className="nav-link" style={{color: '#6B7280'}} href="/eventsAvaliable">Eventos Disponíveis</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={{color: '#6B7280'}} href="/eventsFinished">Eventos Concluídos</Link>
                        </li>

                        {nivelUser == 1 && (
                            <li className="nav-item">
                                <Link className="nav-link" style={{color: '#6B7280'}} href="/myEvents">Meus Eventos</Link>
                            </li>
                        )}                        

                        <li className="nav-item">
                            <Link className="nav-link" style={{color: '#6B7280'}} href="/eventsSubscribed">Eventos Inscritos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={{color: '#6B7280'}} href="/contact">Contato</Link>
                        </li> 

                         
                            <li className="nav-item">
                                {!isLoggedIn ? (
                                    <Link className="nav-link " style={{color: '#8B5CF6'}} href="/login"> Login</Link>
                                ) : (
                                    <a className="nav-link text-danger" role="button" onClick={handleLogout}>Logout</a>
                                )}      
                            </li>
                            
                    </ul>
                </div>
            </div>     
        </nav>
    );
}

export default Menu;
