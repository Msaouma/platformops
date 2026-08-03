import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ children }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <nav style={{
                width: '220px', background: '#0f3460', color: 'white',
                padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px'
            }}>
                <h2 style={{ color: '#e94560', marginBottom: '20px' }}>PlatformOps</h2>
                <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>📊 Dashboard</Link>
                <Link to='/equipment' style={{ color: 'white', textDecoration: 'none' }}>🖥️ Equipements</Link>
                <Link to='/monitoring' style={{ color: 'white', textDecoration: 'none' }}>📡 Monitoring</Link>
                {user?.role === 'admin' &&
                    <Link to='/users' style={{ color: 'white', textDecoration: 'none' }}>👥 Utilisateurs</Link>
                }
                <div style={{ marginTop: 'auto' }}>
                    <p style={{ fontSize: '12px', color: '#aaa' }}>{user?.name}</p>
                    <button onClick={handleLogout} style={{
                        background: '#e94560', color: 'white', border: 'none',
                        padding: '8px 16px', cursor: 'pointer', borderRadius: '4px'
                    }}>Déconnexion</button>
                </div>
            </nav>
            <main style={{ flex: 1, padding: '30px', background: '#f5f5f5' }}>
                {children}
            </main>
        </div>
    )
}
