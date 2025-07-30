import db from "@/src/db/db"
import { cache } from "@/src/lib/cache"
import { notFound } from "next/navigation"

interface Props {
    params: {
        id: string
    }
}

export default async function RestaurantProductsPage({ params }: Props) {

    const restaurant = await db.restaurant.findFirst({
        where: {
            ownerId: params.id
        }
    })

    if (restaurant) {
        const products = await db.product.findMany()

        if (products.length > 0) {
            return (
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">
                        Produtos do restaurante: {restaurant.name}
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-lg p-4 shadow hover:shadow-md transition">
                                <img
                                    src={product.imagePath}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded"
                                />
                                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="mt-2 text-green-600 font-bold">
                                    R$ {(product.priceInCents / 100).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        } else {
            return <p> Esse restaurante não tem nenhum produto </p>
        }



    } else {
        return <p>restaurant não encontrado :p</p>
    }





}