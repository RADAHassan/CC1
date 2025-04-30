// config/db.js
const mongoose = require('mongoose');

// URL de connexion à MongoDB (à remplacer par votre URL)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

// Fonction pour connecter à MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(MongoDB connecté: ${conn.connection.host});
  } catch (error) {
    console.error(Erreur de connexion: ${error.message});
    process.exit(1);
  }
};

module.exports = connectDB;