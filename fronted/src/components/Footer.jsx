'use client'
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
                                <a className="text-light text-decoration-none">Eventos Concluídos</a>
                            </li>
                            <li className="mb-2">
                                <a className="text-light text-decoration-none">Eventos Finalizados</a>
                            </li>
                            <li className="mb-2">
                                <a className="text-light text-decoration-none">Sobre</a>
                            </li>
                            <li className="mb-2">
                                <a className="text-light text-decoration-none">Contato</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 mb-4">
                        <h3 className="fw-bold mb-3" >Contato</h3>
                        <div className="d-flex align-items-center mb-1">
                            <i className="fa-regular fa-envelope me-2"></i>
                            <small>maisecultura@gmail.com</small>
                        </div>
                        {/* <div className="d-flex align-items-center mb-2">
                            <i className="fa-solid fa-location-dot me-2"></i>
                            <small>R. Humberto Rossetti, 711 - Jd de Faveri, Artur Nogueira - SP</small>
                        </div> */}
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