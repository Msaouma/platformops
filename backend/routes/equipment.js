const router = require('express').Router()
const Equipment = require('../models/Equipment')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const { page=1, limit=10, category, status, search } = req.query
        const filter = {}
        if (category) filter.category = category
        if (status) filter.status = status
        if (search) filter.name = { $regex: search, $options: 'i' }
        const total = await Equipment.countDocuments(filter)
        const equipment = await Equipment.find(filter)
            .skip((page-1) * limit).limit(parseInt(limit))
            .sort({ createdAt: -1 })
        res.json({ equipment, total, pages: Math.ceil(total/limit), page })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const eq = new Equipment({ ...req.body, createdBy: req.user.id })
        await eq.save()
        res.status(201).json(eq)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const eq = await Equipment.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        )
        if (!eq) return res.status(404).json({ error: 'Non trouve' })
        res.json(eq)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        await Equipment.findByIdAndDelete(req.params.id)
        res.json({ message: 'Equipement supprime' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
