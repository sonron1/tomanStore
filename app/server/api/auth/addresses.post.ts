import { requireAuth, createSuccessResponse, createErrorResponse } from '~/server/utils/auth'
import { isValidPhone, sanitizeUserInput } from '~/server/utils/validation'
import type { Address } from '~/types/auth'

// Base de données simulée globale pour les adresses
declare global {
    var addresses: Address[]
    var nextAddressId: number
}

if (!global.addresses) {
    global.addresses = []
    global.nextAddressId = 1
}

export default defineEventHandler(async (event) => {
    try {
        const currentUser = requireAuth(event)
        const body = await readBody(event)

        // Validation des données
        const errors: Record<string, string> = {}

        if (!body.title?.trim()) {
            errors.title = 'Le nom de l\'adresse est requis'
        }

        if (!body.type || !['home', 'work', 'other'].includes(body.type)) {
            errors.type = 'Type d\'adresse invalide'
        }

        if (!body.firstName?.trim()) {
            errors.firstName = 'Le prénom est requis'
        }

        if (!body.lastName?.trim()) {
            errors.lastName = 'Le nom est requis'
        }

        if (!body.address?.trim()) {
            errors.address = 'L\'adresse est requise'
        }

        if (!body.city?.trim()) {
            errors.city = 'La ville est requise'
        }

        if (!body.country?.trim()) {
            errors.country = 'Le pays est requis'
        }

        if (body.phone && !isValidPhone(body.phone)) {
            errors.phone = 'Format de téléphone invalide'
        }

        if (Object.keys(errors).length > 0) {
            return createErrorResponse('Données invalides', errors, 422)
        }

        // Si cette adresse est définie par défaut, retirer le défaut des autres
        if (body.isDefault) {
            global.addresses.forEach(addr => {
                if (addr.userId === currentUser.id) {
                    addr.isDefault = false
                }
            })
        }

        // Créer la nouvelle adresse
        const newAddress: Address = {
            id: global.nextAddressId++,
            userId: currentUser.id,
            type: body.type,
            title: sanitizeUserInput(body.title),
            firstName: sanitizeUserInput(body.firstName),
            lastName: sanitizeUserInput(body.lastName),
            address: sanitizeUserInput(body.address),
            city: sanitizeUserInput(body.city),
            postalCode: body.postalCode ? sanitizeUserInput(body.postalCode) : '',
            country: sanitizeUserInput(body.country),
            phone: body.phone ? sanitizeUserInput(body.phone) : undefined,
            isDefault: body.isDefault || false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        // Si c'est la première adresse, la mettre par défaut
        const userAddresses = global.addresses.filter(addr => addr.userId === currentUser.id)
        if (userAddresses.length === 0) {
            newAddress.isDefault = true
        }

        global.addresses.push(newAddress)

        return createSuccessResponse({ address: newAddress }, 'Adresse ajoutée avec succès')

    } catch (error: any) {
        console.error('Erreur lors de l\'ajout de l\'adresse:', error)

        if (error.statusCode === 401 || error.statusCode === 403) {
            throw error
        }

        return createErrorResponse('Erreur interne du serveur', null, 500)
    }
})