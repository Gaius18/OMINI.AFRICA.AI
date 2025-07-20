// Configuration Firebase
class FirebaseManager {
    constructor() {
        this.db = null;
        this.auth = null;
        this.currentUser = null;
        this.isInitialized = false;
    }

    // Initialiser Firebase
    async initialize() {
        try {
            // Configuration Firebase (à remplacer par vos vraies clés)
            const firebaseConfig = {
                apiKey: "votre-api-key",
                authDomain: "omni-africa-ai.firebaseapp.com",
                projectId: "omni-africa-ai",
                storageBucket: "omni-africa-ai.appspot.com",
                messagingSenderId: "123456789",
                appId: "votre-app-id"
            };

            // Initialiser Firebase
            firebase.initializeApp(firebaseConfig);
            
            this.db = firebase.firestore();
            this.auth = firebase.auth();
            
            // Écouter les changements d'authentification
            this.auth.onAuthStateChanged((user) => {
                this.currentUser = user;
                if (user) {
                    console.log('✅ Utilisateur connecté:', user.email);
                    this.loadUserData();
                    // Rediriger vers la page agricole si on est sur la page de login
                    if (window.location.pathname.includes('login.html') || window.location.pathname.includes('login-demo.html')) {
                        window.location.href = 'http://localhost:8080/frontend/pages/agriculture-ai.html';
                    }
                } else {
                    console.log('❌ Utilisateur déconnecté Firebase');
                    // Ne pas rediriger automatiquement - permettre l'utilisation en mode demo
                    // La redirection se fera seulement si l'utilisateur clique sur déconnexion
                }
            });

            this.isInitialized = true;
            console.log('✅ Firebase initialisé');
            
        } catch (error) {
            console.error('❌ Erreur initialisation Firebase:', error);
            throw error;
        }
    }

    // Connexion utilisateur
    async signIn(email, password) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            this.currentUser = userCredential.user;
            return { success: true, user: this.currentUser };
        } catch (error) {
            console.error('❌ Erreur connexion:', error);
            return { success: false, error: error.message };
        }
    }

    // Inscription utilisateur
    async signUp(email, password, displayName) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({
                displayName: displayName
            });
            this.currentUser = userCredential.user;
            return { success: true, user: this.currentUser };
        } catch (error) {
            console.error('❌ Erreur inscription:', error);
            return { success: false, error: error.message };
        }
    }

    // Déconnexion
    async signOut() {
        try {
            await this.auth.signOut();
            this.currentUser = null;
            return { success: true };
        } catch (error) {
            console.error('❌ Erreur déconnexion:', error);
            return { success: false, error: error.message };
        }
    }

    // Sauvegarder les conversations
    async saveConversations(conversations, folders) {
        if (!this.currentUser) return { success: false, error: 'Utilisateur non connecté' };

        try {
            const userRef = this.db.collection('users').doc(this.currentUser.uid);
            
            await userRef.set({
                email: this.currentUser.email,
                displayName: this.currentUser.displayName,
                lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Sauvegarder les conversations
            const conversationsRef = userRef.collection('conversations');
            const batch = this.db.batch();

            // Supprimer les anciennes conversations
            const oldConversations = await conversationsRef.get();
            oldConversations.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            // Ajouter les nouvelles conversations
            conversations.forEach(conv => {
                const docRef = conversationsRef.doc(conv.id);
                batch.set(docRef, {
                    ...conv,
                    timestamp: firebase.firestore.Timestamp.fromDate(conv.timestamp)
                });
            });

            // Sauvegarder les dossiers
            await userRef.collection('folders').doc('user_folders').set({
                folders: folders,
                lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
            });

            await batch.commit();
            return { success: true };
        } catch (error) {
            console.error('❌ Erreur sauvegarde Firebase:', error);
            return { success: false, error: error.message };
        }
    }

    // Charger les conversations
    async loadConversations() {
        if (!this.currentUser) return { success: false, error: 'Utilisateur non connecté' };

        try {
            const userRef = this.db.collection('users').doc(this.currentUser.uid);
            
            // Charger les conversations
            const conversationsSnapshot = await userRef.collection('conversations').get();
            const conversations = [];
            
            conversationsSnapshot.docs.forEach(doc => {
                const data = doc.data();
                conversations.push({
                    ...data,
                    timestamp: data.timestamp.toDate()
                });
            });

            // Charger les dossiers
            const foldersDoc = await userRef.collection('folders').doc('user_folders').get();
            const folders = foldersDoc.exists ? foldersDoc.data().folders : [];

            return { 
                success: true, 
                conversations: conversations,
                folders: folders
            };
        } catch (error) {
            console.error('❌ Erreur chargement Firebase:', error);
            return { success: false, error: error.message };
        }
    }

    // Charger les données utilisateur
    async loadUserData() {
        if (!this.currentUser) return;

        try {
            const result = await this.loadConversations();
            if (result.success) {
                // Émettre un événement pour notifier l'application
                window.dispatchEvent(new CustomEvent('firebaseDataLoaded', {
                    detail: {
                        conversations: result.conversations,
                        folders: result.folders
                    }
                }));
            }
        } catch (error) {
            console.error('❌ Erreur chargement données utilisateur:', error);
        }
    }

    // Vérifier si l'utilisateur est connecté
    isUserLoggedIn() {
        return this.currentUser !== null;
    }

    // Obtenir les informations utilisateur
    getUserInfo() {
        if (!this.currentUser) return null;
        
        return {
            uid: this.currentUser.uid,
            email: this.currentUser.email,
            displayName: this.currentUser.displayName
        };
    }
}

// Instance globale
window.firebaseManager = new FirebaseManager(); 