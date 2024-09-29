import { useEffect, useState } from 'react'
import './MediaEntryForm.scss'
import { Media } from '../models/Media'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { GENERIC_ERROR_MESSAGE } from '../../../../globals/constants/strings'
import { Box, ClickAwayListener, Popper, Rating } from '@mui/material'


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
    const [ratingInfoAnchorEl, setRatingInfoAnchorEl] = useState<null | HTMLElement>(null)
    const [reviewInfoAnchorEl, setReviewInfoAnchorEl] = useState<null | HTMLElement>(null)

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

    function ratingInfoClicked(event: any){
        setRatingInfoAnchorEl( ratingInfoAnchorEl ? null : event?.currentTarget)
    } 

    function reviewInfoClicked(event: any){
        setReviewInfoAnchorEl( reviewInfoAnchorEl ? null : event?.currentTarget)
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
                            <select id="category" name="category" value={curFormData.category} className= {`${missingCategory ? 'error-border': ''} choose-category`}  onChange={handleFormChange}>
                                <option disabled value="">Choose a category</option>
                                {categories.map(category => {
                                    return <option key={category} value={category}>{category}</option>
                                })}
                            </select>
                            {missingCategory && <div className="required-text">Please provide a category</div>}
                        </div>
                        <div className='entry-grid_row entry-grid_area-rating'>
                            <div className="entry-grid_label-with-icon">
                                <label htmlFor="rating">Personal Rating</label> <FontAwesomeIcon className="info icon" icon={faCircleInfo} onClick={ratingInfoClicked}/>
                                <Popper className="info-popper" open={!!ratingInfoAnchorEl }  anchorEl={ratingInfoAnchorEl}  disablePortal={true} >
                                    <ClickAwayListener onClickAway={ratingInfoClicked}>
                                        <Box className="info-content-container" >
                                                <div className="info-content">An optional personal rating of how you perceive this media. 5/5 stars is the best! </div>
                                        </Box>
                                    </ClickAwayListener>
                                </Popper>
                            </div>
                            {/* <input type="number" id="rating" name="rating" value={curFormData.rating ? +curFormData.rating : '' } onChange={handleFormChange}></input>  */}
                            <Rating id="rating" name="rating" className="star-rating star-rating--editable" precision={0.25} size="large" value={curFormData.rating ?? 0}  onChange={handleFormChange}/>       
                        </div>
                        <div  className= "entry-grid_area-review">
                            <div className="entry-grid_label-with-icon"> 
                                <label htmlFor="review">My Impressions</label> <FontAwesomeIcon className="info icon" icon={faCircleInfo} onClick={reviewInfoClicked}/>
                                <Popper className="info-popper" open={!!reviewInfoAnchorEl }  anchorEl={reviewInfoAnchorEl}  disablePortal={true} sx={{ zIndex: 1 }} >
                                    <ClickAwayListener onClickAway={reviewInfoClicked}>
                                        <Box className="info-content-container" >
                                                <div className="info-content">This space is for you to reflect on your thoughts and impressions of this media! You can choose to write a review, list bullet points about your favorite parts, or write notes about what you learned. It's your personal journal entry, so make it yours! </div>
                                        </Box>
                                    </ClickAwayListener>
                                </Popper>
                            </div>
                            <textarea id="review" placeholder='Write your journal entry here!' name="review" value={curFormData.review}  onChange={handleFormChange}></textarea>
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
