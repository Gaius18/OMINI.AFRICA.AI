# 🌍 OMNI.AFRICA.AI - Assistant Agricole Intelligent

## 📋 **Résumé en 5 lignes**

OMNI.AFRICA.AI est un assistant agricole intelligent conçu spécifiquement pour les agriculteurs africains. L'application combine reconnaissance vocale en français, synthèse audio naturelle et conseils agricoles adaptés au contexte africain. Elle fonctionne en mode hors ligne avec cache local et se synchronise avec Firebase pour sauvegarder les conversations. L'interface intuitive permet aux agriculteurs de poser des questions vocales ou textuelles et de recevoir des réponses audio naturelles, même avec une connexion internet limitée.

## 🎯 **Prochains Objectifs**

### **Phase 1 - Amélioration de l'IA (1-2 mois)**
- 🔧 **Intégration DeepSeek API** comme fallback principal
- 🌍 **Support multilingue** : Dioula, Baoulé, Bambara, Wolof
- 🎤 **Reconnaissance vocale améliorée** avec détection d'accent africain
- 📱 **Application mobile** React Native pour Android/iOS

### **Phase 2 - Fonctionnalités Avancées (2-3 mois)**
- 📊 **Base de données agricole** avec 100+ cultures africaines
- 🗺️ **Géolocalisation** pour conseils adaptés à la région
- 📸 **Reconnaissance d'images** pour identifier maladies des plantes
- 🤖 **Mode conversationnel** avec mémoire des échanges

### **Phase 3 - Écosystème Complet (3-6 mois)**
- 👥 **Communauté d'agriculteurs** avec partage d'expériences
- 📈 **Analytics agricoles** avec prédictions de rendement
- 🔗 **Intégration IoT** avec capteurs de sol et météo
- 💰 **Marketplace** pour produits agricoles

### **Phase 4 - IA Générale (6-12 mois)**
- 🧠 **AGI_ELP** - Assistant Général d'Intelligence pour entreprises
- 🔄 **Workflows automatisés** pour processus agricoles
- 📊 **Tableaux de bord** avancés pour coopératives
- 🌐 **API publique** pour développeurs tiers

## 🚀 **Installation Rapide**

Voir le fichier [INSTALLATION.md](./INSTALLATION.md) pour un guide détaillé.

```bash
# Installation rapide
git clone [url-du-projet]
cd OMNI_OPTIMIZ_AFRIC.IA
npm install
npm start
```

## 🌱 **Fonctionnalités Actuelles**

- ✅ **Assistant agricole intelligent** avec Gemini API
- ✅ **Reconnaissance vocale** en français
- ✅ **Synthèse audio naturelle** avec contrôle stop
- ✅ **Mode hors ligne** avec cache local
- ✅ **Sauvegarde Firebase** des conversations
- ✅ **Gestion des dossiers** pour organiser les conversations
- ✅ **Interface responsive** moderne
- ✅ **Authentification** avec redirection automatique

## 🛠️ **Technologies Utilisées**

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Styling** : Tailwind CSS
- **IA** : Google Gemini API + DeepSeek API (fallback)
- **Base de données** : Firebase Firestore + IndexedDB local
- **Audio** : Web Speech API
- **Icônes** : Font Awesome

## 📁 **Structure du Projet**

```
OMNI_OPTIMIZ_AFRIC.IA/
├── server.js                 # Serveur Express
├── config.env               # Configuration API
├── package.json             # Dépendances Node.js
├── frontend/
│   ├── pages/
│   │   ├── login-demo.html  # Page de connexion principale
│   │   ├── agriculture-ai.html # Assistant agricole
│   │   ├── clear-cache.html # Nettoyage cache
│   │   └── index.html       # Page d'accueil
│   ├── js/
│   │   ├── firebase-config.js # Configuration Firebase
│   │   ├── gemini-config.js   # Configuration Gemini
│   │   └── audio-manager.js   # Gestion audio
│   └── assets/              # Ressources statiques
└── README.md               # Ce fichier
```

## 🎯 **Utilisation**

1. **Connexion** : Utilisez les identifiants demo ou créez un compte
2. **Questions vocales** : Cliquez sur le microphone et parlez
3. **Questions textuelles** : Tapez dans le champ de saisie
4. **Historique** : Consultez vos conversations dans le panneau de droite
5. **Organisation** : Créez des dossiers pour classer vos conversations
6. **Déconnexion** : Utilisez le bouton rouge dans le panneau d'historique

## 🔧 **Configuration Requise**

- **Node.js** 16+ 
- **npm** ou **yarn**
- **Clé API Gemini** (optionnelle - mode fallback disponible)
- **Configuration Firebase** (optionnelle - mode local disponible)

## 📞 **Support**

- **Guide d'installation** : [INSTALLATION.md](./INSTALLATION.md)
- **Problèmes courants** : [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **API Documentation** : [API.md](./API.md)

---

**OMNI.AFRICA.AI** - *Assistant Agricole Intelligent pour l'Afrique* 🌍🌱 