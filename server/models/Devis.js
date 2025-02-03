const mongoose = require('mongoose');

const devisSchema = new mongoose.Schema({
    devisNumber: {
        type: Number,
        required: true,
        unique: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    produits: [
        {
            nom: { type: String, required: true },
            quantite: { type: Number, required: true },
            prixUnitaire: { type: Number, required: true }, // ✅ Prix unitaire ajouté
            remarque: { type: String }
        }
    ],
    montantTotal: { // ✅ Montant total ajouté
        type: Number,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Devis', devisSchema);
