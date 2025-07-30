import db from "@/src/db/db"
import "./welcomePage.css"

export default function WelcomePage() {


    return (
        <>
            <div className="div-body">
                <div className="col1">
                    <img id="img-logotipo" src="/imagens/logotipo.png" alt="/imagens/logotipo.png"></img>
                    <div>
                        <img id="img-grupo-comida" src="/imagens/grupo-comida.png" alt="/imagens/grupo-comida.png" />
                    </div>
                </div>
                <div className="col2">
                    <h1>INÍCIO</h1>
                    <div className="container-botoes">
                        <a href="/login">
                            <button className="botao">LOGAR</button>
                        </a>
                        <a href="/signup">
                            <button className="botao">CADASTRAR</button>
                        </a>
                    </div>
                    <p className="p-abaixo">Crie seu site</p>
                </div>
            </div>
        </>
    )
}