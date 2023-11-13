import { useState } from 'react';
import './Home.scss';
import MediaEntryForm from './MediaEntryForm';
import MediaTable from './MediaTable';
import { Media } from './models/Media';

const initialMediaList: Media[] = [
    {'title': 'Adventure Time', 'category': 'TV Show', 'rating': 9.5, 'review': 'Incredibly creative world and characters with literally the perfect art style. Hilarious, meaningful, and makes you appreaciate the wonders of life.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery edition', 'category': 'Book', 'rating': 8, 'review': 'Great tips on becoming a better programmer. Invented the DRY principle. Interesting section about why inheritance is not needed.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery edition', 'category': 'Book', 'rating': 8, 'review': 'Great tips on becoming a better programmer. Invented the DRY principle. Interesting section about why inheritance is not needed.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery edition', 'category': 'Book', 'rating': 8, 'review': 'Great tips on becoming a better programmer. Invented the DRY principle. Interesting section about why inheritance is not needed.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery edition', 'category': 'Book', 'rating': 8, 'review': 'Great tips on becoming a better programmer. Invented the DRY principle. Interesting section about why inheritance is not needed.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery edition', 'category': 'Book', 'rating': 8, 'review': 'Great tips on becoming a better programmer. Invented the DRY principle. Interesting section about why inheritance is not needed.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery edition', 'category': 'Book', 'rating': 8, 'review': 'Great tips on becoming a better programmer. Invented the DRY principle. Interesting section about why inheritance is not needed.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery edition', 'category': 'Book', 'rating': 8, 'review': 'Great tips on becoming a better programmer. Invented the DRY principle. Interesting section about why inheritance is not needed.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery edition', 'category': 'Book', 'rating': 8, 'review': 'Great tips on becoming a better programmer. Invented the DRY principle. Interesting section about why inheritance is not needed.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery edition', 'category': 'Book', 'rating': 8, 'review': 'Great tips on becoming a better programmer. Invented the DRY principle. Interesting section about why inheritance is not needed.'},
]

export default function Home(){
    const [showForm, setShowForm] = useState(false)
    const [mediaList, setMediaList] = useState<Media[]>(initialMediaList)

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
        
        {/* <div className='category'>
            <h3 className='category_text'>Select a category</h3>
        </div> */}

        <div className='add' onClick={() => displayForm()}>
            <button className='add_button'>QUICK ADD</button>
        </div>
        
        {showForm ? <MediaEntryForm saveMediaEntry={saveMediaEntry}/> : null}

        <MediaTable mediaList={mediaList}/>
    </div>
    )
}
