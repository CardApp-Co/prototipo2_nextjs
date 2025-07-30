import db from "@/src/db/db"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckoutForm } from "./_components/CheckoutForm"

import './styles/style.css';
import './styles/style_header.css'
import DefaultHeader from "../../../components/defaultHeader";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
export default async function PurchasePage({
    params,
}: {
    params: { id: string }
}) {
    const { id } = await params
    const product = await db.product.findUnique({ where: { id } })
    if (product == null) return notFound()


    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.priceInCents,
        currency: "BRL",
        metadata: { productId: product.id }
    })

    if (paymentIntent.client_secret == null) {
        throw Error("Stripe  failed to create payment intent")
    }

    return (
        <>
            <DefaultHeader />
            <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />
        </>
    );
}