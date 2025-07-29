"use client"

import db from "@/src/db/db"
import { notFound } from "next/navigation"
import React, { useState } from "react"
import "./style.css"

export default function SignInPage({ }) {

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [cpf, setCpf] = useState('');
    let [cnpj, setCnpj] = useState('');
    let [contact, setContact] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault()

        const response = await fetch("apizza/create-restaurant", {
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                cpf: cpf,
                cnpj: cnpj,
                contact: contact
                
            })
        }) 
        console.log(response)
    }

    return <>
            <div>
                <img id="img-logotipo" src="imagens/logotipo.png" alt="logotipo" />
            </div>
            <form onSubmit={handleSubmit} action={"/HomePage"}>
                <p id="p1">Não tem um restaurante? Faça o seu!</p>
                <input type="text" placeholder="Nome do restaurante" value={name} required onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required  />
                <input type="text" placeholder="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required/>
                <input type="text" placeholder="Contato do restaurante" value={contact} onChange={(e) => setContact(e.target.value)} required />
                <label id="input-file-label" htmlFor="input-file">
                    <img src="imagens/upload_icon.svg"></img>
                    Adicione uma foto
                </label>
                <div>
                    <input id="input-file" type="file" />
                </div>

                <button id="cadastrar" type ="submit"> Criar </button>
            </form>
        </>
}