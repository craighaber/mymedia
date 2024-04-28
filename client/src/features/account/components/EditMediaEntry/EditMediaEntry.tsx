import { useEffect, useState } from "react";
import './EditMediaEntry.scss'
import { Route, useNavigate, useParams } from "react-router-dom"
import { API_BASE_URL } from "../../../../globals/constants/urls";
import { Media } from "../models/Media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoutePaths from "../../../../globals/constants/RoutePaths";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function EditMediaEntry(){

    const {id} = useParams();
    const [mediaEntry, setMediaEntry] = useState<Media | null>(null)
    
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

    function deleteEntry(){
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
            <div className="icons">
                <FontAwesomeIcon className="icon" icon={faArrowLeft} onClick={() => backToAccount()}></FontAwesomeIcon>
                <FontAwesomeIcon className="icon" icon={faTrash} onClick={() => deleteEntry()}></FontAwesomeIcon>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td><input value={mediaEntry?.title}></input></td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td><input value={mediaEntry?.category}></input></td>
                    </tr>
                    <tr>
                        <td>Rating</td>
                        <td><input value={mediaEntry?.rating}></input></td>
                    </tr>
                    <tr>
                        <td>Review</td>
                        <td><input value={mediaEntry?.review}></input></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}