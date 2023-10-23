import './Navbar.scss'

function Navbar(){
    return(
    <>
        <div className="navbar">
            <div className="navbar_title">MyMedia</div>
            <ul className="navbar_links">
                <li>Home</li>
                <li>Discover</li>
                <li>Login</li>
            </ul>
        </div>
    </>)
}

export default Navbar