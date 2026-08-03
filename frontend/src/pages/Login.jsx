import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await login(email, password)
            navigate('/')
        } catch (err) {
            setError('Email ou mot de passe incorrect')
        }
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: '#0f3460'
        }}>
            <div style={{
                background: 'white', padding: '40px',
                borderRadius: '8px', width: '360px'
            }}>
                <h1 style={{ color: '#0f3460', marginBottom: '24px', textAlign: 'center' }}>
                    PlatformOps
                </h1>
                {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input
                        type='email' placeholder='Email' value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                        required
                    />
                    <input
                        type='password' placeholder='Mot de passe' value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                        required
                    />
                    <button type='submit' style={{
                        background: '#e94560', color: 'white', border: 'none',
                        padding: '12px', borderRadius: '4px', cursor: 'pointer',
                        fontSize: '16px'
                    }}>
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    )
}
