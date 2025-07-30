import db from "@/src/db/db"
import { cache } from "@/src/lib/cache"
import { notFound } from "next/navigation"
import CartClient from "./cartClient"
import { CheckoutForm } from "../../../products/[id]/purchase/_components/CheckoutForm"

interface Props {
    params: {
        id: string
    }
}

export default async function RestaurantCartPage({ params }: Props) {
    
    return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>
      <CartClient />
    </div>
  )
    

}