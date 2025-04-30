# Projet Gestion Clients, Produits et Commandes

J’ai réalisé une application web qui permet de gérer des clients, des produits et des commandes. L’application est divisée en deux parties : un *backend* (le serveur) et un *frontend* (l’interface utilisateur).

## Backend (Express.js + MongoDB)

C’est la partie qui gère les données. J’ai utilisé :

- *Express.js* pour créer les routes de l’API
- *MongoDB* comme base de données
- *Mongoose* pour faciliter l’interaction avec la base

### Organisation du backend
- 📂 *config* → connexion à la base
- 📂 *models* → structure des données
- 📂 *controllers* → logique métier
- 📂 *routes* → chemins de l’API
- 📂 *middlewares* → par exemple l’authentification
- 📄 *server.js* → démarre le serveur

## Frontend (Angular)

C’est la partie visible par l’utilisateur. J’ai utilisé :

- *Angular* pour construire l’interface
- *Bootstrap* pour le style
- *RxJS* pour les appels API

### Organisation du frontend
- 📂 *components* → les pages / blocs d’affichage
- 📂 *services* → pour parler avec l’API
- 📂 *models* → structure des données
- 📂 *shared* → gardes, intercepteurs...

## Fonctionnalités

- *Clients* : ajouter, modifier, supprimer des clients et voir leurs commandes
- *Produits* : gérer les produits et le stock
- *Commandes* : créer une commande, associer des produits, suivre son état, calculer le total

## Relations entre les données

Avec *Mongoose*, j’ai relié les clients, produits et commandes. Par exemple :  
Une commande est liée à un client grâce à l’ID du client.
