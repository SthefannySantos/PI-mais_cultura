'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { backendUrl } from "@/lib/api";

import "@/styles/effects.css";

import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { togglePassword } from "@/components/animations/showHidePassword";
import { levelAccessRedirect, verifyUserData } from "@/functions/localData";

export default function Home() {
    const [loader, setLoader] = useState(true);
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");

     // States do form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    useEffect(() => {
        document.title = "+Cultura | Login";
        
        const validate = verifyUserData();
        
        validate ? router.push(levelAccessRedirect()) : localStorage.clear();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { email, password };

        try {
            const response = await fetch(`${backendUrl}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            setEmail("");
            setPassword("");
            setError("");

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('id', data.id);
                localStorage.setItem('nome', data.nome);
                localStorage.setItem('email', data.email);
                localStorage.setItem('acesso', data.acesso);

                router.push(data.url);
                
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error);
        }
    };


    return (

    <>

        <Menu />
        
        <main>

            {/* Contact Form */}
            <section className="py-5 ">
                <div className="container">
                    
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7">
                            
                            <div className="cultura-card p-5 shadow-lg rounded-4" style={{ backgroundColor: "var(--card-bg)", color: "var(--card-text)" }}>
                                <div className="row text-center mb-3">
                                    <h1 className="fw-bolder mb-1"> <span className="mais-cultura-gradient-text">+Cultura</span> </h1>
                                    <p className="fs-5 fw-medium" style={{ color: "var(--card-text-muted)" }}> Entre na sua conta para continuar </p>
                                </div>
                                
                            
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="mb-4">
                                            <label className="form-label fw-medium">E-mail</label>
                                            <div className="input-group">
                                                <span className="input-group-text border-end-0" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}>
                                                    <i className="fa-regular fa-envelope"></i>
                                                </span>
                                                <input type="email" className="form-control border-start-0" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text border-end-0" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }}>
                                                    <i className="fa-solid fa-lock"></i>
                                                </span>
                                                <input type={show ? "text" : "password"} className="form-control border-start-0" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                <span className="input-group-text" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-input)" }} onClick={() => togglePassword(show, setShow)}>
                                                    <i className={`fa-solid ${show ? "fa-eye-slash" : "fa-eye"}`}></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {error && <p id="message" className="mb-2 text-center text-danger"> {error}</p>}                                    

                                    <div className="row justify-content-center align-items-center mx-auto">
                                        <div className="col-12 col-md-10">
                                            <button type="submit" className="btn w-100 text-white rounded-pill fw-medium p-2 my-1" style={{ background: "var(--mais-cultura-gradient-bg)",}}>
                                                Entrar
                                            </button>
                                        </div>
                                    </div>

                                </form>

                                <div className="row text-center mt-3">
                                    <a className="fw-medium link-offset-2-hover link-offset-3 link-underline-opacity-0  link-underline-opacity-75-hover link-hover" style={{color: '#8B5CF6'}} onClick={() => router.push('/contact')}> Esqueceu sua senha? </a>
                                </div>

                                <div className="row text-center mt-3">
                                    <div className="">Não tem uma conta? <a style={{color: '#8B5CF6'}} className="link-hover" onClick={() => router.push('/signUp')}>Cadastre-se</a></div>
                                </div>
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
