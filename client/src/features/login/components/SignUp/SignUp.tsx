import { useEffect, useState } from 'react';
import RoutePaths from '../../../../globals/constants/RoutePaths'
import { UserAuth } from '../../../../globals/context/AuthContext'
import './SignUp.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

function SignUp(){

    const {user, googleLogIn, createEmailPasswordUser}: any = UserAuth();
    const navigate = useNavigate();
    useEffect( () => {
        // Redirect to the account page when the user is logged in or comples login
        if (user != null){
            navigate(RoutePaths.Account)
        }
    }, [user])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignUp = async () => {
        try {
            await createEmailPasswordUser(email, password)
        } catch (error) {
            if (error instanceof FirebaseError ){
                if (error.code === AuthErrorCodes.EMAIL_EXISTS){
                    setError("An account with that email already exists. This includes Google accounts.")
                }
            }
            setError("An unexpected error occured. Please try to Sign up with Google or try again later.")
            console.log(error)
        }
    }

    return (
        <div className="signup">
            <div className="signup_inner">
            <div className="title">
                <h4 className="title_text">Create your free account</h4> 
            </div>
            <div className="google">
                <GoogleButton className="google-button" onClick={googleLogIn} label="Sign up with Google"/>
            </div>
            <div className="or">
                <div className="or_line"></div>
                <div className='or_text'>Or</div>
                <div className="or_line"></div>
            </div>
            <div className="form">
                <form>
                    <div className="form_field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={(e) => setEmail(e?.target?.value)}></input>
           
                    </div>
                    <div className="form_field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                
                </form>
            </div>

            <div className="error">
                {error}
            </div>
            
            <div className="signup-button">
                <button onClick={handleSignUp}>Sign Up</button>
            </div>


            <div className="account-already">
                Already have an account? <Link to={RoutePaths.Login} className='link'>Login</Link>
            </div>
            </div>           
        </div>
    )
}

export default SignUp