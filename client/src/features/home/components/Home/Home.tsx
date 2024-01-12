import { useNavigate } from 'react-router-dom';
import './Home.scss';
import RoutePaths from '../../../../globals/constants/RoutePaths';

export default function Home(){
    const navigate = useNavigate()

    const handleLogin = () => {
        try{
            navigate(RoutePaths.Login)
        } catch (error){
            console.log(error)
        }
    }

    return (
    <div className="home">
        <div className='title'>
            <h3 className='title_text'>Track your favorite media</h3>
        </div>

        <div className='subtitles'>
            <ul>
                <li>With ratings and reviews</li>
                <li>All in one place</li>
                <li>For free</li>
            </ul>
 
        </div>
        
        <div className='start'>
            <button className='start_button' onClick={handleLogin}>GET STARTED</button>
        </div>
        
    </div>
    )
}
