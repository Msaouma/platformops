const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = new User({ name, email, password })
        await user.save()
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
        res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ error: 'Identifiants incorrects' })
        const ok = await bcrypt.compare(password, user.password)
        if (!ok) return res.status(401).json({ error: 'Identifiants incorrects' })
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
        res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
