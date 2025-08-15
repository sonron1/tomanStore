import type { User } from '~/types/auth'
import { verifyToken, extractTokenFromHeader } from './jwt'

// Type pour les utilisateurs avec mot de passe
type UserWithPassword = User & { password?: string }

// Utiliser la base de données globale partagée (comme dans les API)
declare global {
    var users: UserWithPassword[]
}

// Initialiser la base de données globale si elle n'existe pas
if (!global.users) {
    global.users = []
}

const blacklistedTokens: Set<string> = new Set()

export function findUserByEmail(email: string): UserWithPassword | null {
    return global.users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null
}

export function findUserById(id: number): User | null {
    const user = global.users.find(user => user.id === id)
    if (!user) return null

    // Retourner sans le mot de passe
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword as User
}

export function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password: string }): User {
    const newUser: UserWithPassword = {
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    global.users.push(newUser)

    // Retourner sans le mot de passe
    const { password, ...userWithoutPassword } = newUser
    return userWithoutPassword as User
}

export function updateUser(id: number, updates: Partial<User>): User | null {
    const userIndex = global.users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    const currentUser = global.users[userIndex]

    // Mettre à jour l'utilisateur existant en gardant tous les champs requis
    global.users[userIndex] = {
        ...currentUser,
        ...updates,
        updatedAt: new Date().toISOString()
    } as UserWithPassword

    // Retourner sans le mot de passe
    const { password, ...userWithoutPassword } = global.users[userIndex]
    return userWithoutPassword as User
}

export function requireAuth(event: any): User {
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Token d\'authentification requis'
        })
    }

    if (blacklistedTokens.has(token)) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Token invalide'
        })
    }

    const payload = verifyToken(token)
    if (!payload) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Token invalide ou expiré'
        })
    }

    const user = findUserById(payload.userId)
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Utilisateur non trouvé'
        })
    }

    return user
}

export function requireAdmin(event: any): User {
    const user = requireAuth(event)

    if (!user || user.role !== 'admin') {
        throw createError({
            statusCode: 403,
            statusMessage: 'Droits d\'administration requis'
        })
    }

    return user
}

export function blacklistToken(token: string): void {
    blacklistedTokens.add(token)
}

export function createSuccessResponse(data?: any, message?: string) {
    return {
        success: true,
        ...(message && { message }),
        ...(data && { data })
    }
}

export function createErrorResponse(message: string, errors?: any, statusCode: number = 400) {
    throw createError({
        statusCode,
        statusMessage: message,
        data: {
            success: false,
            message,
            ...(errors && { errors })
        }
    })
}

// Fonctions utilitaires pour créer des utilisateurs de test
export function createTestUsers() {
    if (global.users.length === 0) {
        // Ajouter un utilisateur de test
        const testUser: UserWithPassword = {
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@tomanstore.com',
            phone: '+229 12 34 56 78',
            password: 'test123',
            role: 'user',
            emailVerified: true,
            // Champ avatar supprimé car il est optionnel et undefined par défaut
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        global.users.push(testUser)
        console.log('✅ Utilisateur de test créé: test@tomanstore.com / test123')
    }
}