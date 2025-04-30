// models/produit.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma Produit
const ProduitSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  quantiteStock: {
    type: Number,
    default: 0
  },
  categorie: {
    type: String
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

// Création du modèle à partir du schéma
const Produit = mongoose.model('Produit', ProduitSchema);

module.exports = Produit;