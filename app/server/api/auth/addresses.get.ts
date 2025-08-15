// Remplacer tout le contenu par :
import { requireAuth, createSuccessResponse, createErrorResponse } from '~/server/utils/auth'
import type { Address } from '~/types/auth'

// Utilise la base de données globale
declare global {
    var addresses: Address[]
}

if (!global.addresses) {
    global.addresses = []
}

export default defineEventHandler(async (event) => {
    try {
        const currentUser = requireAuth(event)

        // Récupérer les adresses de l'utilisateur
        const userAddresses = global.addresses
            .filter(address => address.userId === currentUser.id)
            .sort((a, b) => {
                // Adresse par défaut en premier
                if (a.isDefault && !b.isDefault) return -1
                if (!a.isDefault && b.isDefault) return 1
                // Puis par date de création
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })

        return createSuccessResponse({
            addresses: userAddresses
        }, 'Adresses récupérées avec succès')

    } catch (error: any) {
        if (error.statusCode === 401 || error.statusCode === 403) {
            throw error
        }
        return createErrorResponse('Erreur interne du serveur', null, 500)
    }
})