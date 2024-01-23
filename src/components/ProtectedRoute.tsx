import {Navigate} from "react-router-dom"
import { verifyToken } from "../utils/auth"
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
  }
  
export default function ProtectedRoute( {children} : ProtectedRouteProps ) {
    const userToken = localStorage.getItem("userToken");
  const isAuthenticated = userToken ? verifyToken(userToken) : false;
  console.log(isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/Home" replace/>
}