import { extractTokenFromHeader, verifyToken } from '~/server/utils/jwt'
import { blacklistToken, createSuccessResponse, createErrorResponse } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        const authHeader = getHeader(event, 'authorization')
        const token = extractTokenFromHeader(authHeader)

        if (!token) {
            return createErrorResponse('Token d\'authentification requis', null, 401)
        }

        // Vérifier que le token est valide avant de le blacklister
        const payload = verifyToken(token)
        if (!payload) {
            return createErrorResponse('Token invalide', null, 401)
        }

        // Ajouter le token à la blacklist
        blacklistToken(token)

        return createSuccessResponse(null, 'Déconnexion réussie')

    } catch (error: any) {
        console.error('Erreur lors de la déconnexion:', error)
        return createErrorResponse('Erreur interne du serveur', null, 500)
    }
})