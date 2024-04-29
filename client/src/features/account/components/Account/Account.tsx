import { UserAuth } from '../../../../globals/context/AuthContext';
import './Acount.scss'
import { useEffect, useState } from 'react';
import MediaEntryForm from '../MediaEntryForm/MediaEntryForm';
import MediaTable from '../MediaTable/MediaTable';
import { Media } from '../models/Media';
import { GENERIC_ERROR_MESSAGE } from '../../../../globals/constants/strings';
import { API_BASE_URL } from '../../../../globals/constants/urls';

function Account(){

    const {user}: any = UserAuth();

    const [showMediaEntryForm, setshowMediaEntryForm] = useState(false)
    const [mediaList, setMediaList] = useState<Media[]>([])

    useEffect(() => {
        fetchMediaData()
    }, [user])

    function displayForm(){
        setshowMediaEntryForm(true)
    }

    function hideMediaEntryForm(){
        setshowMediaEntryForm(false)
    }

    function fetchMediaData(){
            const userId = user?.uid
            // The user needs to be loaded before we can fetch media data
            if (userId){
                fetch(`${API_BASE_URL}/media/${userId}`)
                .then((res)=> res.json())
                .then((data) => setMediaList(data))
                .catch((error) => console.log(error))
            }
    }

    async function saveMediaEntry(mediaEntry: Media){
        // Add the userId to the media entry
        mediaEntry.userId = user?.uid
        await fetch(`${API_BASE_URL}/media`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mediaEntry)
        }).then(res => {
            if (res.ok) {
                hideMediaEntryForm()           
            } else {
                throw Error(GENERIC_ERROR_MESSAGE)
            }
        })
        // Refresh table
        fetchMediaData();
    }

    return (
    <div className="account">
        <div className='above-table-container'>
            <div className='table-title'>
                <div className='table-title_text'>ALL MEDIA</div>
            </div>
            
            <div className='add'>
                <button className='add_button' onClick={() => displayForm()}>QUICK ADD</button>
            </div>
        </div>
   
        {showMediaEntryForm ? <MediaEntryForm saveMediaEntry={saveMediaEntry} hideMediaEntryForm={hideMediaEntryForm}/> : null}

        <MediaTable mediaList={mediaList}/>
    </div>
    )
}

export default Account