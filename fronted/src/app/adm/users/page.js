'use client';

import { useState, useEffect } from "react";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/admMenu";
import Footer from "@/components/Footer";
import { useVerifyUser } from "@/hooks/useVerifyUser";

export default function Home() {
    useVerifyUser();
    
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);

    const cargos = {'0': 'Usuário', '1': 'Artista', '2': 'Administrador'};

    useEffect(() => {
        document.title = "+Cultura | Usuários";
        async function fetchData() {
            try {
                const response = await fetch(`${backendUrl}/user/usersData`);

                const data = await response.json();

                setUsers(data);
            } catch (error) {
                console.error("Erro ao carregar eventos:", error);
                setUsers([]);
            } finally {
                setLoader(false);
            }
        }

    fetchData();
}, []);


    return (

    <>

        <Menu />
        <main>    

            {loader ? 
            (
                <div className="d-flex justify-content-center align-items-center vh-100" id="loader-div">
                    <div className="spinner-border loader-style" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            ) : (

                <>
                <section className="my-3 p-1" aria-label="Users">
                    <div className="container">
                        <div className="m-0 text-center">
                            <h1 className="fw-bolder mb-3">Todos <span className="mais-cultura-gradient-text" >Usuários</span></h1>
                        </div>
                        

                            {users.length === 0 ? (
                                <div className="d-flex justify-content-center align-items-center vh-100" id="loader-div">
                                    <h3 className="text-center mt-3 text-secondary">Não foi possível encontrar usuários</h3>
                                </div>
                            ) : (
                                <div className="table-responsive" style={{minHeight: '75vh'}}>
                                    <table className="table table-striped table-hover table-borderless dark-table">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Cód.</th>
                                                <th>Nome</th>
                                                <th>Email</th>
                                                <th>Nível de Acesso</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.nome}</td>
                                                    <td>{user.email}</td>
                                                    <td>{cargos[user.nivel_acesso]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}


                            
                        
                    </div>
                </section>

                </>

            )}

            

        </main>

        <Footer />

        </>
    );
}