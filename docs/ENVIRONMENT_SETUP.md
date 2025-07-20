# Configuration des Variables d'Environnement

## 📋 Vue d'ensemble

Ce document explique comment configurer les variables d'environnement pour le projet **OMNI_OPTIMIZ_AFRIC.IA**.

## 🚀 Installation rapide

### 1. Créer le fichier .env

```bash
# Copier le template de développement
node scripts/load-env.js development create

# Ou copier le template de production
node scripts/load-env.js production create
```

### 2. Configurer les variables

Éditez le fichier `.env` créé et remplacez les valeurs par vos propres clés API.

### 3. Valider la configuration

```bash
node scripts/load-env.js development validate
```

## 📁 Structure des fichiers

```
config/
├── environment.js          # Configuration principale
├── development.env         # Template pour le développement
└── production.env          # Template pour la production

scripts/
└── load-env.js            # Script de gestion des variables

.env                       # Fichier de configuration local (créé automatiquement)
```

## 🔧 Variables d'environnement

### Configuration Firebase (Déjà configurée)

```env
FIREBASE_API_KEY=AIzaSyBCrGYX3GUH8CZaMqfmYSSvZZ2s3TEaK9c
FIREBASE_AUTH_DOMAIN=optimiz-africa.firebaseapp.com
FIREBASE_PROJECT_ID=optimiz-africa
FIREBASE_STORAGE_BUCKET=optimiz-africa.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=1098044012759
FIREBASE_APP_ID=1:1098044012759:web:87122767cd2f1751dcd892
```

### Configuration de l'application

```env
APP_NAME=OMNI_OPTIMIZ_AFRIC.IA
APP_VERSION=1.0.0
APP_ENV=development
APP_DEBUG=true
APP_URL=http://localhost:3000
APP_PORT=3000
```

### API Externes (À configurer)

#### OpenAI
```env

```

**Comment obtenir :**
1. Allez sur [OpenAI Platform](https://platform.openai.com/)
2. Créez un compte ou connectez-vous
3. Allez dans "API Keys"
4. Créez une nouvelle clé API

#### Google Cloud
```env
GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key_here
```

**Comment obtenir :**
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un projet ou sélectionnez un existant
3. Activez les APIs nécessaires
4. Créez des clés API dans "Credentials"

#### Azure AI
```env
AZURE_AI_API_KEY=your_azure_ai_api_key_here
```

**Comment obtenir :**
1. Allez sur [Azure Portal](https://portal.azure.com/)
2. Créez une ressource "Cognitive Services"
3. Récupérez la clé dans "Keys and Endpoint"

### Services Email

```env
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
```

**Note :** Pour Gmail, utilisez un "mot de passe d'application" et non votre mot de passe principal.

### Sécurité

```env
JWT_SECRET=your_super_secret_jwt_key_for_development_only
ENCRYPTION_KEY=your_32_character_encryption_key_here
SESSION_SECRET=your_session_secret_for_development
```

**Génération de clés sécurisées :**

```bash
# JWT Secret (64 caractères)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Encryption Key (32 caractères)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

# Session Secret (32 caractères)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### Paiements

#### Stripe (Test)
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_test_key_here
```

#### PayPal (Sandbox)
```env
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_paypal_sandbox_client_secret
```

### Services Cloud

#### AWS
```env
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
AWS_REGION=us-east-1
AWS_S3_BUCKET=optimiz-africa-assets
```

### Analytics

```env
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
MIXPANEL_TOKEN=your_mixpanel_token
```

## 🛠️ Utilisation du script de configuration

### Commandes disponibles

```bash
# Créer un fichier .env à partir du template
node scripts/load-env.js development create
node scripts/load-env.js production create

# Charger et afficher la configuration
node scripts/load-env.js development load
node scripts/load-env.js production load

# Valider seulement la configuration
node scripts/load-env.js development validate
node scripts/load-env.js production validate

# Afficher seulement la configuration
node scripts/load-env.js development show
node scripts/load-env.js production show
```

### Exemples d'utilisation

```bash
# 1. Créer la configuration de développement
node scripts/load-env.js development create

# 2. Éditer le fichier .env avec vos clés API
# (éditez manuellement le fichier .env)

# 3. Valider la configuration
node scripts/load-env.js development validate

# 4. Afficher la configuration actuelle
node scripts/load-env.js development show
```

## 🔒 Sécurité

### Variables sensibles

Les variables suivantes contiennent des informations sensibles et ne doivent **jamais** être committées dans le repository :

- `JWT_SECRET`
- `ENCRYPTION_KEY`
- `SESSION_SECRET`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `AWS_SECRET_ACCESS_KEY`
- `EMAIL_PASSWORD`

### Fichier .gitignore

Le fichier `.env` est automatiquement ignoré par Git. Assurez-vous que votre `.gitignore` contient :

```gitignore
# Variables d'environnement
.env
.env.local
.env.production
.env.staging

# Fichiers de configuration sensibles
config/*.env
!config/*.example
```

## 🚨 Dépannage

### Erreurs courantes

#### 1. "Configuration manquante"
```
⚠️  Configuration manquante pour les champs suivants: ['firebase.apiKey', 'security.jwtSecret']
```

**Solution :** Configurez les variables manquantes dans votre fichier `.env`.

#### 2. "Fichier de configuration non trouvé"
```
⚠️  Fichier de configuration non trouvé: .env
```

**Solution :** Créez le fichier `.env` avec :
```bash
node scripts/load-env.js development create
```

#### 3. "Erreur de validation Firebase"
```
Firebase: Error (auth/invalid-api-key)
```

**Solution :** Vérifiez que votre `FIREBASE_API_KEY` est correcte.

### Validation manuelle

Vous pouvez valider manuellement votre configuration :

```javascript
const { validateConfig, getConfig } = require('./config/environment');

// Valider la configuration
const isValid = validateConfig();
console.log('Configuration valide:', isValid);

// Obtenir une valeur spécifique
const apiKey = getConfig('firebase.apiKey');
console.log('API Key:', apiKey);
```

## 📚 Ressources supplémentaires

- [Firebase Configuration](https://firebase.google.com/docs/web/setup)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [AWS SDK Documentation](https://docs.aws.amazon.com/sdk-for-javascript/)

## 🤝 Support

Si vous rencontrez des problèmes avec la configuration :

1. Vérifiez que toutes les variables requises sont définies
2. Validez vos clés API avec les fournisseurs respectifs
3. Consultez les logs d'erreur pour plus de détails
4. Contactez l'équipe de développement si le problème persiste 