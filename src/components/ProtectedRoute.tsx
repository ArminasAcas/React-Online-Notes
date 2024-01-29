import {Navigate} from "react-router-dom"
import { verifyToken } from "../utils/auth"
import { ReactNode } from "react";
import { tokenUtils } from "../utils/token";

interface ProtectedRouteProps {
    children: ReactNode;
  }
  
export default function ProtectedRoute( {children} : ProtectedRouteProps ) {
    const userToken = tokenUtils.getToken();
  const isAuthenticated = userToken ? verifyToken(userToken) : false;
  console.log(isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/Home" replace/>
}