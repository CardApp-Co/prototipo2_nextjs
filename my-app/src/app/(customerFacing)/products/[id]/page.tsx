import DefaultHeader from "../../components/defaultHeader";
import { Prato } from "./purchase/_components/CheckoutForm";
import db from "@/src/db/db";

import './styles/style.css'
import './styles/default_style.css'
import './styles/style_header.css'

type TelaPratoProps = {
    params: { id: string }
}

export default async function TelaPrato({ params }: TelaPratoProps) {
    const product = await db.product.findUnique({
        where: { id: params.id }
    });
    // Aqui você deve obter o clientSecret de acordo com sua lógica de pagamento
    const clientSecret = "SUA_LOGICA_AQUI";
    if (!product) return <div>Produto não encontrado</div>;
    return (
        <>
            <DefaultHeader />
            <main>
                <Prato product={product} clientSecret={clientSecret} />
            </main>
        </>
    );
}