import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../services/api'

export default function EquipmentForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '', category: 'PC', status: 'En stock',
        brand: '', model: '', serialNumber: '',
        assignedTo: '', location: '', notes: ''
    })

    useEffect(() => {
        if (id) {
            api.get(`/equipment/${id}`).then(r => setForm(r.data))
        }
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (id) {
                await api.put(`/equipment/${id}`, form)
                toast.success('Équipement mis à jour !')
            } else {
                await api.post('/equipment', form)
                toast.success('Équipement créé !')
            }
            navigate('/equipment')
        } catch (err) {
            toast.error('Erreur : ' + (err.response?.data?.error || err.message))
        }
    }

    const field = (label, key, type='text') => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontWeight: 'bold', color: '#333' }}>{label}</label>
            <input type={type} value={form[key] || ''} onChange={e => setForm({...form, [key]: e.target.value})}
                style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
    )

    return (
        <div>
            <h1 style={{ color: '#0f3460', marginBottom: '24px' }}>
                {id ? 'Modifier' : 'Ajouter'} un équipement
            </h1>
            <form onSubmit={handleSubmit} style={{
                background: 'white', padding: '32px', borderRadius: '8px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'
            }}>
                {field('Nom *', 'name')}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontWeight: 'bold' }}>Catégorie</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                        style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                        {['PC','Laptop','Ecran','Imprimante','Reseau','Serveur','Autre'].map(c =>
                            <option key={c} value={c}>{c}</option>
                        )}
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontWeight: 'bold' }}>Statut</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                        style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                        {['Actif','En reparation','Hors service','En stock'].map(s =>
                            <option key={s} value={s}>{s}</option>
                        )}
                    </select>
                </div>
                {field('Marque', 'brand')}
                {field('Modèle', 'model')}
                {field('N° Série', 'serialNumber')}
                {field('Assigné à', 'assignedTo')}
                {field('Localisation', 'location')}
                <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontWeight: 'bold' }}>Notes</label>
                    <textarea value={form.notes || ''} onChange={e => setForm({...form, notes: e.target.value})}
                        rows={3} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ gridColumn: '1/-1', display: 'flex', gap: '12px' }}>
                    <button type='submit' style={{
                        background: '#e94560', color: 'white', border: 'none',
                        padding: '12px 24px', borderRadius: '4px', cursor: 'pointer'
                    }}>
                        {id ? 'Mettre à jour' : 'Créer'}
                    </button>
                    <button type='button' onClick={() => navigate('/equipment')} style={{
                        background: '#666', color: 'white', border: 'none',
                        padding: '12px 24px', borderRadius: '4px', cursor: 'pointer'
                    }}>Annuler</button>
                </div>
            </form>
        </div>
    )
}
