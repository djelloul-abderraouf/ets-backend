const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    rc: { type: String, default: '' },
    nif: { type: String, default: '' }
});

module.exports = mongoose.model('Client', clientSchema);
