import { useEffect, useState } from "react";
import './EditMediaEntry.scss'
import { Route, useNavigate, useParams } from "react-router-dom"
import { API_BASE_URL } from "../../../../globals/constants/urls";
import { Media } from "../models/Media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoutePaths from "../../../../globals/constants/RoutePaths";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import DecisionModal from "../../../global/modal/DecisionModal";

export default function EditMediaEntry(){

    const {id} = useParams();
    const [mediaEntry, setMediaEntry] = useState<Media | null>(null)
    const [showDecisionModal, setShowDecisionModal] = useState(false)
    
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${API_BASE_URL}/media-entry/${id}`).then((res) => {
            return res.json()
        }).then(
            (data) => {setMediaEntry(data)}   
        ) 
        .catch((error) => {
            console.log(error)
        })
    })

    function backToAccount(){
        navigate(RoutePaths.Account)
    } 

    function showDeleteDecisionModal(){
        setShowDecisionModal(true);
    }

    function hideDeleteDecisionModal(){
        setShowDecisionModal(false);
    }

    const deleteEntry = () => {
        fetch(`${API_BASE_URL}/media-entry/${id}`, {method: 'DELETE'}).
        then((res) => {
            if (res.ok){
                navigate(RoutePaths.Account)
            } else {
                console.log('Failed to delete media entry')
            }
        })
    }

    return (
        <div className="edit-entry">
            {showDecisionModal && 
            <DecisionModal 
                message={`Are you sure you want to delete your entry for '${mediaEntry?.title}'?`}
                actionButtonLabel="Delete"
                actionFunction={deleteEntry}
                closeFunction={hideDeleteDecisionModal}
            />}
            <div className="icons">
                <FontAwesomeIcon className="icon" icon={faArrowLeft} onClick={() => backToAccount()}></FontAwesomeIcon>
                <FontAwesomeIcon className="icon" icon={faTrash} onClick={() => showDeleteDecisionModal()}></FontAwesomeIcon>
            </div>
            <table className="edit-entry_table">
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td><input value={mediaEntry?.title}></input></td>
                    </tr>
                    <tr>
                        <td>Category:</td>
                        <td><input value={mediaEntry?.category}></input></td>
                    </tr>
                    <tr>
                        <td>Rating:</td>
                        <td><input value={mediaEntry?.rating}></input></td>
                    </tr>
                    <tr className="edit-entry_review">
                        <td>Review:</td>
                        <td><textarea value={mediaEntry?.review}></textarea></td>
                    </tr>

                    <tr className="edit-entry-notes">
                        <td>Notes:</td>
                        <td><textarea></textarea></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}