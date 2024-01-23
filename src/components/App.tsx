import '../css/App.css'
import Home from '../pages/HomePage'
import Login from '../pages/LoginPage'
import Register from '../pages/RegisterPage'
import Dashboard from './Dashboard'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/Dashboard" replace/>}/>
        <Route path="/Dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
        <Route index path='/Home' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

