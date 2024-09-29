import { Rating, useMediaQuery } from '@mui/material'
import './MediaTableRatingRenderer.scss'
export default function MediaTableRatingRenderer(params: any){

    const isSmallScreen = useMediaQuery('(max-width: 500px)')

    const ratingSize = isSmallScreen ? 'medium' : 'large'; 

    const rating = params?.data?.rating;
 
    return (
        <div className="rating-container">
            {rating && <Rating name="rating" className="star-rating--readonly" precision={0.25} size={ratingSize} value={rating} readOnly /> }  
        </div>
           
    )
}