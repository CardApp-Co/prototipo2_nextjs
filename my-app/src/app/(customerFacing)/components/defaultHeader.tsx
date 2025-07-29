
export default function DefaultHeader() {
    return (
        <>
            <header>
                <div className="divLogo">
                    <img className="logo" src="/imagens/cardapp-logo-nome.png" alt="cardapp-logo-nome" />
                </div>

                <div className="new-navbar">
                    <a href="/HomePage">LOJA</a>
                    <a href="/Pratos">PRATOS</a>
                    <a href="/Financeiro">FINANCEIRO</a>
                    <a href="/Perfil">PERFIL</a>
                </div>
            </header>
        </>
    );
}

export function ClientHeader(){
    return(
        <>
            <header>
                <div className="divLogo">
                    <img className="logo" src="/imagens/cardapp-logo-nome.png" alt="cardapp-logo-nome" />
                </div>

                <div className="new-navbar">
                    <a href="/Cliente/HomePage">LOJA</a>
                    <a href="/Cliente/Pratos">PRATOS</a>
                    <a href="/Cliente/Comanda">COMANDA</a>
                </div>
            </header>
        </>
    );
}