import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import api from '../services/api'

export default function Monitoring() {
    const [metrics, setMetrics] = useState(null)
    const [history, setHistory] = useState([])

    useEffect(() => {
        const fetch = () => {
            api.get('/health').then(r => {
                setMetrics(r.data)
                setHistory(h => [...h.slice(-19), {
                    time: new Date().toLocaleTimeString(),
                    status: r.data.status === 'OK' ? 1 : 0
                }])
            }).catch(() => {})
        }
        fetch()
        const interval = setInterval(fetch, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <h1 style={{ color: '#0f3460', marginBottom: '24px' }}>Monitoring</h1>
            <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h3>Statut API</h3>
                {metrics ? (
                    <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
                        <div>
                            <strong>Statut : </strong>
                            <span style={{ color: metrics.status === 'OK' ? 'green' : 'red' }}>
                                {metrics.status}
                            </span>
                        </div>
                        <div><strong>Version : </strong>{metrics.version}</div>
                        <div><strong>DB : </strong>{metrics.db}</div>
                    </div>
                ) : <p>Chargement...</p>}
            </div>
            <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
                <h3>Disponibilité API (5 dernières minutes)</h3>
                <ResponsiveContainer width='100%' height={200}>
                    <LineChart data={history}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='time' />
                        <YAxis domain={[0, 1]} />
                        <Tooltip />
                        <Legend />
                        <Line dataKey='status' stroke='#27ae60' name='API Status' dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
