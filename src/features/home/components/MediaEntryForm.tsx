import { useState } from 'react'
import './MediaEntryForm.scss'
import { Media } from './models/Media'


export default function MediaEntryForm({saveMediaEntry}: {saveMediaEntry:any}){
    const categories = ["Book", "Movie", "TV Show", "Song", "Category"]
    const intialMedia: Media = {
        title: '',
        category: ''
    }
 
    const [curFormData, setCurFormData] = useState(intialMedia)

    function handleFormChange(e: any){
        const {name, value} = e.target
        console.log(curFormData)
        setCurFormData({
            ...curFormData,
            [name]: value
        })
    }

    function submitForm(e: any){
        e.preventDefault()
        saveMediaEntry(curFormData)
    }


    return (
        <div className="entry-container">
            <form className="entry-form">
                <div className="entry-grid">
                    <div className="entry-grid_row one">
                        <label htmlFor="title">Title</label>
                        <input id="title" name="title" value={curFormData.title}  onChange={handleFormChange}/>
                    </div>
                    <div className="entry-grid_row two">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" value={curFormData.category}  onChange={handleFormChange}>
                            {categories.map(category => {
                                return <option key={category} value={category}>{category}</option>
                            })}
                        </select>
                    </div>
                    <div className='entry-grid_row three'>
                        <label htmlFor="rating">Rating</label>
                        <input type="number" id="ranting" name="rating" value={curFormData.rating} onChange={handleFormChange}></input>
                    </div>
                    <textarea className= "four" placeholder='Add a review...' name="review" value={curFormData.review}  onChange={handleFormChange}></textarea>
                    <button className="five" onClick={(e)=> submitForm(e)}>Save</button>
    
                </div>
            </form>
        </div>
    )
 }
