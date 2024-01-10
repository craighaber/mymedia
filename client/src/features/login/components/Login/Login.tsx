import GoogleButton from 'react-google-button'
import './Login.scss'
import { UserAuth } from '../../../../AuthContext'

function Login(){

    const {googleLogIn}: any = UserAuth()

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