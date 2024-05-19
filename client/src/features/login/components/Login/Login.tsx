import GoogleButton from 'react-google-button'
import './Login.scss'
import { UserAuth } from '../../../../globals/context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import RoutePaths from '../../../../globals/constants/RoutePaths'
import { useEffect, useState } from 'react'

function Login(){

    const {emailPasswordLogin, googleLogin, user}: any = UserAuth()
    const navigate = useNavigate()
    useEffect( () => {
        // Redirect to the account page when the user is logged in or comples login
        if (user != null){
            navigate(RoutePaths.Account)
        }
    }, [user])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async () => {
        try {
            await emailPasswordLogin(email, password)
        } catch (error) {
            setError('Invalid email or password')
            console.log(error)
        }
    }

    return( 
    <>  
        <div className="login signin-container">
            <div className="login_inner signin-container_inner">

                <div className="title">
                    <h3 className="title_text">Login</h3>
                </div>

                <div className="google">
                    <GoogleButton onClick={googleLogin} label="Login with Google"/>
                </div>

                <div className="or">
                    <div className="or_line"></div>
                    <div className='or_text'>Or</div>
                    <div className="or_line"></div>
                </div>

                <div className="form">
                    <form>
                        <div className="form_field">
                            <label htmlFor="login-email">Email</label>
                            <input type="email" id="login-email" onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="form_field">
                            <label htmlFor="login-password">Password</label>
                            <input type="password" id="login-password" onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                    </form>
                </div>  

                <div className="error">
                    {error}
                </div>

                <div className="button-container">
                    <button onClick={handleLogin}>Login</button>
                </div>

                <div className="account-already">
                    Are you a new user? <Link to={RoutePaths.SignUp} className='link'>Sign Up</Link>
                </div>
            </div>
        </div>

    </>)
}

export default Login