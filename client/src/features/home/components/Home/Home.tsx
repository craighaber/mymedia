import { useNavigate } from 'react-router-dom';
import './Home.scss';
import RoutePaths from '../../../../globals/constants/RoutePaths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUpRightFromSquare, faCheck } from '@fortawesome/free-solid-svg-icons'
import { UserAuth } from '../../../../globals/context/AuthContext';
import { useEffect } from 'react';
import { USER_HAS_LOGGED_IN_BEFORE } from '../../../../globals/constants/localStorage';
import HomeSlider from '../HomeSlider/HomeSlider';
import useNavigateLoginOrSignUp from '../../../../globals/hooks/useNavigateLoginOrSignUp';


export default function Home(){
    const navigate = useNavigate()
    const navigateLoginOrSignUp = useNavigateLoginOrSignUp()
    const { user }: any = UserAuth()

    useEffect(() => {
        if(user){
            navigate(RoutePaths.Account)
        }
    }, [user])

    const handleLearnMore = () => {
        try {
            navigate(RoutePaths.About)
        } catch (error){
            console.log(error)
        }
    }

    return (
    <div className="home">
        <div className='title'>
            <h3 className='title_text'>Your personal media journal</h3>
        </div>

        <div className='subtitles'>
            <ul>
                <li><FontAwesomeIcon icon={faCheck} className='check'/> Never forget your favorite stories</li>
                <li><FontAwesomeIcon icon={faCheck} className='check'/> Track TV, movies, books, & more</li>
                <li><FontAwesomeIcon icon={faCheck} className='check'/> Completely free</li>
            </ul>
 
        </div>
        
        <div className='buttons'>
            <button className='buttons_get-started' onClick={navigateLoginOrSignUp}>Start for free<FontAwesomeIcon icon={faArrowRight} className='arrow'/></button>
            <button className="buttons_learn-more" onClick={handleLearnMore}>Learn More</button>
        
        </div>

        <HomeSlider/>
        
    </div>
    )
}
