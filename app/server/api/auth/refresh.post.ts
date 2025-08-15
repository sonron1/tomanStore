import { verifyRefreshToken, generateTokens } from '~/server/utils/jwt'
import { findUserById, createSuccessResponse, createErrorResponse } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { refreshToken } = body

        if (!refreshToken) {
            return createErrorResponse('Refresh token requis', null, 401)
        }

        // Vérifier le refresh token
        const payload = verifyRefreshToken(refreshToken)
        if (!payload) {
            return createErrorResponse('Refresh token invalide ou expiré', null, 401)
        }

        // Vérifier que l'utilisateur existe toujours
        const user = findUserById(payload.userId)
        if (!user) {
            return createErrorResponse('Utilisateur non trouvé', null, 401)
        }

        // Générer de nouveaux tokens
        const tokens = generateTokens(user.id, user.email, user.role)

        // Retourner les données utilisateur (sans le mot de passe)
        const { password: _, ...userWithoutPassword } = user

        return createSuccessResponse({
            user: userWithoutPassword,
            token: tokens.token,
            refreshToken: tokens.refreshToken
        }, 'Tokens rafraîchis avec succès')

    } catch (error: any) {
        console.error('Erreur lors du rafraîchissement des tokens:', error)
        return createErrorResponse('Erreur interne du serveur', null, 500)
    }
})