import './Modal.scss'

export default function Modal({message, actionButtonLabel, actionFunction, closeFunction}: {message: string, actionButtonLabel: string, actionFunction: Function, closeFunction: Function}){
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal_message">{message}</div>
                <div className="modal_buttons">
                    <button onClick={()=> closeFunction()}>CLOSE</button>
                    <button onClick={()=> actionFunction()}>{actionButtonLabel}</button>
                </div>
            </div>
        </div>

    )
}