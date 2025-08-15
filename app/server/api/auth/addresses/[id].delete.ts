import { requireAuth, createSuccessResponse, createErrorResponse } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        const currentUser = requireAuth(event)
        const addressId = parseInt(getRouterParam(event, 'id') || '0')

        if (!addressId) {
            return createErrorResponse('ID d\'adresse invalide', null, 400)
        }

        // Trouver l'adresse
        const addressIndex = global.addresses.findIndex(
            addr => addr.id === addressId && addr.userId === currentUser.id
        )

        if (addressIndex === -1) {
            return createErrorResponse('Adresse non trouvée', null, 404)
        }

        const addressToDelete = global.addresses[addressIndex]

        // Vérification supplémentaire pour TypeScript
        if (!addressToDelete) {
            return createErrorResponse('Adresse non trouvée', null, 404)
        }

        // Gérer l'adresse par défaut
        const userAddresses = global.addresses.filter(addr => addr.userId === currentUser.id)
        if (addressToDelete.isDefault && userAddresses.length > 1) {
            const otherAddress = userAddresses.find(addr => addr.id !== addressId)
            if (otherAddress) {
                otherAddress.isDefault = true
            }
        }

        // Supprimer l'adresse
        global.addresses.splice(addressIndex, 1)

        return createSuccessResponse(null, 'Adresse supprimée avec succès')

    } catch (error: any) {
        if (error.statusCode === 401 || error.statusCode === 403) {
            throw error
        }
        return createErrorResponse('Erreur interne du serveur', null, 500)
    }
})