import { UserAuth } from '../../../../globals/context/AuthContext';
import './Acount.scss'
import { useEffect, useState } from 'react';
import MediaEntryForm from '../MediaEntryForm/MediaEntryForm';
import MediaTable from '../MediaTable/MediaTable';
import { Media } from '../models/Media';

function Account(){

    const {user}: any = UserAuth();

    const [showMediaEntryForm, setshowMediaEntryForm] = useState(false)
    const [mediaList, setMediaList] = useState<Media[]>([])
    const [renderer, setRenderer] = useState(false)

    useEffect(() => {
        fetchMediaData()
    }, [renderer, user])

    function displayForm(){
        setshowMediaEntryForm(true)
    }

    function hideMediaEntryForm(){
        setshowMediaEntryForm(false)
    }

    function fetchMediaData(){
            const uid = user?.uid
            // The user needs to be loaded before we can fetch media data
            if (uid){
                fetch(`http://localhost:8081/media/${uid}`)
                .then((res)=> res.json())
                .then((data) => setMediaList(data))
                .catch((error) => console.log(error))
            }
    }

    async function saveMediaEntry(mediaEntry: Media){
        // Add the uid to the media entry
        mediaEntry.uid = user?.uid
        await fetch("http://localhost:8081/media", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mediaEntry)
        }).catch((error) => console.log(error))
        // TODO: This is not ideal to force an update this way
        // Issue is if the mediaList is a dependnecy of useEffect it causes an infinite loop
        setRenderer(!renderer)
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