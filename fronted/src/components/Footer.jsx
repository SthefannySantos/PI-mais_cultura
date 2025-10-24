'use client'

import Link from "next/link"

const footer = () => {
    return(
        <footer className="bg-dark text-white pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-4 ">
                        <h3 className="fw-bolder mb-3" ><span className="mais-cultura-gradient-text">+Cultura</span></h3>
                        <p className="text-white">
                            Aproximando pessoas por meio da cultura. Descubra eventos únicos e venha fazer parte da nossa comunidade
                        </p>
                    </div>

                    <div className="col-lg-3 mb-4">
                        <h3 className="fw-bold mb-3" >Navegação</h3>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link href={'/eventsAvaliable'} className="text-light text-decoration-none">Eventos Disponíveis</Link>
                            </li>
                            <li className="mb-2">
                                <Link href={'/eventsFinished'} className="text-light text-decoration-none">Eventos Finalizados</Link>
                            </li>
                            <li className="mb-2">
                                <Link href={'/contact'} className="text-light text-decoration-none">Contato</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 mb-4">
                        <h3 className="fw-bold mb-3" >Contato</h3>
                        <div className="d-flex align-items-center mb-1">
                            <i className="fa-regular fa-envelope me-2"></i>
                            <small>
                            <a href="mailto:maisecultura@gmail.com" className="text-decoration-none text-reset">maisecultura@gmail.com</a>
                        </small>
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-secondary"></hr>
                <div className="row pb-2">
                     <p style={{fontSize: ".75em"}}>&copy;2025 - Todos os direitos reservados</p>
                </div>

            </div>
        </footer>
    )
}

export default footer