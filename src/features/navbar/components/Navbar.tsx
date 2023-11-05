import './Navbar.scss'

function Navbar(){
    return(
    <>
        <div className="navbar">
            <div className="navbar_title">MYMEDIA</div>
            <ul className="navbar_links">
                <li>HOME</li>
                <li>DISCOVER</li>
                <li>LOGIN</li>
            </ul>
        </div>
    </>)
}

export default Navbar