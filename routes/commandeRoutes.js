// routes/commandeRoutes.js
const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

// Route pour récupérer toutes les commandes
router.get('/', commandeController.getAllCommandes);

// Route pour récupérer une commande par son ID
router.get('/:id', commandeController.getCommandeById);

// Route pour créer une nouvelle commande
router.post('/', commandeController.createCommande);

// Route pour mettre à jour une commande
router.put('/:id', commandeController.updateCommande);

// Route pour supprimer une commande
router.delete('/:id', commandeController.deleteCommande);

// Route pour récupérer toutes les commandes d'un client
router.get('/client/:clientId', commandeController.getCommandesByClient);

module.exports = router;