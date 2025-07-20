// Configuration Firebase pour le projet IA Conseil
// Remplacez ces valeurs par celles de votre projet Firebase

const firebaseConfig = {
    apiKey: "AIzaSyBCrGYX3GUH8CZaMqfmYSSvZZ2s3TEaK9c",
    authDomain: "optimiz-africa.firebaseapp.com",
    projectId: "optimiz-africa",
    storageBucket: "optimiz-africa.firebasestorage.app",
    messagingSenderId: "1098044012759",
    appId: "1:1098044012759:web:87122767cd2f1751dcd892"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Exporter les services Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Configuration des providers d'authentification
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Fonctions utilitaires pour l'authentification
const authUtils = {
    // Connexion avec email/mot de passe
    signInWithEmail: async (email, password) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Inscription avec email/mot de passe
    signUpWithEmail: async (email, password, displayName) => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            
            // Mettre à jour le profil utilisateur
            await userCredential.user.updateProfile({
                displayName: displayName
            });

            // Créer un document utilisateur dans Firestore
            await db.collection('users').doc(userCredential.user.uid).set({
                email: email,
                displayName: displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                role: 'user',
                preferences: {
                    theme: 'light',
                    notifications: true
                }
            });

            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Connexion avec Google
    signInWithGoogle: async () => {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            
            // Vérifier si c'est un nouvel utilisateur
            if (result.additionalUserInfo.isNewUser) {
                // Créer un document utilisateur dans Firestore
                await db.collection('users').doc(result.user.uid).set({
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    role: 'user',
                    preferences: {
                        theme: 'light',
                        notifications: true
                    }
                });
            }

            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Déconnexion
    signOut: async () => {
        try {
            await auth.signOut();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Réinitialisation du mot de passe
    resetPassword: async (email) => {
        try {
            await auth.sendPasswordResetEmail(email);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Obtenir l'utilisateur actuel
    getCurrentUser: () => {
        return auth.currentUser;
    },

    // Écouter les changements d'état d'authentification
    onAuthStateChanged: (callback) => {
        return auth.onAuthStateChanged(callback);
    }
};

// Exporter les utilitaires
window.authUtils = authUtils;
window.firebaseConfig = firebaseConfig; 