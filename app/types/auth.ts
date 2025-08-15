
// Types d'utilisateur
export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    phone?: string
    avatar?: string
    role: 'admin' | 'user'
    emailVerified: boolean
    createdAt: string
    updatedAt: string
}

// État du store d'authentification
export interface AuthState {
    user: User | null
    isLoggedIn: boolean
    isLoading: boolean
    error: string | null
    token: string | null
    refreshToken: string | null
}

// Credentials pour la connexion
export interface LoginCredentials {
    email: string
    password: string
    rememberMe?: boolean
}

// Credentials pour l'inscription
export interface RegisterCredentials {
    firstName: string
    lastName: string
    email: string
    phone?: string
    password: string
    confirmPassword: string
    acceptTerms: boolean
}

// Réponse d'authentification
export interface AuthResponse {
    success: boolean
    message?: string
    data?: {
        user: User
        token: string
        refreshToken: string
    }
    error?: string
    errors?: Record<string, string>
}

// Requête de mise à jour du profil
export interface UpdateProfileRequest {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    avatar?: string
}

// Type pour les adresses utilisateur
export interface Address {
    id: number
    userId: number
    type: 'home' | 'work' | 'other'
    title: string
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
    country: string
    phone?: string
    isDefault: boolean
    createdAt: string
    updatedAt: string
}

// Type pour les items de commande
export interface OrderItem {
    id: number
    productId: number
    productName: string
    productImage?: string
    quantity: number
    price: number
    total: number
}

// Type pour les commandes utilisateur
export interface UserOrder {
    id: number
    userId: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    total: number
    createdAt: string
    updatedAt: string
    items: OrderItem[]
    shippingAddress: Address
}

// Type pour les erreurs de validation
export interface ValidationErrors {
    [key: string]: string
}

// Type pour les tokens JWT
export interface TokenPayload {
    userId: number
    email: string
    role: string
    iat: number
    exp: number
}