
// Utiliser la base de données globale partagée
declare global {
    var users: any[]
}

// Initialiser la base de données globale si elle n'existe pas
if (!global.users) {
    global.users = []
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        console.log('📧 Données reçues:', body)

        // Validation simple
        if (!body.firstName || !body.lastName || !body.email || !body.password) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Données manquantes',
                data: {
                    success: false,
                    message: 'Tous les champs obligatoires doivent être renseignés'
                }
            })
        }

        if (!body.acceptTerms) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Conditions non acceptées',
                data: {
                    success: false,
                    message: 'Vous devez accepter les conditions d\'utilisation'
                }
            })
        }

        // Vérifier si l'utilisateur existe déjà dans la base globale
        const existingUser = global.users.find(u => u.email.toLowerCase() === body.email.toLowerCase())
        if (existingUser) {
            throw createError({
                statusCode: 409,
                statusMessage: 'Utilisateur existant',
                data: {
                    success: false,
                    message: 'Un compte avec cet email existe déjà'
                }
            })
        }

        // Créer l'utilisateur (version simple, mot de passe en clair pour le test)
        const newUser = {
            id: Date.now(),
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email.toLowerCase(),
            phone: body.phone || null,
            password: body.password, // Attention: en clair pour le test uniquement !
            role: 'user',
            emailVerified: false,
            avatar: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        // Stocker l'utilisateur dans la base globale
        global.users.push(newUser)

        // Générer des tokens simples
        const token = 'test-token-' + newUser.id + '-' + Date.now()
        const refreshToken = 'test-refresh-' + newUser.id + '-' + Date.now()

        // Retourner la réponse (sans le mot de passe)
        const { password: _, ...userResponse } = newUser

        console.log('✅ Utilisateur créé:', userResponse)
        console.log('👥 Total utilisateurs:', global.users.length)

        return {
            success: true,
            message: 'Compte créé avec succès',
            data: {
                user: userResponse,
                token,
                refreshToken
            }
        }

    } catch (error: any) {
        console.error('❌ Erreur dans register.post.ts:', error)

        // Si c'est une erreur qu'on a créée avec createError, la relancer
        if (error.statusCode) {
            throw error
        }

        // Sinon, créer une erreur générique
        throw createError({
            statusCode: 500,
            statusMessage: 'Erreur interne du serveur',
            data: {
                success: false,
                message: 'Une erreur inattendue s\'est produite'
            }
        })
    }
})