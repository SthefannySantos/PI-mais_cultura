'use client';

import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default function ApiDocs() {
    const endpoints = [
        { method: "GET", route: "/cidades", description: "Lista as cidades cadastradas nos eventos." },
        { method: "GET", route: "/categorias", description: "Lista as categorias disponíveis na plataforma." },
        { method: "GET", route: "/eventos", description: "Lista eventos com filtros por cidade, categoria, título, artista e conclusão." },
        { method: "GET", route: "/eventos/:id", description: "Busca um evento específico pelo ID." },
        { method: "GET", route: "/artistas", description: "Lista artistas com filtros opcionais por nome e atuação." },
        { method: "GET", route: "/artistas/:id", description: "Busca um artista específico pelo ID." },
    ];

    return (
        <>
            <Menu />

            <main className="py-5" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
                <div className="container">

                    <section className="text-center mb-4">
                        <span className="badge rounded-pill px-3 py-2 mb-3 text-white"
                            style={{ background: "var(--mais-cultura-gradient-bg)" }}>
                            API Pública
                        </span>

                        <h1 className="fw-bold display-5 mb-3">
                            Nossa <span className="mais-cultura-gradient-text">API</span>
                        </h1>

                        <p className="lead mx-auto" style={{ maxWidth: "760px", color: "var(--card-text-muted)" }}>
                            O +Cultura disponibiliza uma API pública de consulta para acesso a dados
                            de eventos culturais, artistas, cidades e categorias em formato JSON.
                        </p>
                    </section>

                    <section className="row g-4 mb-5">
                        <div className="col-md-4">
                            <div className="cultura-card h-100 p-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                                <i className="fa-solid fa-code fs-3 mais-cultura-gradient-text mb-3"></i>
                                <h3 className="h5 fw-bold">Formato JSON</h3>
                                <p className="mb-0" style={{ color: "var(--card-text-muted)" }}>
                                    As respostas são retornadas em JSON para facilitar o consumo por outras aplicações.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cultura-card h-100 p-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                                <i className="fa-solid fa-globe fs-3 mais-cultura-gradient-text mb-3"></i>
                                <h3 className="h5 fw-bold">Rotas públicas</h3>
                                <p className="mb-0" style={{ color: "var(--card-text-muted)" }}>
                                    A API permite consultar eventos, artistas, cidades e categorias públicas da plataforma.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cultura-card h-100 p-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                                <i className="fa-solid fa-shield-halved fs-3 mais-cultura-gradient-text mb-3"></i>
                                <h3 className="h5 fw-bold">Dados seguros</h3>
                                <p className="mb-0" style={{ color: "var(--card-text-muted)" }}>
                                    Apenas dados públicos são disponibilizados, sem expor informações sensíveis dos usuários.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="cultura-card p-4 mb-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                        <h2 className="fw-bold mb-3">Base URL</h2>
                        <pre className="p-3 rounded mb-0 bg-dark text-light overflow-auto">
{`https://maisecultura.com.br/public`}
                        </pre>
                    </section>

                    <section className="cultura-card p-4 mb-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                        <h2 className="fw-bold mb-4">Endpoints disponíveis</h2>

                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Método</th>
                                        <th>Rota</th>
                                        <th>Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {endpoints.map((endpoint, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className="badge text-bg-success">{endpoint.method}</span>
                                            </td>
                                            <td>
                                                <code>{endpoint.route}</code>
                                            </td>
                                            <td>{endpoint.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="cultura-card p-4 mb-3" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                        <h2 className="fw-bold mb-3">Exemplo de uso</h2>

                        <pre className="p-3 rounded bg-dark text-light overflow-auto mb-0">
    {`fetch('https://maisecultura.com.br/public/eventos?cidade=Limeira')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));`}
                        </pre>
                    </section>

                    <section className="text-center mt-5 mb-5">
                        <a 
                            href="https://github.com/SthefannySantos/PI-mais_cultura" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn text-white rounded-pill px-4 py-2"
                            style={{ background: "var(--mais-cultura-gradient-bg)" }}
                        >
                            Ver documentação completa no GitHub
                        </a>
                    </section>

                    <section className="cultura-card p-4 mt-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                        <h2 className="fw-bold mb-3">Observações</h2>

                        <p style={{ color: "var(--card-text-muted)" }}>
                            Esta API é destinada ao consumo de dados públicos da plataforma +Cultura,
                            sendo voltada para integração com aplicações externas, testes e consultas.
                        </p>

                        <p style={{ color: "var(--card-text-muted)" }}>
                            As rotas disponíveis utilizam exclusivamente o método <code>GET</code> e não permitem
                            alterações nos dados.
                        </p>

                        <p style={{ color: "var(--card-text-muted)" }}>
                            Para mais informações sobre o uso de dados e privacidade, consulte nossa{" "}
                            <a href="/PrivacyPolicy" className="link-hover" style={{ color: '#8B5CF6' }}>
                                Política de Privacidade
                            </a>.
                        </p>
                    </section>

                </div>
            </main>

            <Footer />
        </>
    );
}