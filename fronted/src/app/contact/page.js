'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { backendUrl } from "@/lib/api";

import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default function Home() {
    const [eventsAvaliable, setEventsAvaliable] = useState([]);
    const [loader, setLoader] = useState(true);

    // States do form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactType, setContactType] = useState("general");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const contactTable = { 'general': 'Geral', 'event': 'Evento', 'partnership': 'Parceria', 'support': 'Suporte técnico', 'feedback': 'Feedback'}

    useEffect(() => {
        document.title = "+Cultura | Contato";
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, email, contactType: contactTable[contactType], subject, message };

    try {
        const response = await fetch(`${backendUrl}/action/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Mensagem enviada com sucesso!");
            // Resetar formulário
            setName("");
            setEmail("");
            setContactType("general");
            setSubject("");
            setMessage("");
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao enviar a mensagem. Tente novamente mais tarde.");
    }
};

return (

    <>

        <Menu />
        
        <main>

            <section className="pt-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="text-center">
                            <h1 className="display-4 fw-bolder">
                            Entre em <span className="mais-cultura-gradient-text">Contato</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-4 ">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="cultura-card p-5 shadow-lg rounded-4">
                                <div className="text-center mb-2">
                                    <h2 className="h3 fw-bold mb-1 cultura-gradient-text">Envie sua Mensagem</h2>
                                    <p className="text-muted">
                                    Preencha o formulário abaixo e nossa equipe entrará em contato
                                    </p>
                                </div>
                            
                                <form onSubmit={handleSubmit} >
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-medium">Nome completo</label>
                                            <input type="text" className="form-control" placeholder="Seu nome" value={name}
                                            onChange={(e) => setName(e.target.value)} required />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-medium">E-mail</label>
                                            <input type="email" className="form-control" placeholder="seu@email.com" value={email}
                                            onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-medium">Tipo de contato</label>
                                            <select name="type" className="form-select" value={contactType}
                                            onChange={(e) => setContactType(e.target.value)}>
                                                <option value="general">Dúvida geral</option>
                                                <option value="event">Organizar evento</option>
                                                <option value="partnership">Parceria</option>
                                                <option value="support">Suporte técnico</option>
                                                <option value="feedback">Feedback</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-medium">Assunto</label>
                                            <input type="text" className="form-control" placeholder="Assunto da sua mensagem" value={subject}
                                            onChange={(e) => setSubject(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-medium">Mensagem</label>
                                        <textarea className="form-control" rows={6} placeholder="Descreva como podemos ajudá-lo..." value={message}
                                        onChange={(e) => setMessage(e.target.value)} required />
                                    </div>

                                        <div className="row justify-content-center align-items-center mx-auto">
                                        <div className="col-12 col-md-6">
                                            <button type="submit" className="btn w-100 text-white rounded-pill fw-medium p-2 my-1" style={{ background: "var(--mais-cultura-gradient-bg)",}}>
                                                Enviar Mensagem
                                            </button>
                                        </div>
                                    </div>

                                    
                                </form>
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
