import type { LoginCredentials, RegisterCredentials } from '~/types/auth'

export function validateLoginData(data: LoginCredentials) {
    const errors: Record<string, string> = {}

    if (!data.email?.trim()) {
        errors.email = 'L\'adresse email est requise'
    } else if (!isValidEmail(data.email)) {
        errors.email = 'Format d\'email invalide'
    }

    if (!data.password?.trim()) {
        errors.password = 'Le mot de passe est requis'
    } else if (data.password.length < 6) {
        errors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

export function validateRegisterData(data: RegisterCredentials) {
    const errors: Record<string, string> = {}

    if (!data.firstName?.trim()) {
        errors.firstName = 'Le prénom est requis'
    }

    if (!data.lastName?.trim()) {
        errors.lastName = 'Le nom est requis'
    }

    if (!data.email?.trim()) {
        errors.email = 'L\'adresse email est requise'
    } else if (!isValidEmail(data.email)) {
        errors.email = 'Format d\'email invalide'
    }

    if (data.phone && !isValidPhone(data.phone)) {
        errors.phone = 'Format de téléphone invalide'
    }

    if (!data.password?.trim()) {
        errors.password = 'Le mot de passe est requis'
    } else if (data.password.length < 8) {
        errors.password = 'Le mot de passe doit contenir au moins 8 caractères'
    } else if (!isStrongPassword(data.password)) {
        errors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    if (!data.acceptTerms) {
        errors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$|^(\+229)[0-9]{8}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function isStrongPassword(password: string): boolean {
    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return hasLowerCase && hasUpperCase && hasNumbers && hasSpecialChar
}

export function sanitizeUserInput(input: string): string {
    return input.trim().replace(/\s+/g, ' ')
}