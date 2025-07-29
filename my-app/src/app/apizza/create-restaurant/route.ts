import { NextResponse } from 'next/server'
import db from '@/src/db/db'

export async function POST(req: Request) {
    const body = await req.json()
    const { name, email, cpf, cnpj, contact } = body

    if (!name || !email || !cpf || !cnpj || !contact) {
        return NextResponse.json({
            message: "Está faltando alguma informação."
        }, { status: 400 })
    }

    try {
        const user = await db.user.create({
            data: {
                email,
                cpf
            
            }
        })

        const restaurant = await db.restaurant.create({
            data: {
                name,
                cnpj,
                contact,
                ownerId: user.id
            }
        })

        const updatedUser = await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                restaurantId: restaurant.id,
            },
        });

        return NextResponse.json({
            message: "Restaurante criado!"
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Erro ao criar user e restaurante."
        }, { status: 500 })
    }
}
