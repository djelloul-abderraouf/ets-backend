const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    quantite: { type: Number, required: true },
    prixUnitaire: { type: Number, required: true },
    remarque: { type: String }
});

const orderSchema = new mongoose.Schema({
    orderNumber: { type: Number, unique: true },  // ✅ Numéro de bon de commande
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    produits: [productSchema],
    montantTotal: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
