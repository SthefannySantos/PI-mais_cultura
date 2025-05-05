function menu() {

    const container = document.getElementById('menu-area');
    container.innerHTML = ''; // Limpa antes de preencher

    container.innerHTML =
        `
        <div class="container-fluid px-3">
            <a class="navbar-brand fw-medium text-dark fw-bolder" href="/">
                <span style="color: #ab38d8; font-size: 1.55rem;">+</span>Cultura
            </a>

            <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
    
            <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item ">
                        <a class="nav-link text-body-tertiary menu-links" href="/eventsAvaliable">Eventos Disponíveis</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-body-tertiary menu-links" href="/eventsFinished">Eventos Concluídos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-body-tertiary menu-links" href="/subscribed">Eventos Inscritos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-body-tertiary menu-links" href="/contact">Contato</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-body-tertiary menu-links desconectar-link" onclick="logout()" >Desconectar</a>
                    </li>
                </ul>
            </div>
        </div>
    `
    
}

document.addEventListener('DOMContentLoaded', menu);

function logout() {
    localStorage.clear();
    window.location.href = '/login';
}