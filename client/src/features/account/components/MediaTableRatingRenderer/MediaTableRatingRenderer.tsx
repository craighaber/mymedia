import { Rating, useMediaQuery } from '@mui/material'
import './MediaTableRatingRenderer.scss'
export default function MediaTableRatingRenderer(params: any){

    const isSmallScreen = useMediaQuery('(max-width: 500px)')

    const ratingSize = isSmallScreen ? 'medium' : 'large'; 

    return (
        <div className="rating-container">
            {params?.data?.rating && <Rating name="rating" className="star-rating--readonly" precision={0.25} size={ratingSize} value={params?.data?.rating} readOnly /> }  
        </div>
           
    )
}