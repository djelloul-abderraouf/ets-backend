const Client = require('../models/Client');

// Ajouter un client
exports.addClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtenir la liste des clients
exports.getClients = async (req, res) => {
    try {
        const { search, page = 1, limit = 20 } = req.query;

        const query = search
            ? {
                  $or: [
                      { nom: { $regex: search, $options: 'i' } },
                      { prenom: { $regex: search, $options: 'i' } },
                      { telephone: { $regex: search, $options: 'i' } },
                  ],
              }
            : {};

        const skip = (page - 1) * limit;
        const totalClients = await Client.countDocuments(query);
        const clients = await Client.find(query).skip(skip).limit(Number(limit));

        res.status(200).json({
            clients,
            totalPages: Math.ceil(totalClients / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Modifier un client
exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Client supprimé avec succès.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
