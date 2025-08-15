import { requireAuth, createSuccessResponse, createErrorResponse } from '~/server/utils/auth'
import { isValidPhone, sanitizeUserInput } from '~/server/utils/validation'
import type { Address } from '~/types/auth'

// Utilise la base de données globale
declare global {
    var addresses: Address[]
}

export default defineEventHandler(async (event) => {
    try {
        const currentUser = requireAuth(event)
        const addressId = parseInt(getRouterParam(event, 'id') || '0')
        const body = await readBody(event)

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

        // Validation des données (similaire à POST)
        const errors: Record<string, string> = {}

        if (body.title !== undefined && !body.title?.trim()) {
            errors.title = 'Le nom de l\'adresse est requis'
        }

        // ... autres validations

        if (Object.keys(errors).length > 0) {
            return createErrorResponse('Données invalides', errors, 422)
        }

        // Si cette adresse devient par défaut, retirer le défaut des autres
        if (body.isDefault) {
            global.addresses.forEach(addr => {
                if (addr.userId === currentUser.id && addr.id !== addressId) {
                    addr.isDefault = false
                }
            })
        }

        // Mettre à jour l'adresse
        const currentAddress = global.addresses[addressIndex]
        const updatedAddress: Address = {
            ...currentAddress,
            ...(body.type && { type: body.type }),
            ...(body.title && { title: sanitizeUserInput(body.title) }),
            // ... autres champs
            updatedAt: new Date().toISOString()
        }

        global.addresses[addressIndex] = updatedAddress

        return createSuccessResponse({ address: updatedAddress }, 'Adresse modifiée avec succès')

    } catch (error: any) {
        if (error.statusCode === 401 || error.statusCode === 403) {
            throw error
        }
        return createErrorResponse('Erreur interne du serveur', null, 500)
    }
})