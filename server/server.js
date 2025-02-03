const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');
const orderRoutes = require('./routes/orderRoutes');
const devisRoutes = require('./routes/devisRoutes');
const factureRoutes = require('./routes/factureRoutes');  // ✅ Ajout de la route des devis

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://keepeershop:EAhuYaUZYfF7VYsB@cluster0.0lax6.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/devis', devisRoutes);  //  Intégration des routes devis
app.use('/api/facture', factureRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


