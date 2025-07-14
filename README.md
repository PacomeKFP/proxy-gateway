# 🧭 Node.js Reverse Proxy Server

Ce projet est une application **Node.js** de **proxy HTTP et WebSocket** capable de rediriger les requêtes entrantes vers deux serveurs différents selon le chemin d’URL.

## ✨ Fonctionnalités

- Redirige les requêtes HTTP vers un serveur web (par défaut sur `http://localhost:8002`)
- Redirige les connexions WebSocket vers un serveur de socket (par défaut sur `http://localhost:3308`)
- Supporte les variables d’environnement pour configurer dynamiquement les serveurs cibles
- Un seul point d’entrée pour gérer les deux types de flux (`/http`, `/socket`)

