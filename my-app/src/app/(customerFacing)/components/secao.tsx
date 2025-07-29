export default function Secao(props) {
    return (
        <>
            <div className="container-secao">
                <div className="container-secao-div-acima">
                    <span>
                        {props.secao_nome}
                    </span>
                </div>
                <div className=" container-secao-pratos">
                    {props.children}
                    <Botao_secao modalId={props.modalId} />
                </div>
            </div >
        </>
    );
}

export function Botao_secao(props) {
    return (
        <button type="button" onClick={() => {
            const modalId = props.modalId
            const modal = document.getElementById(modalId) as HTMLDialogElement | null;
            if (modal && typeof modal.showModal === "function") {
                modal.showModal();
            }
        }}>
            <div className="adicionar-prato">
                <img src="/imagens/add_circle.svg" alt="" />
                <span>Adicionar Prato</span>
            </div>
        </button>
    );
}

export function Cliente_secao(props) {
    return (
        <>
            <div className="container-secao">
                <div className="container-secao-div-acima">
                    <span>
                        {props.secao_nome}
                    </span>
                </div>
                <div className=" container-secao-pratos">
                    {props.children}
                </div>
            </div >
        </>
    );
}