import { createTestUsers } from '~/server/utils/auth'

export default defineNitroPlugin(async (nitroApp) => {
    // Initialiser les utilisateurs de test au démarrage du serveur
    createTestUsers()

    console.log('🚀 Base de données initialisée')
    console.log('👤 Utilisateur de test disponible: test@tomanstore.com / test123')
})