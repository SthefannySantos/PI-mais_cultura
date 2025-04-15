function menu() {
    return (
        `
        <div class="container-fluid px-3">
            <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
    
            <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                <a class="navbar-brand col-lg-3 me-0 fw-medium text-dark fw-bolder" href="#"><span style="color: #ab38d8; font-size: 1.55rem;">+</span>Cultura</a>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item ">
                        <a class="nav-link text-body-tertiary menu-links" href="#">Eventos Disponíveis</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-body-tertiary menu-links" href="#">Eventos Concluídos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-body-tertiary menu-links" href="#">Eventos Incritos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-body-tertiary menu-links" href="#">Sobre Nós</a>
                    </li>
                </ul>
            </div>
        </div>
        `
    )
}

document.addEventListener('DOMContentLoaded', menu);