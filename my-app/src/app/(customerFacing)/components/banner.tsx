export default function Banner(props) {
    return (
        <>
            <div className="container">
                <img src={props.imagem}></img>
                <div className="container-info">
                    <h1>INFORMAÇÕES</h1>
                    <h2>{props.nome}</h2>
                    <h2>{props.email}</h2>
                    <h2>{props.cnpj}</h2>
                    <h2>{props.localizacao}</h2>
                    <h2>{props.telefone}</h2>
                </div>
            </div>
        </>
    );
}