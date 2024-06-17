import './Navbar.scss'
import { UserAuth } from '../../../../globals/context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import RoutePaths from '../../../../globals/constants/RoutePaths'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

function Navbar(){
    const {user, logout}: any = UserAuth()
    const navigate = useNavigate()
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // Ensure hidebar hidden on page change
    useEffect(()=> {
        hideSidebar()
    }, [location]) 

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

    const showSidebar = () => {
        if (sidebarRef.current){
            sidebarRef.current.style.display = 'flex';
            setIsSidebarOpen(true);
        }
        
    }

    const hideSidebar = () => {
        if (sidebarRef.current){
            sidebarRef.current.style.display = 'none';
            setIsSidebarOpen(false);
        }
    }

    return(
        <div className="navbar">
            <div className="navbar_logo_wrapper">
                <img src="src/assets/logo.png" alt="logo" className="navbar_logo"/>
                <div className="navbar_title">MYMEDIA</div>
            </div>

            <ul className="navbar_links">
                <li className="hide-on-mobile">{user?.uid ? <button className="navbar_logout" onClick={handleLogout}>Logout</button>: <button className="navbar_login" onClick={handleLogin}>Login</button>}</li>
                {!user?.uid && <li className="hide-on-mobile"><button className="navbar_get-started" onClick={handleSignUp}>Sign Up</button></li>}
                { isSidebarOpen ? <FontAwesomeIcon className="navbar_icon navbar_x-icon" onClick={hideSidebar} icon={faX}/> : <FontAwesomeIcon className="navbar_icon navbar_menu-icon" onClick={showSidebar} icon={faBars}/> }
            </ul>

            <div className="sidebar" ref={sidebarRef}>
                <li onClick={user?.uid ? handleLogout : handleLogin}>{user?.uid ? <span>Logout</span>: <span>Login</span>}</li>
                {!user?.uid && <li onClick={handleSignUp}><span>Sign Up</span></li>}
            </div>
        </div>
    )
}

export default Navbar