export default function Modal_Pratos(props) {
    return (
        <dialog id={props.modalId}>
            <form className="container-modal">
                <p>Adicionar novo item</p>
                <Modal_Input
                    labelName="Digite o nome do item"
                    placeholder="Feijoada"
                    type="text"
                />
                <Modal_Input
                    labelName="Adicione uma pequena descrição ao item"
                    placeholder="Vegano e sem conservantes"
                    type="text"
                />
                <Modal_Input
                    labelName="Adicione o valor do item"
                    placeholder="9.99"
                    type="number"
                />
                <div className="container-input">
                    <label htmlFor="input-file">
                        Adicione uma foto
                    </label>
                    <div>
                        <input id="input-file" type="file" />
                    </div>
                </div>
                <div className="container-buttons">
                    <button className="close-modal botao-close" data-modal={props.modalId} type="button">Cancelar</button>
                    <button className="botao-submit" type="submit">Adicionar</button>
                </div>
            </form>
        </dialog>
    );
}

export function Modal_Prato(props) {
    return (
        <dialog id={props.modalId}>
            <form className="container-modal">
                <p>Editar</p>
                <Modal_Input
                    labelName="Novo nome"
                    placeholder="Feijoada"
                    type="text"
                />

                <Modal_Input
                    labelName="Novo custo"
                    placeholder="9.99"
                    type="number"
                />

                <Modal_Input
                    labelName="Nova descrição"
                    placeholder="vegano e sem glúten"
                    type="text"
                />

                <div className="container-input">
                    <label htmlFor="input-file">
                        Adicione uma foto
                    </label>
                    <div>
                        <input id="input-file" type="file" />
                    </div>
                </div>

                <div className="container-buttons">
                    <button className="close-modal botao-close" data-modal={props.modalId} type="button">Cancelar</button>
                    <button className="botao-submit" type="submit">Adicionar</button>
                </div>
            </form>
        </dialog>
    );
}

export function Modal_Input(props) {
    return (
        <>
            <div className="container-input">
                <label>{props.labelName}</label>
                <input required type={props.type} placeholder={props.placeholder} />
            </div>
        </>
    );
}