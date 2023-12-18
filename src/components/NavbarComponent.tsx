import "../css/NavbarComponent.css"

export default function Navbar() {
    return (
        <>
            <ul className="navbar">
                <li className="navbar__element"> <a className="navbar__link" href="Login">Login</a> </li>
                <li className="navbar__element"> <a className="navbar__link" href="Register">Register</a> </li>
                <li className="navbar__element"> <a className="navbar__link" href="Home">Home</a> </li>
            </ul>
        </>
    )
}