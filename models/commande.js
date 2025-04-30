// models/commande.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma Commande
const CommandeSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  produits: [
    {
      produit: {
        type: Schema.Types.ObjectId,
        ref: 'Produit',
        required: true
      },
      quantite: {
        type: Number,
        required: true,
        default: 1
      },
      prixUnitaire: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  statut: {
    type: String,
    enum: ['En attente', 'Traitée', 'Expédiée', 'Livrée', 'Annulée'],
    default: 'En attente'
  },
  dateCommande: {
    type: Date,
    default: Date.now
  },
  adresseLivraison: {
    type: String
  },
  methodePaiement: {
    type: String
  }
});

// Création du modèle à partir du schéma
const Commande = mongoose.model('Commande', CommandeSchema);

module.exports = Commande;