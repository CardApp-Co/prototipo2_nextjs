import { ProductCard, ProductCardSkeleton } from "@/src/components/ProductCard"
import db from "@/src/db/db"
import { cache } from "@/src/lib/cache"
import { Product } from "@prisma/client"
import { Suspense } from "react"
import DefaultHeader from "../../components/defaultHeader"

import './style.css'
import './default_style.css'
import './style_header.css'

const getMostPopularProduct = cache(() => {
    return db.product.findMany({ where: { isAvailableForPurchase: true }, orderBy: { orders: { _count: "desc" } }, take: 6 })
}, ["/", "getMostPopularProduct"], { revalidate: 60 * 60 * 24 })

const getNewestProduct = cache(() => {
    return db.product.findMany({ where: { isAvailableForPurchase: true }, orderBy: { createdAt: "desc" }, take: 6 })
}, ["/", "getNewestProduct"])

/*
const getAllProducts = cache(() => {
    return db.product.findMany({ where: {isAvailableForPurchase: true}, orderBy: { name: "asc"}})
}, ["/", "getAllProducts"])
*/

function wait(duration: number) {
    {
        return new Promise(resolve => setTimeout(resolve, duration))
    }
}

export default function HomePage() {
    return (
        <main>
            <DefaultHeader />

            <ProductGridSection title="Mais populares" productsFetcher={getMostPopularProduct} />
            <ProductGridSection title="Mais novos" productsFetcher={getNewestProduct} />
        </main>
    );
}

type ProductGridSectionProps = {
    title: string
    productsFetcher: () => Promise<Product[]>
}

export function ProductGridSection({ productsFetcher, title }: ProductGridSectionProps) {
    return (
        <div className="container-secao">
            <div className="container-secao-div-acima">
                <span>{title}</span>
            </div>
            <div className="container-secao-pratos">
                <Suspense fallback={
                    <>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </>
                }>

                    <ProductsSuspense productsFetcher={productsFetcher} />

                </Suspense>

            </div>
        </div>
    )
}

async function ProductsSuspense({
    productsFetcher,
}: {
    productsFetcher: () => Promise<Product[]>
}) {
    return (await productsFetcher()).map(product => (
        <ProductCard key={product.id} {...product} />
    ))
}