import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './DecisionModal.scss'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function DecisionModal({message, actionButtonLabel, actionFunction, closeFunction}: {message: string, actionButtonLabel: string, actionFunction: Function, closeFunction: Function}){
    return (
        <div className="modal-backdrop">
            <div className="decision-modal">
            <FontAwesomeIcon className="x icon" icon={faX} onClick={()=> closeFunction()}/>
                <div className="decision-modal_message">{message}</div>
                <div className="decision-modal_buttons">
                    <button onClick={()=> closeFunction()}>Close</button>
                    <button onClick={()=> actionFunction()}>{actionButtonLabel}</button>
                </div>
            </div>
        </div>

    )
}