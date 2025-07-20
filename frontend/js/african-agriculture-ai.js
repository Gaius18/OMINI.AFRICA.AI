/**
 * IA Agricole Africaine - Simple et Pratique
 * Objectif : Aider les agriculteurs africains avec des conseils simples
 */

class AfricanAgricultureAI {
    constructor() {
        this.knowledgeBase = this.initializeKnowledgeBase();
    }

    // Base de connaissances agricoles simples
    initializeKnowledgeBase() {
        return {
            // Cultures principales
            cultures: {
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
                },
                'tomate': {
                    plantation: 'Plantez les tomates en saison sèche',
                    entretien: 'Arrosez tous les jours et tuteurez',
                    récolte: 'Récoltez quand les tomates sont rouges',
                    problèmes: 'Attention aux maladies fongiques'
                },
                'piment': {
                    plantation: 'Plantez les piments en saison sèche',
                    entretien: 'Arrosez modérément et désherbez',
                    récolte: 'Récoltez quand les piments sont mûrs',
                    problèmes: 'Attention aux insectes piqueurs'
                }
            },

            // Conseils généraux
            conseils: {
                saison_pluie: 'En saison des pluies, plantez les cultures qui aiment l\'eau',
                saison_seche: 'En saison sèche, utilisez l\'irrigation ou plantez des cultures résistantes',
                fertilisation: 'Utilisez du compost naturel pour enrichir le sol',
                rotation: 'Changez de culture chaque année pour éviter les maladies',
                conservation: 'Conservez les récoltes dans un endroit sec et aéré'
            },

            // Problèmes courants et solutions
            problemes: {
                secheresse: 'En cas de sécheresse, arrosez tôt le matin ou tard le soir',
                inondation: 'En cas d\'inondation, drainez les champs',
                insectes: 'Utilisez des pesticides naturels (neem, cendre)',
                maladies: 'Enlevez les plantes malades et brûlez-les',
                oiseaux: 'Utilisez des épouvantails ou des filets'
            }
        };
    }

    // Générer une réponse agricole simple
    generateResponse(userQuestion) {
        const question = userQuestion.toLowerCase();
        let response = '';

        // Détecter le type de question
        if (question.includes('maïs') || question.includes('corn')) {
            response = this.getCropAdvice('maïs');
        } else if (question.includes('riz') || question.includes('rice')) {
            response = this.getCropAdvice('riz');
        } else if (question.includes('manioc') || question.includes('cassava')) {
            response = this.getCropAdvice('manioc');
        } else if (question.includes('igname') || question.includes('yam')) {
            response = this.getCropAdvice('igname');
        } else if (question.includes('tomate') || question.includes('tomato')) {
            response = this.getCropAdvice('tomate');
        } else if (question.includes('piment') || question.includes('pepper')) {
            response = this.getCropAdvice('piment');
        } else if (question.includes('saison') || question.includes('season')) {
            response = this.getSeasonalAdvice();
        } else if (question.includes('problème') || question.includes('maladie') || question.includes('insecte')) {
            response = this.getProblemSolution();
        } else if (question.includes('conseil') || question.includes('aide')) {
            response = this.getGeneralAdvice();
        } else {
            response = this.getDefaultResponse();
        }

        return response;
    }

    // Conseils pour une culture spécifique
    getCropAdvice(crop) {
        const cropData = this.knowledgeBase.cultures[crop];
        if (!cropData) return 'Je ne connais pas cette culture.';

        return `Conseils pour ${crop}:
• Plantation: ${cropData.plantation}
• Entretien: ${cropData.entretien}
• Récolte: ${cropData.récolte}
• Problèmes: ${cropData.problèmes}`;
    }

    // Conseils saisonniers
    getSeasonalAdvice() {
        const now = new Date();
        const month = now.getMonth();
        
        if (month >= 3 && month <= 10) { // Saison des pluies
            return `Saison des pluies: ${this.knowledgeBase.conseils.saison_pluie}`;
        } else { // Saison sèche
            return `Saison sèche: ${this.knowledgeBase.conseils.saison_seche}`;
        }
    }

    // Solutions aux problèmes
    getProblemSolution() {
        const problemes = this.knowledgeBase.problemes;
        
        return `Solutions aux problèmes courants:
• Sécheresse: ${problemes.secheresse}
• Inondation: ${problemes.inondation}
• Insectes: ${problemes.insectes}
• Maladies: ${problemes.maladies}
• Oiseaux: ${problemes.oiseaux}`;
    }

    // Conseils généraux
    getGeneralAdvice() {
        const conseils = this.knowledgeBase.conseils;
        
        return `Conseils généraux d'agriculture:
• Fertilisation: ${conseils.fertilisation}
• Rotation: ${conseils.rotation}
• Conservation: ${conseils.conservation}`;
    }

    // Réponse par défaut
    getDefaultResponse() {
        return 'Je suis votre assistant agricole africain. Posez-moi des questions sur le maïs, riz, manioc, igname, tomate, piment, ou demandez des conseils généraux.';
    }

    // Traiter une question complète
    processQuestion(question) {
        const response = this.generateResponse(question);
        
        return {
            question: question,
            response: response,
            timestamp: new Date().toISOString()
        };
    }
}

// Export pour utilisation globale
window.AfricanAgricultureAI = AfricanAgricultureAI; 