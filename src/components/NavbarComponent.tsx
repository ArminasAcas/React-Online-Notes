import "../css/NavbarComponent.css"
import { verifyToken } from "../utils/auth"
import { Navigate } from "react-router-dom";
import { tokenUtils } from "../utils/token";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
          const userToken = tokenUtils.getToken();
       
          if (userToken) {
            const authStatus = await verifyToken(userToken);
            if (authStatus) setIsAuthenticated(authStatus);
            else setIsAuthenticated(false);
          }
          else setIsAuthenticated(false);
        };
    
        checkAuthentication();
      }, []);
    
    const handleLogout = () => {
        tokenUtils.removeToken();
        return <Navigate to="/Login" replace/>
    }

    if (!isAuthenticated) return (
        <ul className="navbar">
            <li className="navbar__element"> <a className="navbar__link" href="Login">Login</a> </li>
            <li className="navbar__element"> <a className="navbar__link" href="Register">Register</a> </li>
            <li className="navbar__element"> <a className="navbar__link" href="Home">Home</a> </li>
        </ul>
    )

    return (
        <>
            <ul className="navbar">
                <li className="navbar__element"> <a className="navbar__link" href="" onClick={handleLogout}>Logout</a></li>
                <li className="navbar__element"> <a className="navbar__link" href="Dashboard">Dashboard</a></li>
                <li className="navbar__element"> <a className="navbar__link" href="Notes">Notes</a></li>
            </ul>
        </>
    )
}