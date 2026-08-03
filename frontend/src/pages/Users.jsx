import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        api.get('/users').then(r => setUsers(r.data)).catch(() => {})
    }, [])

    return (
        <div>
            <h1 style={{ color: '#0f3460', marginBottom: '24px' }}>Utilisateurs</h1>
            <table style={{ width: '100%', background: 'white', borderRadius: '8px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#0f3460', color: 'white' }}>
                        {['Nom','Email','Rôle','Statut'].map(h =>
                            <th key={h} style={{ padding: '12px', textAlign: 'left' }}>{h}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, i) => (
                        <tr key={u._id} style={{ background: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
                            <td style={{ padding: '12px' }}>{u.name}</td>
                            <td style={{ padding: '12px' }}>{u.email}</td>
                            <td style={{ padding: '12px' }}>{u.role}</td>
                            <td style={{ padding: '12px' }}>
                                <span style={{
                                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px',
                                    background: u.isActive ? '#d4edda' : '#f8d7da',
                                    color: u.isActive ? '#155724' : '#721c24'
                                }}>{u.isActive ? 'Actif' : 'Inactif'}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
