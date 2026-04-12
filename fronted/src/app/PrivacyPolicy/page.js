 'use client';

import { useEffect } from "react";

import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
    useEffect(() => {
        document.title = "+Cultura | Política de Privacidade";
    }, []);

    return (
        <>
            <Menu />

            <main>
                <section className="pt-5">
                    <div className="container">
                        <div className="row text-center">
                            <div className="text-center">
                                <h1 className="display-4 fw-bolder">
                                    Política de <span className="mais-cultura-gradient-text">Privacidade</span>
                                </h1>
                                <p className="mt-3" style={{ color: "var(--card-text-muted)" }}>
                                    Saiba como o Mais Cultura trata as informações disponibilizadas na plataforma.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div
                                    className="cultura-card p-5 shadow-lg rounded-4"
                                    style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}
                                >
                                    <p className="mb-4" style={{ color: "var(--card-text-muted)" }}>
                                        <strong>Última atualização:</strong> 18/03/2026
                                    </p>

                                    <p>
                                        O <strong>Mais Cultura</strong> é uma plataforma voltada à divulgação de eventos
                                        culturais, artistas e atividades culturais. Esta Política de Privacidade explica
                                        quais informações podem ser coletadas, como elas são utilizadas e em quais
                                        situações podem ser divulgadas.
                                    </p>

                                    <p>
                                        Ao utilizar a plataforma ou cadastrar informações no sistema, o usuário declara
                                        estar ciente das práticas descritas nesta política.
                                    </p>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">1. Objetivo da plataforma</h2>
                                    <p>
                                        O Mais Cultura tem como finalidade promover a divulgação de eventos, atividades
                                        culturais e informações públicas relacionadas à cena cultural local e regional.
                                    </p>
                                    <p>
                                        Por esse motivo, parte dos dados cadastrados na plataforma possui natureza
                                        <strong> pública</strong>, especialmente aqueles destinados à divulgação de
                                        eventos e artistas.
                                    </p>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">2. Informações coletadas</h2>
                                    <p>
                                        A plataforma poderá coletar apenas as informações necessárias para seu
                                        funcionamento e para a divulgação cultural proposta.
                                    </p>
                                    <p>Entre elas, podem estar incluídas:</p>
                                    <ul>
                                        <li>nome do evento;</li>
                                        <li>descrição do evento;</li>
                                        <li>data e horário;</li>
                                        <li>local de realização;</li>
                                        <li>cidade;</li>
                                        <li>categoria cultural;</li>
                                        <li>imagem de divulgação;</li>
                                        <li>nome artístico do responsável ou participante;</li>
                                        <li>descrição pública do artista ou grupo;</li>
                                        <li>links públicos informados no cadastro.</li>
                                    </ul>
                                    <p>
                                        O Mais Cultura <strong>não tem como objetivo coletar ou divulgar dados sensíveis</strong>.
                                    </p>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">3. Dados sensíveis</h2>
                                    <p>
                                        O Mais Cultura não solicita, como parte da proposta principal da plataforma, o
                                        fornecimento de dados pessoais sensíveis, tais como:
                                    </p>
                                    <ul>
                                        <li>origem racial ou étnica;</li>
                                        <li>convicção religiosa;</li>
                                        <li>opinião política;</li>
                                        <li>filiação sindical;</li>
                                        <li>dados referentes à saúde;</li>
                                        <li>dados biométricos;</li>
                                        <li>informações sobre vida sexual;</li>
                                        <li>outros dados classificados como sensíveis pela legislação aplicável.</li>
                                    </ul>
                                    <p>
                                        Os usuários devem evitar inserir esse tipo de informação em campos de descrição,
                                        biografia, formulários ou materiais enviados à plataforma.
                                    </p>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">4. Uso das informações</h2>
                                    <p>As informações cadastradas poderão ser utilizadas para:</p>
                                    <ul>
                                        <li>exibir eventos e artistas na plataforma;</li>
                                        <li>organizar listagens públicas por cidade, categoria ou data;</li>
                                        <li>facilitar o acesso da população a eventos culturais;</li>
                                        <li>disponibilizar conteúdos culturais para consulta pública;</li>
                                        <li>permitir integração com aplicações, sites ou sistemas de terceiros por meio de API pública.</li>
                                    </ul>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">5. Divulgação pública das informações</h2>
                                    <p>
                                        Ao cadastrar um evento, artista ou conteúdo de divulgação cultural, o usuário
                                        reconhece que determinadas informações poderão ser tratadas como
                                        <strong> informações públicas</strong>, com a finalidade de divulgação cultural.
                                    </p>
                                    <p>
                                        Essas informações poderão ser exibidas dentro da própria plataforma e também
                                        disponibilizadas para consulta pública em integrações autorizadas pelo sistema.
                                    </p>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">6. Compartilhamento por meio de API pública</h2>
                                    <p>
                                        O Mais Cultura poderá disponibilizar parte do conteúdo público da plataforma por
                                        meio de uma <strong>API pública</strong>.
                                    </p>
                                    <p>Isso significa que terceiros, como por exemplo:</p>
                                    <ul>
                                        <li>prefeituras;</li>
                                        <li>secretarias ou departamentos de cultura;</li>
                                        <li>portais de eventos;</li>
                                        <li>aplicativos culturais;</li>
                                        <li>projetos comunitários;</li>
                                        <li>plataformas parceiras;</li>
                                    </ul>
                                    <p>
                                        poderão consultar e reutilizar informações públicas de eventos e artistas
                                        cadastrados, desde que disponíveis na API.
                                    </p>
                                    <p>
                                        Ao cadastrar informações destinadas à divulgação cultural, o usuário declara estar
                                        ciente de que esses dados públicos poderão ser acessados, exibidos e
                                        redistribuídos por terceiros por meio da API pública do Mais Cultura.
                                    </p>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">7. Limitação dos dados divulgados</h2>
                                    <p>
                                        A API pública e as áreas públicas da plataforma terão como foco apenas
                                        informações necessárias à divulgação cultural, como:
                                    </p>
                                    <ul>
                                        <li>nome artístico;</li>
                                        <li>nome do evento;</li>
                                        <li>descrição pública;</li>
                                        <li>categoria;</li>
                                        <li>cidade;</li>
                                        <li>local público do evento;</li>
                                        <li>data e horário;</li>
                                        <li>imagem de divulgação;</li>
                                        <li>links públicos relacionados ao evento ou artista.</li>
                                    </ul>
                                    <p>
                                        O Mais Cultura buscará <strong>não divulgar dados privados ou sensíveis</strong> em
                                        suas rotas públicas.
                                    </p>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">8. Responsabilidade pelas informações enviadas</h2>
                                    <p>
                                        O usuário responsável pelo cadastro declara que possui autorização para divulgar
                                        as informações inseridas na plataforma, incluindo dados de eventos, imagens,
                                        nomes artísticos, locais e demais materiais enviados.
                                    </p>
                                    <p>
                                        O usuário também se responsabiliza por não inserir dados sigilosos, sensíveis ou
                                        de terceiros sem autorização.
                                    </p>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">9. Remoção e moderação de conteúdo</h2>
                                    <p>
                                        O Mais Cultura poderá revisar, limitar ou remover conteúdos que:
                                    </p>
                                    <ul>
                                        <li>violem a legislação vigente;</li>
                                        <li>contenham dados sensíveis inadequadamente inseridos;</li>
                                        <li>divulguem informações privadas sem autorização;</li>
                                        <li>infrinjam direitos autorais;</li>
                                        <li>sejam incompatíveis com a proposta da plataforma.</li>
                                    </ul>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">10. Armazenamento e segurança</h2>
                                    <p>
                                        O Mais Cultura adotará medidas razoáveis para proteger as informações armazenadas
                                        em seu sistema, buscando reduzir riscos de acesso indevido, alteração não
                                        autorizada ou uso inadequado dos dados.
                                    </p>
                                    <p>
                                        Ainda assim, nenhum sistema é totalmente isento de riscos, e a plataforma não
                                        pode garantir segurança absoluta.
                                    </p>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">11. Alterações nesta política</h2>
                                    <p>
                                        Esta Política de Privacidade poderá ser atualizada periodicamente para refletir
                                        mudanças na plataforma, em suas funcionalidades ou na forma de tratamento das
                                        informações.
                                    </p>
                                    <p>
                                        Sempre que houver alteração relevante, a data de atualização será modificada
                                        nesta página.
                                    </p>

                                    <hr className="my-4" />

                                    <h2 className="h4 fw-bold mb-3 cultura-gradient-text">12. Contato</h2>
                                    <p>
                                        Em caso de dúvidas sobre esta Política de Privacidade ou sobre o uso das
                                        informações cadastradas no Mais Cultura, o usuário poderá entrar em contato pelos
                                        canais informados na plataforma.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}