import {Navigate} from "react-router-dom"
import { verifyToken } from "../utils/auth"
import { ReactNode } from "react";

interface PublicRouteProps {
    children: ReactNode;
  }
  
export default function PublicRoute( {children} : PublicRouteProps ) {
  const userToken = localStorage.getItem("userToken");
  const isAuthenticated = userToken ? verifyToken(userToken) : false;
  
  return isAuthenticated ? <Navigate to="/Dashboard" replace/> : children 
}