"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { formatCurrency } from "@/src/lib/formatters"
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Image from "next/image"
import { FormEvent, useState } from "react"

import { useCart } from '@/src/app/(customerFacing)/cartMemory'

type CheckoutFormProps = {
    product: {
        id: string,
        imagePath: string,
        name: string,
        description: string,
        priceInCents: number
    },
    clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
    const { cart, addToCart } = useCart()

    const handleAdd = () => {
        addToCart(product.id)
    }

    return (
        <div className="max-w-5x1 w-full mx-auto space-y-8">

            <Elements options={{ clientSecret }} stripe={stripePromise}>
                <Form priceInCents={product.priceInCents} />
            </Elements>
        </div>
    )
}

export function Prato({ product, clientSecret }: CheckoutFormProps) {
    const { cart, addToCart } = useCart()

    const handleAdd = () => {
        addToCart(product.id)
    }

    return (
        <>
            <div className='container-prato'>

                <div className='container1'>
                    <div className='container1-nomeDoPrato'>
                        {product.name}
                    </div>
                    <div className='container1-imagem'>
                        <img src={product.imagePath}></img>
                    </div>
                </div>

                <div className="container-custo">
                    Custo: {formatCurrency(product.priceInCents / 100)}
                </div>

                <div>
                    <button className="botao-comanda" onClick={handleAdd}>
                        Adicionar à comanda
                    </button>
                </div>

                <div className='container2'>
                    <div className='container2-nome'>
                        Descrição
                    </div>
                    <div className='container2-descricao'>{product.description}</div>
                </div>
                <a className="comprar" href={`/products/${product.id}/purchase`}>COMPRAR</a>
            </div>
        </>
    );
}

/*
<div className="flex gap-4 items-center">
                <div className="aspect-video flex-shrink-0 w-1/3 relative">
                    <Image src={product.imagePath} fill alt={product.name} className="object-cover" />
                </div>
                <div>
                    <div className="text-lg">
                        {formatCurrency(product.priceInCents / 100)}
                    </div>
                    <h1 className="text=2x1 font-bold">{product.name}</h1>
                    <button className="botao-teste" onClick={handleAdd}>ADICIONAR À COMANDA</button>
                    <a href={`/products/${product.id}/purchase`}>compra logo</a>
                </div>
            </div>
*/




export function Form({ priceInCents }: { priceInCents: number }) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [email, setEmail] = useState<string>()

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (stripe == null || elements == null || email == null) return

        setIsLoading(true)

        stripe.confirmPayment({
            elements, confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`
            },
        }).then(({ error }) => {
            if (error.type === "card_error" || error.type === "validation_error") {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("error unknown")
            }
        }).finally(() => setIsLoading(false))

    }
    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    {errorMessage && (<CardDescription className="text-destructive">{errorMessage}</CardDescription>)}
                </CardHeader>
                <CardContent>
                    <PaymentElement />
                    <div className="mt-4">
                        <LinkAuthenticationElement onChange={e => setEmail(e.value.email)} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" disabled={stripe == null || elements == null || isLoading}>{isLoading ? "Purchasing ..." : `Purchase - ${formatCurrency(priceInCents / 100)}`}</Button>
                </CardFooter>
            </Card>

        </form>
    )
}