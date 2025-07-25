"use client"

import db from "@/src/db/db"
import { notFound } from "next/navigation"
import React, { useState } from "react"

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
    }

    return <div>

        <p> Crie seu restaurante </p>
        <form onSubmit={handleSubmit}>

            <label> Seu nome: </label>
            <input type="text" value = {name} onChange={(e) => setName(e.target.value)}> 
            </input>

            <label> Seu email: </label>
            <input type="text" value ={email} onChange={(e) => setEmail(e.target.value)}></input>
            
            <label> Seu CPF: </label>
            <input type="text" value ={cpf} onChange={(e) => setCpf(e.target.value)}></input>

            <label> Seu CNPJ: </label>
            <input type="text" value ={cnpj} onChange={(e) => setCnpj(e.target.value)}></input>

            <label> Contato do restaurante </label>
            <input type="text" value ={contact} onChange={(e) => setContact(e.target.value)}></input>
            
            <button type="submit"> Criar </button>
        </form>




    </div>
}