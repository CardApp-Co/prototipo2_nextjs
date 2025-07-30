export default function DefaultHeader() {
    return (
        <>
            <header>
                <div className="divLogo">
                    <img className="logo" src="/imagens/cardapp-logo-nome.png" alt="cardapp-logo-nome" />
                </div>

                <div className="new-navbar">
                    <a href="/">LOJA</a>
                    <a href="/products">PRATOS</a>
                    <a href="/order">comanda</a>
                </div>
            </header>
        </>
    );
}