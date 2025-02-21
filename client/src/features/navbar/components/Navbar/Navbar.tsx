import './Navbar.scss'
import { UserAuth } from '../../../../globals/context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import RoutePaths from '../../../../globals/constants/RoutePaths'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { EXPORT_CSV_EVENT } from '../../../../globals/constants/events';
import logoUrl from '../../../../assets/logo.png'

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

    const handleHome = () => {
        try {
            if(user){
                navigate(RoutePaths.Account)
            } else {
                navigate(RoutePaths.Home)
            }
        } catch (error) {
            console.log(error)
        }
    }

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

    const handleAbout = () => {
        try {
            navigate(RoutePaths.About)
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

    const handleExport = () => {
        const exportCsvEvent = new Event(EXPORT_CSV_EVENT);
        document.dispatchEvent(exportCsvEvent);
    }

    return(
        <div className="navbar">
            <div className="navbar_logo_wrapper" onClick={handleHome}>
                <img src={logoUrl} alt="logo" className="navbar_logo"/>
                <div className="navbar_title">MYMEDIA</div>
            </div>

            <ul className="navbar_links">
                { user?.uid && location?.pathname === RoutePaths.Account && <li className="hide-on-mobile"><button className="navbar_login" onClick={handleExport}>Export</button></li>}
                <li className="hide-on-mobile"><button className="navbar_about" onClick={handleAbout}>Learn More</button></li>
                {/* <li className="hide-on-mobile">{user?.uid ? <button className="navbar_logout" onClick={handleLogout}>Logout</button>: <button className="navbar_login" onClick={handleLogin}>Login</button>}</li> */}
                { user?.uid && <li className="hide-on-mobile"><button className="navbar_logout" onClick={handleLogout}>Logout</button></li>}
                {!user?.uid && <li className="hide-on-mobile"><button className="navbar_sign-up" onClick={handleSignUp}>Sign Up</button></li>}
                { isSidebarOpen ? <FontAwesomeIcon className="navbar_icon navbar_x-icon" onClick={hideSidebar} icon={faX}/> : <FontAwesomeIcon className="navbar_icon navbar_menu-icon" onClick={showSidebar} icon={faBars}/> }
            </ul>

            <div className="sidebar" ref={sidebarRef}>
                { user?.uid && location?.pathname === RoutePaths.Account && <li onClick={handleExport}><span>Export</span></li> }
                <li onClick={handleAbout}><span>Learn More</span></li>
                {/* <li onClick={ user?.uid ? handleLogout : handleLogin}>{user?.uid ? <span>Logout</span>: <span>Login</span> }</li> */}
                { user?.uid && <li onClick={handleLogout}><span>Logout</span></li> }
                { !user?.uid && <li onClick={handleSignUp}><span>Sign Up</span></li> }
            </div>
        </div>
    )
}

export default Navbar