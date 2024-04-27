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

    return(
        <div className="navbar">
            <div className="navbar_title">MYMEDIA</div>
            <ul className="navbar_links">
                {/* <li>HOME</li>
                <li>DISCOVER</li> */}
                <li>{user?.userId ? <button className="navbar_logout" onClick={handleLogout}>LOGOUT</button>: <button className="navbar_login" onClick={handleLogin}>LOGIN</button>}</li>
             
            </ul>
        </div>
    )
}

export default Navbar