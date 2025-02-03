const express = require('express');
const router = express.Router();
const Facture = require('../models/Facture');

// ✅ Créer une facture avec un numéro incrémental
router.post('/', async (req, res) => {
    try {
        const lastFacture = await Facture.findOne().sort({ FactureNumber: -1 });
        const nextFactureNumber = lastFacture ? lastFacture.FactureNumber + 1 : 1;

        const montantTotal = req.body.produits.reduce((total, produit) => {
            return total + (produit.prixUnitaire * produit.quantite);
        }, 0);

        const newFacture = new Facture({
            ...req.body,
            factureNumber: nextFactureNumber,
            montantTotal: montantTotal
        });

        const savedFacture = await newFacture.save();
        res.status(201).json(savedFacture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ✅ Récupérer tous les factures
router.get('/', async (req, res) => {
    try {
        const factureList = await Facture.find().populate('clientId');
        res.status(200).json(factureList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Récupérer un facture par ID
router.get('/:id', async (req, res) => {
    try {
        const facture = await Facture.findById(req.params.id).populate('clientId');
        if (!facture) return res.status(404).json({ message: 'Facture non trouvé' });
        res.status(200).json(facture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Mettre à jour une facture
router.put('/:id', async (req, res) => {
    try {
        const montantTotal = req.body.produits.reduce((total, produit) => {
            return total + (produit.prixUnitaire * produit.quantite);
        }, 0);

        const updatedFacture = await Facture.findByIdAndUpdate(
            req.params.id,
            { ...req.body, montantTotal: montantTotal },
            { new: true, runValidators: true } // ✅ Assurer la validation des champs
        );

        if (!updatedFacture) return res.status(404).json({ message: 'Facture non trouvé' });
        res.status(200).json(updatedFacture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ✅ Supprimer une Facture
router.delete('/:id', async (req, res) => {
    try {
        const deletedFacture = await Facture.findByIdAndDelete(req.params.id);
        if (!deletedFacture) return res.status(404).json({ message: 'Facture non trouvé' });
        res.status(200).json({ message: 'Facture supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
