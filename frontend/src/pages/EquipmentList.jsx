import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function EquipmentList() {
    const [equipment, setEquipment] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        api.get('/equipment', { params: { page, search, category, limit: 10 } })
            .then(r => { setEquipment(r.data.equipment); setTotal(r.data.total) })
    }, [page, search, category])

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer cet équipement ?')) return
        await api.delete(`/equipment/${id}`)
        setEquipment(equipment.filter(e => e._id !== id))
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h1 style={{ color: '#0f3460' }}>Équipements ({total})</h1>
                <Link to='/equipment/new' style={{
                    background: '#e94560', color: 'white', padding: '10px 20px',
                    borderRadius: '4px', textDecoration: 'none'
                }}>+ Ajouter</Link>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <input
                    placeholder='Rechercher...' value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1) }}
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', flex: 1 }}
                />
                <select value={category} onChange={e => { setCategory(e.target.value); setPage(1) }}
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                    <option value=''>Toutes catégories</option>
                    {['PC','Laptop','Ecran','Imprimante','Reseau','Serveur','Autre'].map(c =>
                        <option key={c} value={c}>{c}</option>
                    )}
                </select>
            </div>

            <table style={{ width: '100%', background: 'white', borderRadius: '8px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#0f3460', color: 'white' }}>
                        {['Nom','Catégorie','Statut','Assigné à','Actions'].map(h =>
                            <th key={h} style={{ padding: '12px', textAlign: 'left' }}>{h}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {equipment.map((eq, i) => (
                        <tr key={eq._id} style={{ background: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
                            <td style={{ padding: '12px' }}>{eq.name}</td>
                            <td style={{ padding: '12px' }}>{eq.category}</td>
                            <td style={{ padding: '12px' }}>
                                <span style={{
                                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px',
                                    background: eq.status === 'Actif' ? '#d4edda' : '#f8d7da',
                                    color: eq.status === 'Actif' ? '#155724' : '#721c24'
                                }}>{eq.status}</span>
                            </td>
                            <td style={{ padding: '12px' }}>{eq.assignedTo || '—'}</td>
                            <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                                <Link to={`/equipment/${eq._id}/edit`} style={{ color: '#0f3460' }}>✏️</Link>
                                <button onClick={() => handleDelete(eq._id)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                    style={{ padding: '8px 16px', cursor: 'pointer' }}>← Préc</button>
                <span style={{ padding: '8px' }}>Page {page}</span>
                <button onClick={() => setPage(p => p+1)} disabled={equipment.length < 10}
                    style={{ padding: '8px 16px', cursor: 'pointer' }}>Suiv →</button>
            </div>
        </div>
    )
}
