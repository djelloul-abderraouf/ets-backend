const express = require('express');
const router = express.Router();
const Devis = require('../models/Devis');

// ✅ Créer un devis avec un numéro incrémental
router.post('/', async (req, res) => {
    try {
        const lastDevis = await Devis.findOne().sort({ devisNumber: -1 });
        const nextDevisNumber = lastDevis ? lastDevis.devisNumber + 1 : 1;

        const montantTotal = req.body.produits.reduce((total, produit) => {
            return total + (produit.prixUnitaire * produit.quantite);
        }, 0);

        const newDevis = new Devis({
            ...req.body,
            devisNumber: nextDevisNumber,
            montantTotal: montantTotal
        });

        const savedDevis = await newDevis.save();
        res.status(201).json(savedDevis);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ✅ Récupérer tous les devis
router.get('/', async (req, res) => {
    try {
        const devisList = await Devis.find().populate('clientId');
        res.status(200).json(devisList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Récupérer un devis par ID
router.get('/:id', async (req, res) => {
    try {
        const devis = await Devis.findById(req.params.id).populate('clientId');
        if (!devis) return res.status(404).json({ message: 'Devis non trouvé' });
        res.status(200).json(devis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Mettre à jour un devis
router.put('/:id', async (req, res) => {
    try {
        const montantTotal = req.body.produits.reduce((total, produit) => {
            return total + (produit.prixUnitaire * produit.quantite);
        }, 0);

        const updatedDevis = await Devis.findByIdAndUpdate(
            req.params.id,
            { ...req.body, montantTotal: montantTotal },
            { new: true, runValidators: true } // ✅ Assurer la validation des champs
        );

        if (!updatedDevis) return res.status(404).json({ message: 'Devis non trouvé' });
        res.status(200).json(updatedDevis);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ✅ Supprimer un devis
router.delete('/:id', async (req, res) => {
    try {
        const deletedDevis = await Devis.findByIdAndDelete(req.params.id);
        if (!deletedDevis) return res.status(404).json({ message: 'Devis non trouvé' });
        res.status(200).json({ message: 'Devis supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
