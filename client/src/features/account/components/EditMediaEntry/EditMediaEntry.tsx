import { useEffect, useState} from "react";
import './EditMediaEntry.scss'
import { Route, useNavigate, useParams, useLocation } from "react-router-dom"
import { Media } from "../models/Media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoutePaths from "../../../../globals/constants/RoutePaths";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import DecisionModal from "../../../global/modal/DecisionModal";
import { update } from "firebase/database";

export default function EditMediaEntry(){

    const {id} = useParams();
    const [mediaEntry, setMediaEntry] = useState<Media | null>(null)
    const [showDecisionModal, setShowDecisionModal] = useState(false)
    const [categories, setCategories] = useState<string[]>([])
    
    const navigate = useNavigate()

    // Load the media entry from the database on page load
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/media-entry/${id}`).then((res) => {
            return res.json()
        }).then(
            (data) => {setMediaEntry(data)}   
        ) 
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const DEBOUNCE_TIME = 500 

    useEffect(() => {
        // Wait for DEBOUNCE_TIME milliseconds before updating the media entry in the database
        const delayDebounceFn = setTimeout(() => {
          console.log(mediaEntry)
          if (mediaEntry) updateMediaEntry()
        }, DEBOUNCE_TIME)
        
        // The return functon runs each time the effect is triggered due to dependency changes (mediaEntry)
        // This means if the mediaEntry changes before the delay is up, the previous timeout is cleared
        // So the effect is data is saved to the database in DEBOUNCE_TIME milliseconds after the user stops typing
        return () => clearTimeout(delayDebounceFn)
      }, [mediaEntry])

      useEffect(()=> {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`)
        .then((res)=> {
            return res.json();
        } )
        .then((data) => setCategories(data))
        .catch((error) => {
            console.log(error)
        })
    }, [])


    function backToAccount(){
        // Ensure media entry updated
        updateMediaEntry()
        navigate(RoutePaths.Account)
    } 

    function showDeleteDecisionModal(){
        setShowDecisionModal(true);
    }

    function hideDeleteDecisionModal(){
        setShowDecisionModal(false);
    }

    const deleteMediaEntry = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/media-entry/${id}`, {method: 'DELETE'}).
        then((res) => {
            if (res.ok){
                navigate(RoutePaths.Account)
            } else {
                console.log('Failed to delete media entry')
            }
        })
    }

    function updateMediaEntry() {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/media-entry/${mediaEntry?.id}`, 
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(mediaEntry)
        }).catch(error => {
            console.log(error)
        })
    }

  
    const handleEditMediaEntry = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        if (mediaEntry){
            // Update the media entry with the changed field
            setMediaEntry({
                ...mediaEntry,
                [name]: value
            })
        }
    }
        
    return (
        <div className="edit-entry">
            {showDecisionModal && 
            <DecisionModal 
                message={`Are you sure you want to delete your entry for '${mediaEntry?.title}'?`}
                actionButtonLabel="Delete"
                actionFunction={deleteMediaEntry}
                closeFunction={hideDeleteDecisionModal}
            />}
            <div className="icons">
                <FontAwesomeIcon className="icon" icon={faArrowLeft} onClick={() => backToAccount()}></FontAwesomeIcon>
                <FontAwesomeIcon className="icon" icon={faTrash} onClick={() => showDeleteDecisionModal()}></FontAwesomeIcon>
            </div>
            <table className="edit-entry_table">
                <tbody>
                    <tr className="edit-entry_title">
                        <td>Title:</td>
                        <td><input name="title" value={mediaEntry?.title ?? ''} onChange={handleEditMediaEntry}></input></td>
                    </tr>
                    <tr className="edit-entry_category">
                        <td>Category:</td>
                        <td>
                            <select name="category" value={mediaEntry?.category ?? ''} onChange={handleEditMediaEntry}>
                                {categories.map((category) => {
                                    return <option key={category} value={category}>{category}</option>
                                })}
                            </select>
                        </td>
                    </tr>
                    <tr className="edit-entry_rating">
                        <td>Rating:</td>
                        <td><input name="rating" type="number" value={mediaEntry?.rating ? +mediaEntry?.rating : ''} onChange={handleEditMediaEntry}></input></td>
                    </tr>
                    <tr className="edit-entry_review">
                        <td>Review:</td>
                        <td><textarea name="review" value={mediaEntry?.review ?? ''} onChange={handleEditMediaEntry}></textarea></td>
                    </tr>

                    <tr className="edit-entry-notes">
                        <td>Notes:</td>
                        <td><textarea name="notes" value={mediaEntry?.notes ?? ''} onChange={handleEditMediaEntry}></textarea></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}