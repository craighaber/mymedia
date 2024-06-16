import './Navbar.scss'
import { UserAuth } from '../../../../globals/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import RoutePaths from '../../../../globals/constants/RoutePaths'

function Navbar(){
    const {user, logout}: any = UserAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
           await logout()
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = () => {
        try {
            navigate(RoutePaths.Login)
        } catch (error){
            console.log(error)
        }
    }

    const handleSignUp = () => {
        try {
            navigate(RoutePaths.SignUp)
        } catch (error){
            console.log(error)
        }
    }

    return(
        <div className="navbar">
            <div className="navbar_logo_wrapper">
                <img src="src/assets/logo.png" alt="logo" className="navbar_logo"/>
                <div className="navbar_title">MYMEDIA</div>
            </div>
          
            <ul className="navbar_links">
                <li>{user?.uid ? <button className="navbar_logout" onClick={handleLogout}>Logout</button>: <button className="navbar_login" onClick={handleLogin}>Login</button>}</li>
                {!user?.uid && <li><button className="navbar_get-started" onClick={handleSignUp}>Sign Up</button></li>}
            </ul>
        </div>
    )
}

export default Navbar