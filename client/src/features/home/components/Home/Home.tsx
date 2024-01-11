import { useEffect, useState } from 'react';
import './Home.scss';
import MediaEntryForm from '../MediaEntryForm/MediaEntryForm';
import MediaTable from '../MediaTable/MediaTable';
import { Media } from '../models/Media';


export default function Home(){
    const [showForm, setShowForm] = useState(false)
    const [mediaList, setMediaList] = useState<Media[]>([])
    const [renderer, setRenderer] = useState(false)

    useEffect(() => {
        fetchMediaData()
    }, [renderer])

    function displayForm(){
        setShowForm(true)
    }

    function fetchMediaData(){
        fetch("http://localhost:8081/media")
        .then((res)=> res.json())
        .then((data) => setMediaList(data))
        .catch((error) => console.log(error))
    }

    async function saveMediaEntry(mediaEntry: Media){
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
    <div className="home">
        <div className='title'>
            <h3 className='title_text'>Remember your favorite media</h3>
        </div>
        
        <div className='add'>
            <button className='add_button' onClick={() => displayForm()}>QUICK ADD</button>
        </div>
        
        {showForm ? <MediaEntryForm saveMediaEntry={saveMediaEntry}/> : null}

        <MediaTable mediaList={mediaList}/>
    </div>
    )
}
