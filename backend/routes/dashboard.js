const router = require('express').Router()
const Equipment = require('../models/Equipment')
const auth = require('../middleware/auth')

router.get('/stats', auth, async (req, res) => {
    try {
        const [total, byCategory, byStatus, recentActivity] = await Promise.all([
            Equipment.countDocuments(),
            Equipment.aggregate([
                { $group: { _id: '$category', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            Equipment.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ]),
            Equipment.find().sort({ createdAt: -1 }).limit(5)
                .select('name category status createdAt')
        ])
        res.json({ total, byCategory, byStatus, recentActivity })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
