import { redirect } from "react-router-dom";
import "../css/NavbarComponent.css"
import { verifyToken } from "../utils/auth"
import { Navigate } from "react-router-dom";

export default function Navbar() {
    const userToken = localStorage.getItem("userToken");
    const isAuthenticated = userToken ? verifyToken(userToken) : false;
    
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        return <Navigate to="/Login" replace/>
    }

    if (!isAuthenticated) return (
        <>
            <ul className="navbar">
                <li className="navbar__element"> <a className="navbar__link" href="Login">Login</a> </li>
                <li className="navbar__element"> <a className="navbar__link" href="Register">Register</a> </li>
                <li className="navbar__element"> <a className="navbar__link" href="Home">Home</a> </li>
            </ul>
        </>
    )

    return (
        <>
            <ul className="navbar">
                <li className="navbar__element"> <a className="navbar__link" href="" onClick={handleLogout}>Logout</a></li>
                <li className="navbar__element"> <a className="navbar__link" href="Dashboard">Dashboard</a></li>
            </ul>
        </>
    )
}