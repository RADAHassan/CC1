// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoUR = proces.env.MONGO_URI || 'mongodb://localhost:27017/Dbcc1'

// Import des routes
const clientRoutes = require('./routes/clientRoutes');
const produitRoutes = require('./routes/produitRoutes');
const commandeRoutes = require('./routes/commandeRoutes');

// Connexion à la base de données
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/commandes', commandeRoutes);

// Route de base
app.get('/', (req, res) => {
  res.send('API fonctionnelle');
});

// Gestion des routes inexistantes
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Port d'écoute
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(Serveur démarré sur le port ${PORT});
});