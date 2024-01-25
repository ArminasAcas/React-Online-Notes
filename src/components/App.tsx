import '../css/App.css'
import Home from '../pages/HomePage'
import Login from '../pages/LoginPage'
import Register from '../pages/RegisterPage'
import Dashboard from '../pages/DashboardPage'
import Notes from '../pages/NotesPage'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/Dashboard" replace/>}/>
        <Route path="/Dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
        <Route path="/Notes" element={<ProtectedRoute> <Notes/> </ProtectedRoute>}/>
        <Route index path='/Home' element={<PublicRoute> <Home/> </PublicRoute> }/>
        <Route path='/Login' element={<PublicRoute> <Login/> </PublicRoute>}/>
        <Route path='/Register' element={<PublicRoute> <Register/> </PublicRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

