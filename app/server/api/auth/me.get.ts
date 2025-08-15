import { requireAuth, createSuccessResponse, createErrorResponse } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        // Vérifier l'authentification et récupérer l'utilisateur
        const user = requireAuth(event)

        // Retourner les données utilisateur (sans le mot de passe)
        const { password: _, ...userWithoutPassword } = user

        return createSuccessResponse({
            user: userWithoutPassword
        })

    } catch (error: any) {
        console.error('Erreur lors de la récupération des données utilisateur:', error)

        // Si c'est une erreur d'authentification, la relancer
        if (error.statusCode === 401 || error.statusCode === 403) {
            throw error
        }

        return createErrorResponse('Erreur interne du serveur', null, 500)
    }
})