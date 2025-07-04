import { ProductCard, ProductCardSkeleton } from "@/src/components/ProductCard"
import db from "@/src/db/db"
import { cache } from "@/src/lib/cache"
import { Product } from "@prisma/client"
import { Suspense } from "react"

const getMostPopularProduct = cache(() => {
    return db.product.findMany({ where: { isAvailableForPurchase: true }, orderBy: { orders: { _count: "desc" } }, take: 6 })
}, ["/", "getMostPopularProduct"], {revalidate: 60 * 60 * 24})

const getNewestProduct = cache( () => {
    return db.product.findMany({ where: { isAvailableForPurchase: true }, orderBy: { createdAt: "desc" }, take: 6 })
}, ["/", "getNewestProduct"])

function wait(duration: number){{
    return new Promise(resolve => setTimeout(resolve, duration))
}}

export default function HomePage() {
    return <main className="space-y-14">
        <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProduct} />
        <ProductGridSection title="Newest" productsFetcher={getNewestProduct} />
    </main>
}

type ProductGridSectionProps = {
    title: string
    productsFetcher: () => Promise<Product[]>
}

 function ProductGridSection({ productsFetcher, title }: ProductGridSectionProps) {
    return (
        <div className="space-y-8">
            <div className="flex gap-10">
                <h2 className="text-3xl font-bold">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <Suspense fallback={
                <>
                <ProductCardSkeleton/>
                <ProductCardSkeleton/>
                <ProductCardSkeleton/>
                </>
               }>

                <ProductsSuspense productsFetcher={productsFetcher}/>
                
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
        <ProductCard  key={product.id} {...product}/>
    ))
}