import db from "@/src/db/db"
import { notFound } from "next/navigation"

export default async function UserPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const user = await db.user.findUnique({ where: { id } })
    if (user == null) return notFound()
    console.log("sserachado")
    const restaurantId = user.restaurantId

    if (restaurantId) {
        const restaurant = await db.restaurant.findUnique({
            where: { id: restaurantId }

        })
        if (restaurant) {
            return <p> {restaurant.name} </p>
        } else {
            console.log("restaurant não achado")
            return notFound()
        }
    }

    return notFound()
}