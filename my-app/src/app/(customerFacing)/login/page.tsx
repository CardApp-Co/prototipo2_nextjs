import { Metadata } from "next";
import './style.css'

export const metadata: Metadata = {
    title: "Cardapp - Cadastro",
};

export default function LoginPage() {
    return (
        <>
            <div>
                <img id="img-logotipo" src="imagens/logotipo.png" alt="logotipo" />
            </div>
            <form action={"/HomePage"}>
                <input type="email" placeholder="email" required />
                <input type="password" placeholder="Senha" required />
                <input id="login" type="submit" value={"Login"} />
            </form>
        </>
    )
}