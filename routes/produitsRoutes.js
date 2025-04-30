// routes/produitRoutes.js
const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');

// Route pour récupérer tous les produits
router.get('/', produitController.getAllProduits);

// Route pour récupérer un produit par son ID
router.get('/:id', produitController.getProduitById);

// Route pour créer un nouveau produit
router.post('/', produitController.createProduit);

// Route pour mettre à jour un produit
router.put('/:id', produitController.updateProduit);

// Route pour supprimer un produit
router.delete('/:id', produitController.deleteProduit);

module.exports = router;