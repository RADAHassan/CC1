// middlewares/auth.js
const jwt = require('jsonwebtoken');

// Secret pour la signature JWT (à définir dans un fichier .env en production)
const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt';

// Middleware d'authentification
const auth = (req, res, next) => {
  // Récupérer le token du header Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Authentification requise' });
  }
  
  try {
    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Ajouter l'utilisateur à l'objet request
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = auth;