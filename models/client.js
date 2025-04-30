// models/client.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma Client
const ClientSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telephone: {
    type: String
  },
  adresse: {
    type: String
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

// Création du modèle à partir du schéma
const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;