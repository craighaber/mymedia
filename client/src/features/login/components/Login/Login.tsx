import GoogleButton from 'react-google-button'
import './Login.scss'
import { UserAuth } from '../../../../globals/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import RoutePaths from '../../../../globals/constants/RoutePaths'
import { useEffect } from 'react'

function Login(){

    const {googleLogIn, user}: any = UserAuth()
    const navigate = useNavigate()
    useEffect( () => {
        // Redirect to the account page when the user is logged in or comples login
        if (user != null){
            navigate(RoutePaths.Account)
        }
    }, [user])



    return( 
    <>  
        <div className="login">
            <div className="title">
                <h3 className="title_text">Login</h3>
            </div>
            <div className="googleButton">
                <GoogleButton onClick={googleLogIn} label="Login with Google"/>
            </div>

        </div>

    </>)
}

export default Login