// controllers/commandeController.js
const Commande = require('../models/commande');
const Produit = require('../models/produit');

// Récupérer toutes les commandes
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate('client', 'nom prenom email')
      .populate('produits.produit', 'nom prix');
      
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une commande par son ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate('client', 'nom prenom email telephone adresse')
      .populate('produits.produit', 'nom prix description');
    
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle commande
exports.createCommande = async (req, res) => {
  try {
    // Vérification que les produits existent et récupération des prix
    const produitPromises = req.body.produits.map(async (item) => {
      const produit = await Produit.findById(item.produit);
      if (!produit) {
        throw new Error(Produit avec ID ${item.produit} non trouvé);
      }
      
      // Utilisation du prix du produit en base de données
      return {
        produit: item.produit,
        quantite: item.quantite,
        prixUnitaire: produit.prix
      };
    });
    
    const produitsValidated = await Promise.all(produitPromises);
    
    // Calcul du total de la commande
    const total = produitsValidated.reduce((sum, item) => {
      return sum + (item.prixUnitaire * item.quantite);
    }, 0);
    
    // Création de la commande
    const commande = new Commande({
      ...req.body,
      produits: produitsValidated,
      total
    });
    
    const nouvelleCommande = await commande.save();
    
    // Population des données pour la réponse
    const commandePopulated = await Commande.findById(nouvelleCommande._id)
      .populate('client', 'nom prenom')
      .populate('produits.produit', 'nom');
    
    res.status(201).json(commandePopulated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une commande
exports.updateCommande = async (req, res) => {
  try {
    // Si des produits sont mis à jour, recalculer le total
    let updateData = req.body;
    
    if (req.body.produits) {
      // Vérification que les produits existent et récupération des prix
      const produitPromises = req.body.produits.map(async (item) => {
        const produit = await Produit.findById(item.produit);
        if (!produit) {
          throw new Error(Produit avec ID ${item.produit} non trouvé);
        }
        
        // Utilisation du prix du produit en base de données
        return {
          produit: item.produit,
          quantite: item.quantite,
          prixUnitaire: produit.prix
        };
      });
      
      const produitsValidated = await Promise.all(produitPromises);
      
      // Calcul du total de la commande
      const total = produitsValidated.reduce((sum, item) => {
        return sum + (item.prixUnitaire * item.quantite);
      }, 0);
      
      updateData = {
        ...req.body,
        produits: produitsValidated,
        total
      };
    }
    
    const commande = await Commande.findByIdAndUpdate(
      req.params.id, 
      updateData,
      { new: true, runValidators: true }
    ).populate('client', 'nom prenom')
     .populate('produits.produit', 'nom');
    
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    res.status(200).json(commande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une commande
exports.deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    res.status(200).json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer toutes les commandes d'un client
exports.getCommandesByClient = async (req, res) => {
  try {
    const commandes = await Commande.find({ client: req.params.clientId })
      .populate('produits.produit', 'nom prix')
      .sort({ dateCommande: -1 });
      
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};