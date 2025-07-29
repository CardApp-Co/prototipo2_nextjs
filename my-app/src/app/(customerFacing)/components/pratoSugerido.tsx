
export default function PratoSugerido(props) {
    return (
        <>
            <div className="container-prato-sugerido">
                <div className="prato-sugerido-imagem">
                    <img src="/imagens/imagem-placeholder.png" alt="Prato sugerido" />
                </div>
                <p>{props.name}</p>
            </div>
        </>
    );
}