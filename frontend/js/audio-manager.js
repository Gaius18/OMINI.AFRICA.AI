/**
 * Gestionnaire Audio Simple
 * Pour la synthèse vocale des réponses agricoles
 */

class AudioManager {
    constructor() {
        this.speechSynthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.isSpeaking = false;
    }

    // Parler un texte
    speak(text) {
        // Arrêter la lecture en cours
        this.stop();

        // Nettoyer le texte (enlever les emojis et ponctuation excessive)
        const cleanText = this.cleanText(text);

        // Créer l'énonciation
        this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
        
        // Configuration de la voix pour un son plus naturel
        this.currentUtterance.lang = 'fr-FR';
        this.currentUtterance.rate = 0.85; // Vitesse plus naturelle
        this.currentUtterance.pitch = 1.1; // Ton légèrement plus chaleureux
        this.currentUtterance.volume = 1.0;

        // Événements
        this.currentUtterance.onstart = () => {
            this.isSpeaking = true;
            this.updateUI();
        };

        this.currentUtterance.onend = () => {
            this.isSpeaking = false;
            this.updateUI();
            // Masquer automatiquement tous les boutons stop
            const stopButtons = document.querySelectorAll('.stop-audio-btn');
            stopButtons.forEach(btn => btn.style.display = 'none');
        };

        this.currentUtterance.onerror = (event) => {
            console.error('Erreur audio:', event.error);
            this.isSpeaking = false;
            this.updateUI();
        };

        // Démarrer la lecture
        this.speechSynthesis.speak(this.currentUtterance);
    }

    // Arrêter la lecture
    stop() {
        if (this.speechSynthesis.speaking) {
            this.speechSynthesis.cancel();
        }
        this.isSpeaking = false;
        this.updateUI();
    }

    // Nettoyer le texte pour la lecture naturelle
    cleanText(text) {
        return text
            // Enlever les emojis
            .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
            // Enlever les marqueurs de formatage
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/`/g, '')
            .replace(/#{1,6}\s/g, '')
            // Remplacer les ponctuations par des pauses naturelles
            .replace(/[!]{2,}/g, '.')
            .replace(/[?]{2,}/g, '?')
            .replace(/[.]{2,}/g, '.')
            // Remplacer les listes par des phrases fluides
            .replace(/\n•\s*/g, '. ')
            .replace(/\n\d+\.\s*/g, '. ')
            // Remplacer les sauts de ligne par des pauses
            .replace(/\n\n/g, '. ')
            .replace(/\n/g, '. ')
            // Nettoyer les espaces multiples
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Mettre à jour l'interface utilisateur
    updateUI() {
        const audioToggle = document.getElementById('audioToggle');
        const stopAudio = document.getElementById('stopAudio');

        if (this.isSpeaking) {
            if (stopAudio) stopAudio.classList.remove('hidden');
            if (audioToggle) audioToggle.classList.add('hidden');
        } else {
            if (stopAudio) stopAudio.classList.add('hidden');
            if (audioToggle) audioToggle.classList.remove('hidden');
        }
    }

    // Vérifier si l'audio est supporté
    isSupported() {
        return 'speechSynthesis' in window;
    }

    // Obtenir les voix disponibles
    getVoices() {
        return new Promise((resolve) => {
            let voices = this.speechSynthesis.getVoices();
            
            if (voices.length > 0) {
                resolve(voices);
            } else {
                this.speechSynthesis.onvoiceschanged = () => {
                    voices = this.speechSynthesis.getVoices();
                    resolve(voices);
                };
            }
        });
    }

    // Définir une voix spécifique
    setVoice(voiceName) {
        this.getVoices().then(voices => {
            const voice = voices.find(v => v.name === voiceName);
            if (voice) {
                this.currentVoice = voice;
            }
        });
    }
}

// Export pour utilisation globale
window.AudioManager = AudioManager; 