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

    const handeGoogleLogin = async () => {
        try {
            await googleLogIn()
        } catch (error){
            console.log(error)
        }
    }

    return( 
    <> 
        <p>Login page</p>
        <GoogleButton onClick={handeGoogleLogin} />
    </>)
}

export default Login