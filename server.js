const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware pour servir les fichiers statiques
app.use(express.static('.'));

// Route spécifique pour servir config.env
app.get('/config.env', (req, res) => {
    const envPath = path.join(__dirname, 'config.env');
    
    if (fs.existsSync(envPath)) {
        res.setHeader('Content-Type', 'text/plain');
        res.sendFile(envPath);
    } else {
        res.status(404).send('Fichier config.env non trouvé');
    }
});

// Route spécifique pour servir .env (fallback)
app.get('/.env', (req, res) => {
    const envPath = path.join(__dirname, '.env');
    
    if (fs.existsSync(envPath)) {
        res.setHeader('Content-Type', 'text/plain');
        res.sendFile(envPath);
    } else {
        res.status(404).send('Fichier .env non trouvé');
    }
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour le nettoyage du cache
app.get('/clear-cache', (req, res) => {
    res.sendFile(path.join(__dirname, 'clear-cache.html'));
});

// Route pour le test des APIs
app.get('/test-apis', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-apis.html'));
});

// Route pour les pages frontend
app.get('/frontend/pages/:page', (req, res) => {
    const pagePath = path.join(__dirname, 'frontend', 'pages', req.params.page);
    if (fs.existsSync(pagePath)) {
        res.sendFile(pagePath);
    } else {
        res.status(404).send('Page non trouvée');
    }
});

// Route pour les fichiers JS
app.get('/frontend/js/:file', (req, res) => {
    const filePath = path.join(__dirname, 'frontend', 'js', req.params.file);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Fichier non trouvé');
    }
});

// Route pour les fichiers CSS
app.get('/frontend/css/:file', (req, res) => {
    const filePath = path.join(__dirname, 'frontend', 'css', req.params.file);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Fichier non trouvé');
    }
});

// Route pour les assets
app.get('/assets/:file', (req, res) => {
    const filePath = path.join(__dirname, 'assets', req.params.file);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Fichier non trouvé');
    }
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Page non trouvée</h1>
        <p>La page demandée n'existe pas.</p>
        <a href="/">Retour à l'accueil</a>
    `);
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📁 Fichiers statiques servis depuis: ${__dirname}`);
    console.log(`🔧 Fichier config.env accessible sur: http://localhost:${PORT}/config.env`);
    console.log(`🌐 Application principale: http://localhost:${PORT}/`);
    console.log(`🤖 Assistant agricole: http://localhost:${PORT}/frontend/pages/agriculture-ai.html`);
}); 