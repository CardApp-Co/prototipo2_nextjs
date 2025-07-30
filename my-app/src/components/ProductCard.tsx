import Link from "next/link";
import { formatCurrency } from "../lib/formatters";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";


type ProductCardProps = {
    id: string
    name: string
    priceInCents: number
    description: string
    imagePath: string
}

export function ProductCard({ id, name, priceInCents, description, imagePath }: ProductCardProps) {
    return (
        <>
            <a href={`/products/${id}`}>
                <div className="container-prato">
                    <div className="prato-imagem">
                        <img src={imagePath} alt="prato-imagem" />
                    </div>
                    <p>{name}</p>
                </div>
            </a>


        </>
    );
}



export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden flex flex-col animate-pulse">
            <div className="w-full aspect-video bg-grey-300" />
            <CardHeader>
                <CardTitle>
                    <div className="w-3/4 h-6 rounded-full bg-grey-300" />
                </CardTitle>
                <CardDescription>
                    <div className="w-1/2 h-4 rounded-full bg-grey-300" />
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="w-full h-4 rounded-full bg-grey-300" />
                <div className="w-full h-4 rounded-full bg-grey-300" />
                <div className="w-3/4 h-4 rounded-full bg-grey-300" />
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled size="lg"></Button>
            </CardFooter>
        </Card>
    )
}