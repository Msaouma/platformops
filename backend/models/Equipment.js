const mongoose = require('mongoose')

const equipmentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: {
        type: String,
        enum: ['PC', 'Laptop', 'Ecran', 'Imprimante', 'Reseau', 'Serveur', 'Autre'],
        required: true
    },
    serialNumber: { type: String, unique: true, sparse: true },
    brand: String,
    model: String,
    status: {
        type: String,
        enum: ['Actif', 'En reparation', 'Hors service', 'En stock'],
        default: 'En stock'
    },
    assignedTo: { type: String, default: null },
    location: String,
    purchaseDate: Date,
    warrantyExpiry: Date,
    notes: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

module.exports = mongoose.model('Equipment', equipmentSchema)
