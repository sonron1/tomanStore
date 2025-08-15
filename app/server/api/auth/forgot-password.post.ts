import { isValidEmail } from '~/server/utils/validation'
import { findUserByEmail, createSuccessResponse, createErrorResponse } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { email } = body

        // Validation de l'email
        if (!email?.trim()) {
            return createErrorResponse('L\'adresse email est requise', null, 400)
        }

        if (!isValidEmail(email)) {
            return createErrorResponse('Format d\'email invalide', null, 400)
        }

        // Vérifier si l'utilisateur existe (pour la sécurité, on ne révèle pas s'il existe)
        const user = findUserByEmail(email)

        // Simuler l'envoi d'email (à remplacer par un vrai service d'email)
        if (user) {
            // Ici vous intégreriez un service d'email comme SendGrid, Nodemailer, etc.
            console.log(`Email de réinitialisation envoyé à: ${email}`)

            // TODO: Générer un token de réinitialisation et l'envoyer par email
            // const resetToken = generateResetToken(user.id)
            // await sendResetEmail(email, resetToken)
        }

        // Toujours retourner succès pour des raisons de sécurité
        return createSuccessResponse(null, 'Si un compte avec cette adresse existe, vous recevrez un email de réinitialisation')

    } catch (error: any) {
        console.error('Erreur lors de la demande de réinitialisation:', error)
        return createErrorResponse('Erreur interne du serveur', null, 500)
    }
})