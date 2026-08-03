import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EquipmentList from './pages/EquipmentList'
import EquipmentForm from './pages/EquipmentForm'
import Users from './pages/Users'
import Monitoring from './pages/Monitoring'

function PrivateRoute({ children, role }) {
    const { user, token } = useAuth()
    if (!token) return <Navigate to='/login' />
    if (role && user?.role !== role) return <Navigate to='/' />
    return <Layout>{children}</Layout>
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={
                        <PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path='/equipment' element={
                        <PrivateRoute><EquipmentList /></PrivateRoute>} />
                    <Route path='/equipment/new' element={
                        <PrivateRoute><EquipmentForm /></PrivateRoute>} />
                    <Route path='/equipment/:id/edit' element={
                        <PrivateRoute><EquipmentForm /></PrivateRoute>} />
                    <Route path='/users' element={
                        <PrivateRoute role='admin'><Users /></PrivateRoute>} />
                    <Route path='/monitoring' element={
                        <PrivateRoute><Monitoring /></PrivateRoute>} />
                </Routes>
            </BrowserRouter>
            <ToastContainer position='top-right' />
        </AuthProvider>
    )
}
