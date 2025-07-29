export function Secao_prato(props) {
    return (
        <>
            {/*colocar rota pra prato*/}
            <a href="Pratos/Prato">
                <div className="container-prato">
                    <div className="prato-imagem">
                        <img src={props.imagem} alt="prato-imagem" />
                    </div>
                    <p>{props.nome}</p>
                </div>
            </a>
        </>
    );
}