const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        // ✅ Récupérer le dernier numéro de bon de commande
        const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
        const nextOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

        const { clientId, produits, montantTotal, isPaid, isDelivered } = req.body;

        const newOrder = new Order({
            orderNumber: nextOrderNumber, // ✅ Affecter le numéro
            clientId,
            produits,
            montantTotal,
            isPaid: isPaid || false,
            isDelivered: isDelivered || false
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('clientId', 'nom prenom').sort({ date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};