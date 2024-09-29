import { Rating, useMediaQuery } from '@mui/material'
import './MediaTableRatingRenderer.scss'
export default function MediaTableRatingRenderer(params: any){

    const isSmallScreen = useMediaQuery('(max-width: 500px)')

    const ratingSize = isSmallScreen ? 'medium' : 'large'; 

    let rating = params?.data?.rating;
    if (rating && rating > 10) rating = rating / 2;
    // Making rating backwards compatible with 10-scale

    return (
        <div className="rating-container">
            {rating && <Rating name="rating" className="star-rating--readonly" precision={0.25} size={ratingSize} value={rating} readOnly /> }  
        </div>
           
    )
}