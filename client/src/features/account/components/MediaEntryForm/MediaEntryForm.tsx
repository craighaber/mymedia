import { useEffect, useState } from 'react'
import './MediaEntryForm.scss'
import { Media } from '../models/Media'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { GENERIC_ERROR_MESSAGE } from '../../../../globals/constants/strings'


export default function MediaEntryForm({saveMediaEntry, hideMediaEntryForm}: {saveMediaEntry:any, hideMediaEntryForm:Function}){

    const intialMedia: Media = {
        id: '',
        title: '',
        category: ''
    }
    const [categories, setCategories] = useState<string[]>([])
    const [curFormData, setCurFormData] = useState(intialMedia)
    const [missingTitle, setMissingTitle]  = useState(false);
    const [missingCategory, setMissingCategory] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(()=> {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`)
        .then((res)=> {
            return res.json();
        } )
        .then((data) => setCategories(data))
        .catch((error) => {
            setErrorMessage(GENERIC_ERROR_MESSAGE)
            console.log(error)
        })
    }, [])

    function handleFormChange(e: any){
        const {name, value} = e.target
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

        // Reset the error message
        setErrorMessage('')
        
        // Save the form when all required values are set
        if (curFormData.title !== '' && curFormData.category !== ''){
            saveMediaEntry(curFormData).catch((error: any) => setErrorMessage(error.message))
        }
        
    }



    return (
        <div className="modal-backdrop">
            <div className="entry-modal">
                <FontAwesomeIcon className="x icon" icon={faX} onClick={() => hideMediaEntryForm()}/>
                <form className="entry-form">
                    <div className="entry-grid">
                        <div className="entry-grid_row entry-grid_area-title">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" value={curFormData.title} className={missingTitle ? 'error-border': ''}  onChange={handleFormChange}/>
                            { missingTitle && <div className="required-text">Please provide a title</div> }
                        </div>
                        <div className="entry-grid_row entry-grid_area-category">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" value={curFormData.category} className= {missingCategory ? 'error-border': ''}  onChange={handleFormChange}>
                                <option disabled value="">Choose a category</option>
                                {categories.map(category => {
                                    return <option key={category} value={category}>{category}</option>
                                })}
                            </select>
                            {missingCategory && <div className="required-text">Please provide a category</div>}
                        </div>
                        <div className='entry-grid_row entry-grid_area-rating'>
                            <label htmlFor="rating">Personal Rating</label>
                            <input type="number" id="rating" name="rating" value={curFormData.rating ? +curFormData.rating : '' } onChange={handleFormChange}></input>
                        </div>
                        <div  className= "entry-grid_area-review">
                            <label htmlFor="review">My Impressions</label>
                            <textarea id="review" placeholder='Your impressions on the work. This could be anything from a review to key points you would like to remember...' name="review" value={curFormData.review}  onChange={handleFormChange}></textarea>
                        </div>
                       
                        <div className="entry-grid_row entry-grid_area-error">
                            {errorMessage}
                        </div>
                        <div className='entry-grid_row entry-grid_area-save'>
                            <button id="save" onClick={(e)=> submitForm(e)}>Save</button>
                        </div>
                    </div>
                </form>
            </div>   
        </div> 
    )
 }
