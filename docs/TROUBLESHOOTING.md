# 🔧 Guide de Dépannage - OMNI.AFRICA.AI

## 🚨 **Problèmes Courants et Solutions**

### **1. L'application ne démarre pas**

#### **Erreur : "Port 8080 déjà utilisé"**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID [numero_du_processus] /F

# macOS/Linux
lsof -ti:8080
kill -9 [numero_du_processus]
```

#### **Erreur : "module not found"**
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

#### **Erreur : "permission denied"**
```bash
# Windows : Exécuter en tant qu'administrateur
# macOS/Linux :
sudo npm install
sudo npm start
```

### **2. Problèmes de reconnaissance vocale**

#### **Le microphone ne fonctionne pas**
1. **Autoriser l'accès** : Cliquez sur l'icône de cadenas dans la barre d'adresse
2. **Vérifier les permissions** : Paramètres → Confidentialité → Microphone
3. **Tester le microphone** : Utilisez l'application "Enregistreur vocal" de Windows
4. **Redémarrer le navigateur** : Fermez et rouvrez Chrome/Firefox

#### **Erreur : "Speech recognition not supported"**
- **Chrome** : Fonctionne parfaitement
- **Firefox** : Peut nécessiter des permissions supplémentaires
- **Safari** : Support limité, utilisez Chrome
- **Edge** : Fonctionne bien

### **3. Problèmes d'audio**

#### **Pas de son lors des réponses**
1. **Vérifier le volume** : Ordinateur et navigateur
2. **Autoriser l'audio** : Cliquez sur l'icône audio dans la barre d'adresse
3. **Tester l'audio** : Allez sur YouTube et testez le son
4. **Redémarrer l'application** : `Ctrl+C` puis `npm start`

#### **Audio coupé ou saccadé**
- **Fermer les autres onglets** qui utilisent l'audio
- **Vérifier la connexion internet** (pour les APIs)
- **Utiliser le mode hors ligne** si disponible

### **4. Problèmes d'APIs**

#### **Erreur : "Gemini API not responding"**
1. **Vérifier la clé API** dans `config.env`
2. **Tester la connexion** : Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Utiliser le mode fallback** : L'application bascule automatiquement sur DeepSeek
4. **Vérifier les quotas** : Les APIs gratuites ont des limites

#### **Erreur : "DeepSeek API not responding"**
1. **Vérifier la clé API** dans `config.env`
2. **Tester la connexion** : Allez sur [DeepSeek Console](https://platform.deepseek.com/)
3. **Utiliser le mode local** : L'application fonctionne sans APIs

### **5. Problèmes de Firebase**

#### **Erreur : "Firebase not initialized"**
- **Mode normal** : L'application fonctionne sans Firebase
- **Configuration optionnelle** : Modifiez `frontend/js/firebase-config.js`
- **Vérifier les clés** : Console Firebase → Paramètres du projet

#### **Erreur : "User not authenticated"**
- **Mode demo** : Utilisez les identifiants de test
- **Créer un compte** : Via Firebase Auth
- **Mode local** : Les données sont sauvegardées localement

### **6. Problèmes de performance**

#### **L'application est lente**
1. **Fermer les autres onglets** du navigateur
2. **Vider le cache** : http://localhost:8080/frontend/pages/clear-cache.html
3. **Redémarrer l'application** : `Ctrl+C` puis `npm start`
4. **Vérifier la RAM** : Fermez les autres applications

#### **Reconnaissance vocale lente**
- **Parler plus lentement** et clairement
- **Réduire le bruit ambiant**
- **Utiliser un microphone externe**
- **Vérifier la connexion internet**

### **7. Problèmes d'affichage**

#### **Interface déformée**
1. **Actualiser la page** : `F5` ou `Ctrl+R`
2. **Vider le cache** : `Ctrl+Shift+R`
3. **Vérifier la résolution** : Utilisez une résolution minimale de 1024x768
4. **Tester sur un autre navigateur**

#### **Panneau d'historique ne s'affiche pas**
1. **Cliquer sur le bouton de réduction** dans le panneau
2. **Vérifier la largeur de l'écran** (minimum 1200px recommandé)
3. **Actualiser la page**
4. **Vérifier la console** pour les erreurs JavaScript

### **8. Problèmes de données**

#### **Historique perdu**
1. **Vérifier le stockage local** : F12 → Application → Local Storage
2. **Sauvegarde Firebase** : Si configuré, les données sont sauvegardées
3. **Mode local** : Les données sont dans le navigateur
4. **Nettoyer le cache** : http://localhost:8080/frontend/pages/clear-cache.html

#### **Conversations non sauvegardées**
1. **Vérifier la connexion internet** (pour Firebase)
2. **Attendre la synchronisation** (1-2 secondes)
3. **Vérifier les logs** dans la console
4. **Mode local** : Les données sont sauvegardées automatiquement

## 🔍 **Diagnostic Avancé**

### **Vérifier les logs du serveur**
```bash
# Voir les logs en temps réel
npm start

# Logs détaillés
DEBUG=* npm start
```

### **Vérifier les logs du navigateur**
1. **Ouvrir les outils de développement** : `F12`
2. **Aller dans l'onglet Console**
3. **Chercher les erreurs** en rouge
4. **Copier les messages d'erreur** pour le support

### **Tester les APIs individuellement**
```bash
# Test Gemini
curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"contents":[{"parts":[{"text":"Test"}]}]}'

# Test DeepSeek
curl -X POST "https://api.deepseek.com/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Test"}]}'
```

## 📊 **Monitoring de l'Application**

### **Indicateurs de santé**
- 🟢 **Vert** : Tout fonctionne normalement
- 🟡 **Jaune** : Problème mineur, mode fallback activé
- 🔴 **Rouge** : Problème majeur, vérification requise

### **Statuts à vérifier**
1. **Serveur** : `http://localhost:8080/` répond
2. **Gemini API** : Indicateur vert dans l'interface
3. **DeepSeek API** : Fallback automatique
4. **Firebase** : Optionnel, mode local disponible
5. **Audio** : Test de synthèse vocale
6. **Microphone** : Autorisation accordée

## 🆘 **Support Technique**

### **Informations à fournir**
1. **Système d'exploitation** : Windows/macOS/Linux
2. **Version Node.js** : `node --version`
3. **Version npm** : `npm --version`
4. **Navigateur** : Chrome/Firefox/Safari/Edge
5. **Message d'erreur exact** : Copié depuis la console
6. **Actions effectuées** : Étapes qui ont mené au problème

### **Contact**
- **Issues GitHub** : [Créer une issue](https://github.com/votre-username/OMNI_OPTIMIZ_AFRIC.IA/issues)
- **Documentation** : [README.md](./README.md)
- **Installation** : [INSTALLATION.md](./INSTALLATION.md)

## ✅ **Checklist de Résolution**

Avant de demander de l'aide, vérifiez :

- [ ] **Node.js** est installé (version 16+)
- [ ] **npm** est installé
- [ ] **Dépendances** sont installées (`npm install`)
- [ ] **Port 8080** est libre
- [ ] **Navigateur** est à jour
- [ ] **Microphone** est autorisé
- [ ] **Audio** fonctionne
- [ ] **Connexion internet** est stable
- [ ] **Console** ne montre pas d'erreurs
- [ ] **Cache** a été vidé

---

**💡 Conseil :** La plupart des problèmes se résolvent en redémarrant l'application et en vidant le cache ! 🔄 