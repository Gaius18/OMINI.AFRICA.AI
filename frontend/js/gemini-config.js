/**
 * Configuration Gemini API pour OMNI_OPTIMIZ_AFRIC.IA
 * Gestion des appels API avec fallback et gestion d'erreurs
 */

class GeminiConfig {
    constructor() {
        this.apiKey = null;
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
        this.isOnline = navigator.onLine;
        this.fallbackAI = null;
        this.init();
    }

    async init() {
        try {
            // Charger la configuration depuis config.env
            const response = await fetch('/config.env');
            const configText = await response.text();
            const config = this.parseConfig(configText);
            this.apiKey = config.GEMINI_API_KEY;
            
            console.log('✅ Configuration Gemini chargée');
        } catch (error) {
            console.error('❌ Erreur chargement config:', error);
        }

        // Écouter les changements de connexion
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('🌐 Connexion internet rétablie');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('📴 Connexion internet perdue');
        });
    }

    parseConfig(configText) {
        const config = {};
        const lines = configText.split('\n');
        
        for (const line of lines) {
            const [key, value] = line.split('=');
            if (key && value) {
                config[key.trim()] = value.trim();
            }
        }
        
        return config;
    }

    async generateResponse(prompt, context = '') {
        if (!this.isOnline) {
            return this.getOfflineResponse(prompt);
        }

        if (!this.apiKey) {
            console.warn('⚠️ Clé API Gemini manquante');
            return this.getOfflineResponse(prompt);
        }

        try {
            const response = await this.callGeminiAPI(prompt, context);
            return response;
        } catch (error) {
            console.error('❌ Erreur Gemini API:', error);
            return this.getOfflineResponse(prompt);
        }
    }

    async callGeminiAPI(prompt, context = '') {
        const fullPrompt = context ? `${context}\n\nQuestion: ${prompt}` : prompt;
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: fullPrompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024
            }
        };

        const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Réponse invalide de l\'API Gemini');
        }
    }

    getOfflineResponse(prompt) {
        const question = prompt.toLowerCase();
        
        // Base de connaissances agricoles africaines
        const knowledgeBase = {
            'maïs': {
                plantation: 'Plantez le maïs en saison des pluies, espacé de 25cm',
                entretien: 'Arrosez régulièrement et désherbez',
                récolte: 'Récoltez quand les grains sont durs',
                problèmes: 'Attention aux oiseaux et aux insectes'
            },
            'riz': {
                plantation: 'Plantez le riz dans des champs inondés',
                entretien: 'Maintenez l\'eau à 5cm de hauteur',
                récolte: 'Récoltez quand les grains sont jaunes',
                problèmes: 'Attention aux maladies du riz'
            },
            'manioc': {
                plantation: 'Plantez les boutures de manioc en lignes',
                entretien: 'Désherbez régulièrement',
                récolte: 'Récoltez après 8-12 mois',
                problèmes: 'Attention aux maladies virales'
            },
            'igname': {
                plantation: 'Plantez les tubercules d\'igname en buttes',
                entretien: 'Tuteurez les tiges grimpantes',
                récolte: 'Récoltez après 6-8 mois',
                problèmes: 'Attention aux nématodes'
            }
        };

        // Détecter le type de question
        for (const [crop, info] of Object.entries(knowledgeBase)) {
            if (question.includes(crop)) {
                return `Conseils pour ${crop}:
• Plantation: ${info.plantation}
• Entretien: ${info.entretien}
• Récolte: ${info.récolte}
• Problèmes: ${info.problèmes}`;
            }
        }

        if (question.includes('saison')) {
            return 'En saison des pluies, plantez les cultures qui aiment l\'eau. En saison sèche, utilisez l\'irrigation.';
        }

        if (question.includes('problème') || question.includes('maladie')) {
            return 'Pour les problèmes agricoles : utilisez des pesticides naturels (neem, cendre), enlevez les plantes malades, et utilisez la rotation des cultures.';
        }

        return 'Je suis votre assistant agricole africain. Posez-moi des questions sur le maïs, riz, manioc, igname, ou demandez des conseils généraux.';
    }

    setFallbackAI(fallbackAI) {
        this.fallbackAI = fallbackAI;
    }

    getStatus() {
        return {
            isOnline: this.isOnline,
            hasApiKey: !!this.apiKey,
            baseUrl: this.baseUrl
        };
    }
}

// Export pour utilisation globale
window.GeminiConfig = GeminiConfig; 