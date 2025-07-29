import db from "@/src/db/db"
import { notFound } from "next/navigation"

import "./style.css";
import "./style_header.css";
import "./style_main.css";
import "./style_pratos_sugeridos.css";
import PratoSugerido from "../../components/pratoSugerido";
import Banner from "../../components/banner";
import DefaultHeader from "../../components/defaultHeader";

export default async function UserPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const user = await db.user.findUnique({ where: { id } })
    if (user == null) return notFound()

    const restaurantId = user.restaurantId

    if (restaurantId) {
        const restaurant = await db.restaurant.findUnique({
            where: { id: restaurantId }

        })
        if (restaurant) {
            return <>
            <DefaultHeader />

            <main>
                <Banner
                    imagem="/imagens/imagem-placeholder.png"
                    nome="nome do restaurante"
                    email="carlinhos.gustavo@gmail.com"
                    cnpj="66666-666"
                    localizacao="Av. Beira Mar 666"
                    telefone="(85)96666-6666"
                >
                </Banner>

                <div className="container-pratos-sugeridos">
                    <div className="texto-pratos-sugeridos">Pratos sugeridos</div>
                    <div className="secao-pratos-sugeridos">
                        <PratoSugerido name="Cuscuz" ></PratoSugerido>
                        <PratoSugerido name="rabanda ao molho de feijao com arroz e whey da growth"></PratoSugerido>
                        <PratoSugerido></PratoSugerido>
                        <PratoSugerido></PratoSugerido>
                        <PratoSugerido></PratoSugerido>
                    </div>
                </div>
            </main>
        </>
        } else {
            console.log("restaurant não achado")
            return notFound()
        }
    }

    return notFound()
}