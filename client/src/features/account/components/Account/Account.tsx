import { UserAuth } from '../../../../globals/context/AuthContext';
import './Acount.scss'
import { useEffect, useState } from 'react';
import MediaEntryForm from '../MediaEntryForm/MediaEntryForm';
import MediaTable from '../MediaTable/MediaTable';
import { Media } from '../models/Media';
import { GENERIC_ERROR_MESSAGE } from '../../../../globals/constants/strings';

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
                fetch(`http://localhost:8081/media/${userId}`)
                .then((res)=> res.json())
                .then((data) => setMediaList(data))
                .catch((error) => console.log(error))
            }
    }

    async function saveMediaEntry(mediaEntry: Media){
        // Add the userId to the media entry
        mediaEntry.userId = user?.uid
        await fetch("http://localhost:8081/media", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mediaEntry)
        }).then(res => {
            if (res.status === 409) {
                throw Error('You already have a media entry with this title. Please choose a different title.')
            } else if (!res.ok) {
                throw Error(GENERIC_ERROR_MESSAGE)
            }
        })
        // Refresh table
        fetchMediaData();
    }

    return (
    <div className="account">
        <div className='table-title'>
            <div className='table-title_text'>ALL MEDIA</div>
        </div>
        
        <div className='add'>
            <button className='add_button' onClick={() => displayForm()}>QUICK ADD</button>
        </div>
        
        {showMediaEntryForm ? <MediaEntryForm saveMediaEntry={saveMediaEntry} hideMediaEntryForm={hideMediaEntryForm}/> : null}

        <MediaTable mediaList={mediaList}/>
    </div>
    )
}

export default Account