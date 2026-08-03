import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }, [token])

    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password })
        setToken(res.data.token)
        setUser(res.data.user)
        localStorage.setItem('token', res.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        return res.data
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
