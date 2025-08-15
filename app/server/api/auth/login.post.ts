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
        console.log('🔑 Tentative de connexion:', { email: body.email })
        console.log('👥 Utilisateurs dans la base:', global.users.length)

        // Validation simple
        if (!body.email || !body.password) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Données manquantes',
                data: {
                    success: false,
                    message: 'Email et mot de passe requis'
                }
            })
        }

        // Chercher l'utilisateur dans la base globale
        const user = global.users.find(u => u.email.toLowerCase() === body.email.toLowerCase())
        console.log('🔍 Utilisateur trouvé:', user ? 'OUI' : 'NON')

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Identifiants invalides',
                data: {
                    success: false,
                    message: 'Email ou mot de passe incorrect'
                }
            })
        }

        // Vérifier le mot de passe (en clair pour le test)
        if (user.password !== body.password) {
            console.log('🔐 Mot de passe incorrect pour:', user.email)
            throw createError({
                statusCode: 401,
                statusMessage: 'Identifiants invalides',
                data: {
                    success: false,
                    message: 'Email ou mot de passe incorrect'
                }
            })
        }

        // Générer des tokens
        const token = 'login-token-' + user.id + '-' + Date.now()
        const refreshToken = 'login-refresh-' + user.id + '-' + Date.now()

        // Retourner la réponse (sans le mot de passe)
        const { password: _, ...userResponse } = user

        console.log('✅ Connexion réussie pour:', user.email)

        return {
            success: true,
            message: 'Connexion réussie',
            data: {
                user: userResponse,
                token,
                refreshToken
            }
        }

    } catch (error: any) {
        console.error('❌ Erreur dans login.post.ts:', error)

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