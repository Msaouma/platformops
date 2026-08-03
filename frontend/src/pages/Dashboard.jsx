import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import api from '../services/api'

const COLORS = ['#0f3460','#e94560','#27ae60','#e67e22','#8e44ad','#16a085']

export default function Dashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/dashboard/stats')
            .then(r => { setStats(r.data); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    if (loading) return <p>Chargement...</p>
    if (!stats) return <p>Erreur de chargement</p>

    return (
        <div>
            <h1 style={{ color: '#0f3460', marginBottom: '24px' }}>Tableau de bord</h1>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <div style={{
                    background: 'white', padding: '24px', borderRadius: '8px',
                    flex: 1, textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#0f3460' }}>
                        {stats.total}
                    </div>
                    <div style={{ color: '#666' }}>Total équipements</div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '8px', flex: 1 }}>
                    <h3>Par catégorie</h3>
                    <ResponsiveContainer width='100%' height={300}>
                        <PieChart>
                            <Pie data={stats.byCategory} dataKey='count' nameKey='_id' label>
                                {stats.byCategory.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '8px', flex: 1 }}>
                    <h3>Par statut</h3>
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart data={stats.byStatus}>
                            <XAxis dataKey='_id' />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey='count' fill='#0f3460' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
