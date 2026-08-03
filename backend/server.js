require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')

const app = express()

// Connexion MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connecte a MongoDB Atlas !'))
    .catch(err => console.error('Erreur MongoDB:', err))

// Middlewares securite
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Trop de requetes' }
})
app.use('/api/', limiter)

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/equipment', require('./routes/equipment'))
app.use('/api/dashboard', require('./routes/dashboard'))

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date(),
        version: '1.0.0',
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API demarree sur port ${PORT}`))
module.exports = app
