import { useEffect, useState } from 'react'
import './MediaEntryForm.scss'
import { Media } from '../models/Media'


export default function MediaEntryForm({saveMediaEntry}: {saveMediaEntry:any}){

    const intialMedia: Media = {
        title: '',
        category: ''
    }
    const [categories, setCategories] = useState<string[]>([])
    const [curFormData, setCurFormData] = useState(intialMedia)
    const [missingTitle, setMissingTitle]  = useState(false);
    const [missingCategory, setMissingCategory] = useState(false);

    useEffect(()=> {
        fetch("http://localhost:8081/categories")
        .then((res)=> res.json())
        .then((data) => setCategories(data))
        .catch((error) => console.log(error))
    }, [])

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
        
        // Show text indicating title and category are required
        if (curFormData.title === '') {
            setMissingTitle(true)
            console.log(missingTitle)
        } else {
            setMissingTitle(false)
        }
        if (curFormData.category === ''){
            setMissingCategory(true)
        }  else {
            setMissingCategory(false)
        }
        
        // Save the form when all required values are set
        if (curFormData.title !== '' && curFormData.category !== ''){
            saveMediaEntry(curFormData)
        }
        
    }


    return (
        <div className="entry-container">
            <form className="entry-form">
                <div className="entry-grid">
                    <div className="entry-grid_row entry-grid_area-title">
                        <label htmlFor="title">Title</label>
                        <input id="title" name="title" value={curFormData.title} className={missingTitle ? 'error-border': undefined}  onChange={handleFormChange}/>
                        { missingTitle && <span className="required-text">Please provide a title</span> }
                    </div>
                    <div className="entry-grid_row entry-grid_area-category">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" value={curFormData.category} className= {missingCategory ? 'error-border': undefined}  onChange={handleFormChange}>
                            <option disabled value="">Choose a category</option>
                            {categories.map(category => {
                                return <option selected key={category} value={category}>{category}</option>
                            })}
                        </select>
                        {missingCategory && <span className="required-text">Please provide a category</span>}
                    </div>
                    <div className='entry-grid_row entry-grid_area-rating'>
                        <label htmlFor="rating">Rating</label>
                        <input type="number" id="rating" name="rating" value={curFormData.rating} onChange={handleFormChange}></input>
                    </div>
                    <textarea className= "entry-grid_area-review" placeholder='Add a review...' name="review" value={curFormData.review}  onChange={handleFormChange}></textarea>
                    <div className='entry-grid_row entry-grid_area-save'>
                        <button id="save" onClick={(e)=> submitForm(e)}>Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
 }
