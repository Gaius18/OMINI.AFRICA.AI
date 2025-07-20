# 📋 Guide d'Installation - OMNI.AFRICA.AI

## 🎯 **Vue d'Ensemble**

Ce guide vous permettra d'installer et de configurer OMNI.AFRICA.AI sur votre machine en quelques minutes.

## ⚡ **Installation Rapide (5 minutes)**

### **Étape 1 : Prérequis**
Assurez-vous d'avoir installé :
- ✅ **Node.js** (version 16 ou supérieure)
- ✅ **npm** (généralement installé avec Node.js)

**Vérifier l'installation :**
```bash
node --version
npm --version
```

### **Étape 2 : Télécharger le projet**
```bash
# Option 1 : Cloner depuis GitHub
git clone https://github.com/votre-username/OMNI_OPTIMIZ_AFRIC.IA.git
cd OMNI_OPTIMIZ_AFRIC.IA

# Option 2 : Télécharger le ZIP
# 1. Téléchargez le ZIP depuis GitHub
# 2. Extrayez le contenu
# 3. Ouvrez un terminal dans le dossier
```

### **Étape 3 : Installer les dépendances**
```bash
npm install
```

### **Étape 4 : Démarrer l'application**
```bash
npm start
```

### **Étape 5 : Accéder à l'application**
Ouvrez votre navigateur et allez sur :
```
http://localhost:8080/frontend/pages/login-demo.html
```

## 🔧 **Installation Détaillée**

### **1. Installation de Node.js**

#### **Windows :**
1. Allez sur [nodejs.org](https://nodejs.org/)
2. Téléchargez la version LTS (Long Term Support)
3. Exécutez l'installateur
4. Redémarrez votre terminal

#### **macOS :**
```bash
# Avec Homebrew
brew install node

# Ou téléchargez depuis nodejs.org
```

#### **Linux (Ubuntu/Debian) :**
```bash
sudo apt update
sudo apt install nodejs npm
```

### **2. Vérification de l'installation**
```bash
# Vérifier Node.js
node --version
# Doit afficher v16.x.x ou supérieur

# Vérifier npm
npm --version
# Doit afficher 8.x.x ou supérieur
```

### **3. Configuration optionnelle des APIs**

#### **Configuration Gemini API (Recommandée)**
1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créez une clé API gratuite
3. Modifiez le fichier `config.env` :
```env
GEMINI_API_KEY=votre_cle_api_ici
```

#### **Configuration Firebase (Optionnelle)**
1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Créez un nouveau projet
3. Activez Firestore Database
4. Modifiez `frontend/js/firebase-config.js` avec vos clés

## 🚀 **Démarrage de l'Application**

### **Méthode 1 : Avec npm (Recommandée)**
```bash
npm start
```

### **Méthode 2 : Avec Node.js directement**
```bash
node server.js
```

### **Méthode 3 : Mode développement**
```bash
# Installer nodemon pour le rechargement automatique
npm install -g nodemon
nodemon server.js
```

## 🌐 **Accès à l'Application**

### **URLs principales :**
- **Page de connexion :** http://localhost:8080/frontend/pages/login-demo.html
- **Assistant agricole :** http://localhost:8080/frontend/pages/agriculture-ai.html
- **Nettoyage cache :** http://localhost:8080/frontend/pages/clear-cache.html
- **Page d'accueil :** http://localhost:8080/

### **Identifiants de test :**
- **Email :** jeanadouadou@gmail.com
- **Mot de passe :** 123456789

## 🔍 **Résolution des Problèmes**

### **Problème : Port 8080 déjà utilisé**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID [numero_du_processus] /F

# macOS/Linux
lsof -ti:8080
kill -9 [numero_du_processus]
```

### **Problème : Erreur "module not found"**
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### **Problème : Erreur de permissions**
```bash
# Windows : Exécuter en tant qu'administrateur
# macOS/Linux :
sudo npm install
```

### **Problème : Navigateur bloque l'audio**
1. Cliquez sur l'icône de cadenas dans la barre d'adresse
2. Autorisez l'accès au microphone
3. Actualisez la page

## 📱 **Utilisation de l'Application**

### **Première utilisation :**
1. **Ouvrez** http://localhost:8080/frontend/pages/login-demo.html
2. **Cliquez** sur "Se connecter" avec les identifiants demo
3. **Autorisez** l'accès au microphone si demandé
4. **Testez** la reconnaissance vocale en cliquant sur le microphone
5. **Posez** une question agricole

### **Fonctionnalités principales :**
- 🎤 **Reconnaissance vocale** : Cliquez sur le microphone et parlez
- ⌨️ **Saisie texte** : Tapez vos questions dans le champ
- 🔊 **Audio naturel** : Les réponses sont lues à voix haute
- ⏹️ **Stop audio** : Bouton rouge pour arrêter la lecture
- 📁 **Historique** : Panneau de droite pour voir vos conversations
- 🗂️ **Dossiers** : Organisez vos conversations par thème
- 🔄 **Reconnexion** : Bouton pour reconnecter les APIs

## 🔧 **Configuration Avancée**

### **Modifier le port de l'application**
Éditez `server.js` ligne 99 :
```javascript
const PORT = process.env.PORT || 8080; // Changez 8080 par votre port
```

### **Configuration pour production**
```bash
# Installer PM2 pour la gestion des processus
npm install -g pm2

# Démarrer en mode production
pm2 start server.js --name "omni-africa-ai"

# Vérifier le statut
pm2 status

# Voir les logs
pm2 logs omni-africa-ai
```

### **Variables d'environnement**
Créez un fichier `.env` :
```env
PORT=8080
GEMINI_API_KEY=votre_cle_gemini
DEEPSEEK_API_KEY=votre_cle_deepseek
NODE_ENV=development
```

## 📊 **Monitoring et Logs**

### **Voir les logs en temps réel**
```bash
# Avec npm
npm start

# Avec PM2
pm2 logs omni-africa-ai --lines 100
```

### **Vérifier le statut des APIs**
- **Gemini :** Indicateur vert dans l'interface
- **DeepSeek :** Fallback automatique si Gemini échoue
- **Firebase :** Optionnel, mode local disponible

## 🆘 **Support et Aide**

### **Problèmes courants :**
1. **L'application ne démarre pas** → Vérifiez Node.js et npm
2. **Erreur de port** → Arrêtez les autres applications sur le port 8080
3. **Audio ne fonctionne pas** → Autorisez l'accès au microphone
4. **APIs ne répondent pas** → Vérifiez vos clés API ou utilisez le mode fallback

### **Logs utiles :**
- **Console navigateur** : F12 → Console
- **Logs serveur** : Terminal où vous avez lancé `npm start`
- **Logs Firebase** : Console Firebase

### **Contact :**
- **Issues GitHub** : [Créer une issue](https://github.com/votre-username/OMNI_OPTIMIZ_AFRIC.IA/issues)
- **Documentation** : [README.md](./README.md)

## ✅ **Vérification de l'Installation**

Après l'installation, vérifiez que tout fonctionne :

1. ✅ **Serveur démarre** sans erreur
2. ✅ **Page de connexion** s'affiche
3. ✅ **Connexion** fonctionne avec les identifiants demo
4. ✅ **Reconnaissance vocale** fonctionne
5. ✅ **Réponses audio** sont générées
6. ✅ **Historique** se sauvegarde
7. ✅ **Déconnexion** redirige correctement

---

**🎉 Félicitations !** Votre assistant agricole intelligent est maintenant opérationnel ! 🌱 