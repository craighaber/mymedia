import { useEffect, useState } from 'react';
import './Home.scss';
import MediaEntryForm from './MediaEntryForm';
import MediaTable from './MediaTable';
import { Media } from './models/Media';


export default function Home(){
    const [showForm, setShowForm] = useState(false)
    const [mediaList, setMediaList] = useState<Media[]>([])
    useEffect(() => {
        fetch("http://localhost:8081/media")
        .then((res)=> res.json())
        .then((data) => setMediaList(data))
        .catch((error) => console.log(error))
    }, [])

    function displayForm(){
        setShowForm(true)
    }

    function saveMediaEntry(mediaEntry: Media){
        setMediaList((currentMediaList: Media[]) => { 
            return [mediaEntry, ...currentMediaList]
        })
    }

    return (
    <div className="home">
        <div className='title'>
            <h3 className='title_text'>Remember your favorite media</h3>
        </div>
        
        <div className='add' onClick={() => displayForm()}>
            <button className='add_button'>QUICK ADD</button>
        </div>
        
        {showForm ? <MediaEntryForm saveMediaEntry={saveMediaEntry}/> : null}

        <MediaTable mediaList={mediaList}/>
    </div>
    )
}
