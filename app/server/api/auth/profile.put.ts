import { requireAuth, updateUser, createSuccessResponse, createErrorResponse } from '~/server/utils/auth'
import { sanitizeUserInput, isValidPhone } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
    try {
        // Vérifier l'authentification
        const currentUser = requireAuth(event)

        const body = await readBody(event)
        const { firstName, lastName, phone, avatar } = body

        // Validation des données
        const errors: Record<string, string> = {}

        if (firstName !== undefined) {
            if (!firstName?.trim()) {
                errors.firstName = 'Le prénom ne peut pas être vide'
            }
        }

        if (lastName !== undefined) {
            if (!lastName?.trim()) {
                errors.lastName = 'Le nom ne peut pas être vide'
            }
        }

        if (phone !== undefined && phone !== null && phone !== '') {
            if (!isValidPhone(phone)) {
                errors.phone = 'Format de téléphone invalide'
            }
        }

        if (Object.keys(errors).length > 0) {
            return createErrorResponse('Données invalides', errors, 422)
        }

        // Préparer les données à mettre à jour
        const updateData: any = {}

        if (firstName !== undefined) {
            updateData.firstName = sanitizeUserInput(firstName)
        }

        if (lastName !== undefined) {
            updateData.lastName = sanitizeUserInput(lastName)
        }

        if (phone !== undefined) {
            updateData.phone = phone ? sanitizeUserInput(phone) : undefined
        }

        if (avatar !== undefined) {
            updateData.avatar = avatar || undefined
        }

        // Mettre à jour l'utilisateur
        const updatedUser = updateUser(currentUser.id, updateData)

        if (!updatedUser) {
            return createErrorResponse('Utilisateur non trouvé', null, 404)
        }

        // Retourner les données utilisateur mises à jour (sans le mot de passe)
        const { password: _, ...userWithoutPassword } = updatedUser

        return createSuccessResponse({
            user: userWithoutPassword
        }, 'Profil mis à jour avec succès')

    } catch (error: any) {
        console.error('Erreur lors de la mise à jour du profil:', error)

        // Si c'est une erreur d'authentification, la relancer
        if (error.statusCode === 401 || error.statusCode === 403) {
            throw error
        }

        return createErrorResponse('Erreur interne du serveur', null, 500)
    }
})