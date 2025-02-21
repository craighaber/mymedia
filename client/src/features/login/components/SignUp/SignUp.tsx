import { useEffect, useState } from 'react';
import RoutePaths from '../../../../globals/constants/RoutePaths'
import { UserAuth } from '../../../../globals/context/AuthContext'
import './SignUp.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button';
import { AuthErrorCodes } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { USER_HAS_LOGGED_IN_BEFORE } from '../../../../globals/constants/localStorage';

function SignUp(){

    const {user, googleLogin, createEmailPasswordUser}: any = UserAuth();
    const navigate = useNavigate();
    useEffect( () => {
        // Redirect to the account page when the user is logged in or comples login
        if (user != null){
            localStorage.setItem(USER_HAS_LOGGED_IN_BEFORE, JSON.stringify(true))
            navigate(RoutePaths.Account)
        }
    }, [user])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')



    const handleSignUp = async () => {

        // Reset errors
        setErrorEmail('')
        setErrorPassword('')
        setError('')

        const invalidEmailMessage = "Please enter a valid email address."
        const invalidPasswordMessage = "Please enter a password with 6 or more characters."
        const defaultErrorMessage = "An unexpected error occured. Please try to Sign up with Google or try again later."

        const emailRe = /^\S+@\S+\.\S+$/

        // Check on client side with basic validation first.
        if (!email || !emailRe.test(email)){
            setErrorEmail(invalidEmailMessage)
        }
        if (password.length < 6){
            setErrorPassword(invalidPasswordMessage)
        }

        if (errorEmail || errorPassword){
            return
        }

        try {
            await createEmailPasswordUser(email, password).then(() => {
                // Redirect to account page (sometimes the useEffect above does not trigger)
                localStorage.setItem(USER_HAS_LOGGED_IN_BEFORE, JSON.stringify(true))
                navigate(RoutePaths.Account)         
            })
        } catch (error) {
            if (error instanceof FirebaseError ){
                switch (error.code) {
                    case ('auth/missing-email'): { //This one isn't a code
                        setErrorEmail(invalidEmailMessage)
                        break;
                    }
                    case (AuthErrorCodes.EMAIL_EXISTS): {
                        setErrorEmail("An account with that email already exists. This includes Google accounts.")
                        break;
                    } 
                    case (AuthErrorCodes.INVALID_EMAIL): {
                        setErrorEmail(invalidEmailMessage)
                        break;
                    }
                    case ('auth/missing-password'): { //This one isn't a code
                        setErrorPassword(invalidPasswordMessage)
                        break;
                    }
                    case (AuthErrorCodes.WEAK_PASSWORD): {
                        setErrorPassword(invalidPasswordMessage)
                        break;
                    }
                    default: {
                        setError(defaultErrorMessage)
                    }
                }
                
            } else {
                setError(defaultErrorMessage)
            }
          
            console.log(error)
        }
    }

    return (
        <div className="signup signin-container">
            <div className="signup_inner signin-container_inner">

                <div className="title">
                    <h4 className="title_text">Create your free account</h4> 
                    <h5 className="title_subtext"><i>It takes just 10 seconds!</i></h5>
                </div>

                <div className="google">
                    <GoogleButton className="google-button" onClick={googleLogin} label="Sign up with Google"/>
                </div>

                <div className="or">
                    <div className="or_line"></div>
                    <div className='or_text'>Or</div>
                    <div className="or_line"></div>
                </div>

                <div className="form">
                    <form>
                        <div className="form_field">
                            <label htmlFor="signup-email">Email</label>
                            <input type="email" id="signup-email" onChange={(e) => setEmail(e?.target?.value)} className={errorEmail ? 'error-border': undefined}></input>
                            <span className="error-text">{errorEmail}</span>
            
                        </div>
                        <div className="form_field">
                            <label htmlFor="signup-password">Password</label>
                            <input type="password" id="signup-password" onChange={(e) => setPassword(e.target.value)}  className={errorPassword ? 'error-border': undefined}></input>
                            <span className="error-text">{errorPassword}</span>
                        </div>        
                    </form>
                </div>

                <div className="error">
                    {error}
                </div>
                
                <div className="button-container">
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