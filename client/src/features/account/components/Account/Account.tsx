import { UserAuth } from '../../../../globals/context/AuthContext';
import './Acount.scss'
import { useEffect, useState } from 'react';
import MediaEntryForm from '../MediaEntryForm/MediaEntryForm';
import MediaTable from '../MediaTable/MediaTable';
import { Media } from '../models/Media';
import { GENERIC_ERROR_MESSAGE } from '../../../../globals/constants/strings';
import { Snackbar } from '@mui/material';
import { SHOW_SNACKBAR_EVENT, ShowSnackBarEvent } from '../../../../globals/constants/events';

function Account(){

    const {user}: any = UserAuth();

    const [showMediaEntryForm, setshowMediaEntryForm] = useState(false)
    const [mediaList, setMediaList] = useState<Media[]>([])
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackBarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        fetchMediaData()
    }, [user])

    useEffect(() => {
        document.addEventListener(SHOW_SNACKBAR_EVENT, showSnackbarWithMessage)
        return () => {document.removeEventListener(SHOW_SNACKBAR_EVENT, showSnackbarWithMessage)}
    })

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
                fetch(`${import.meta.env.VITE_API_BASE_URL}/media/${userId}`)
                .then((res)=> res.json())
                .then((data) => setMediaList(data))
                .catch((error) => console.log(error))
            }
    }

    const showSnackbarWithMessage = (event: Event) => {
        const showSnackBarEvent = event as ShowSnackBarEvent;
        setSnackbarMessage(showSnackBarEvent?.detail?.message)
        setShowSnackbar(true)
    }

    function handleSnackbarClose(){
        setShowSnackbar(false);
    }

    async function saveMediaEntry(mediaEntry: Media){
        // Add the userId to the media entry
        mediaEntry.userId = user?.uid
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/media-entry`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mediaEntry)
        }).then(res => {
            if (res.ok) {
                hideMediaEntryForm() 
                const showSnackbarEvent = new CustomEvent(SHOW_SNACKBAR_EVENT, { detail: {message: 'Saved Media Entry successfully!'}} )
                document.dispatchEvent(showSnackbarEvent)    
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

        <Snackbar className="snackbar" open={showSnackbar} autoHideDuration={3000} message={snackBarMessage} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleSnackbarClose}/>
    </div>
    )
}

export default Account