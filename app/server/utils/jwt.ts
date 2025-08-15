import type { TokenPayload } from '~/types/auth'

// Configuration des secrets
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key'
const JWT_EXPIRES_IN = '1h'
const JWT_REFRESH_EXPIRES_IN = '7d'

// Simple JWT implementation (remplacez par jsonwebtoken en production)
function base64urlEncode(str: string): string {
    return Buffer.from(str).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

function base64urlDecode(str: string): string {
    str += '='.repeat((4 - str.length % 4) % 4)
    return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()
}

function createSimpleJWT(payload: any, secret: string, expiresIn: string): string {
    const header = { alg: 'HS256', typ: 'JWT' }
    const now = Math.floor(Date.now() / 1000)
    const exp = expiresIn === '1h' ? now + 3600 : now + 604800 // 1h ou 7j

    const fullPayload = { ...payload, iat: now, exp }

    const encodedHeader = base64urlEncode(JSON.stringify(header))
    const encodedPayload = base64urlEncode(JSON.stringify(fullPayload))

    return `${encodedHeader}.${encodedPayload}.signature`
}

function verifySimpleJWT(token: string): any | null {
    try {
        const parts = token.split('.')
        if (parts.length !== 3) {
            return null
        }

        const [header, payload] = parts
        if (!header || !payload) {
            return null
        }

        const decodedPayload = JSON.parse(base64urlDecode(payload))

        if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
            return null // Token expiré
        }

        return decodedPayload
    } catch {
        return null
    }
}

export function generateTokens(userId: number, email: string, role: string) {
    const payload: TokenPayload = {
        userId,
        email,
        role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
    }

    const token = createSimpleJWT(payload, JWT_SECRET, JWT_EXPIRES_IN)
    const refreshToken = createSimpleJWT(payload, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN)

    return { token, refreshToken }
}

export function verifyToken(token: string): TokenPayload | null {
    return verifySimpleJWT(token)
}

export function verifyRefreshToken(refreshToken: string): TokenPayload | null {
    return verifySimpleJWT(refreshToken)
}

export function extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null
    }
    return authHeader.substring(7)
}