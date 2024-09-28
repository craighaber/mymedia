import { useNavigate } from 'react-router-dom';
import './Home.scss';
import RoutePaths from '../../../../globals/constants/RoutePaths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { UserAuth } from '../../../../globals/context/AuthContext';
import { useEffect } from 'react';
import { USER_HAS_LOGGED_IN_BEFORE } from '../../../../globals/constants/localStorage';
import HomeSlider from '../HomeSlider/HomeSlider';

export default function Home(){
    const navigate = useNavigate()
    const { user }: any = UserAuth()

    useEffect(() => {
        if(user){
            navigate(RoutePaths.Account)
        }
    }, [user])

    const handleGetStarted = () => {
        // Navigate to Sign up only if the user has not logged in on the browser or device before
        let path = RoutePaths.SignUp
        const userHasLoggedInBefore: string | null = localStorage.getItem(USER_HAS_LOGGED_IN_BEFORE)
        if (userHasLoggedInBefore && JSON.parse(userHasLoggedInBefore) === true){
            path = RoutePaths.Login
        }
        try{
            navigate(path)
        } catch (error){
            console.log(error)
        }
    }

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
            <h3 className='title_text'>Journal your favorite media</h3>
        </div>

        <div className='subtitles'>
            <ul>
                <li><FontAwesomeIcon icon={faCheck} className='check'/> Rate and review what you love</li>
                <li><FontAwesomeIcon icon={faCheck} className='check'/> Track TV, music, books, & more</li>
                <li><FontAwesomeIcon icon={faCheck} className='check'/> Completely free to use</li>
            </ul>
 
        </div>
        
        <div className='start'>

            <button className="learn_more_button" onClick={handleLearnMore}>LEARN MORE</button>
            <button className='start_button' onClick={handleGetStarted}>GET STARTED</button>
        </div>

        <HomeSlider/>
        
    </div>
    )
}
