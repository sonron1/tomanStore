import type {
    LoginCredentials,
    RegisterCredentials,
    ValidationErrors,
    UpdateProfileRequest
} from '~/types/auth'

export const useAuth = () => {
    const authStore = useAuthStore()

    // État réactif
    const user = computed(() => authStore.currentUser)
    const isLoggedIn = computed(() => authStore.isAuthenticated)
    const isLoading = computed(() => authStore.isLoading)
    const error = computed(() => authStore.error)
    const fullName = computed(() => authStore.fullName)
    const userInitials = computed(() => authStore.userInitials)
    const isAdmin = computed(() => authStore.isAdmin)
    const isEmailVerified = computed(() => authStore.isEmailVerified)

    // Actions d'authentification
    const login = async (credentials: LoginCredentials) => {
        return await authStore.login(credentials)
    }

    const register = async (credentials: RegisterCredentials) => {
        return await authStore.register(credentials)
    }

    const logout = async () => {
        return await authStore.logout()
    }

    const updateProfile = async (data: UpdateProfileRequest) => {
        return await authStore.updateProfile(data)
    }

    // Guards
    const requireAuth = (redirectTo: string = '/auth/login') => {
        if (!isLoggedIn.value) {
            const { notifyWarning } = useNotificationStore()
            notifyWarning('Connexion requise', 'Vous devez être connecté pour accéder à cette page')
            navigateTo(redirectTo)
            return false
        }
        return true
    }

    const requireGuest = (redirectTo: string = '/') => {
        if (isLoggedIn.value) {
            navigateTo(redirectTo)
            return false
        }
        return true
    }

    const requireAdmin = (redirectTo: string = '/') => {
        if (!isLoggedIn.value || !isAdmin.value) {
            const { notifyError } = useNotificationStore()
            notifyError('Accès refusé', 'Vous n\'avez pas les droits nécessaires')
            navigateTo(redirectTo)
            return false
        }
        return true
    }

    // Validation
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password: string) => {
        const messages: string[] = []
        let score = 0

        if (password.length < 8) {
            messages.push('Au moins 8 caractères')
        } else {
            score++
        }

        if (!/[a-z]/.test(password)) {
            messages.push('Au moins une lettre minuscule')
        } else {
            score++
        }

        if (!/[A-Z]/.test(password)) {
            messages.push('Au moins une lettre majuscule')
        } else {
            score++
        }

        if (!/\d/.test(password)) {
            messages.push('Au moins un chiffre')
        } else {
            score++
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            messages.push('Au moins un caractère spécial')
        } else {
            score++
        }

        let strength: 'weak' | 'medium' | 'strong' = 'weak'
        if (score >= 4) strength = 'strong'
        else if (score >= 2) strength = 'medium'

        return {
            isValid: score >= 3 && password.length >= 8,
            strength,
            messages
        }
    }

    const validateLoginForm = (credentials: LoginCredentials): ValidationErrors => {
        const errors: ValidationErrors = {}

        if (!credentials.email) {
            errors.email = 'L\'adresse email est requise'
        } else if (!isValidEmail(credentials.email)) {
            errors.email = 'Format d\'email invalide'
        }

        if (!credentials.password) {
            errors.password = 'Le mot de passe est requis'
        } else if (credentials.password.length < 6) {
            errors.password = 'Le mot de passe doit contenir au moins 6 caractères'
        }

        return errors
    }

    const validateRegisterForm = (credentials: RegisterCredentials): ValidationErrors => {
        const errors: ValidationErrors = {}

        if (!credentials.firstName?.trim()) {
            errors.firstName = 'Le prénom est requis'
        }

        if (!credentials.lastName?.trim()) {
            errors.lastName = 'Le nom est requis'
        }

        if (!credentials.email) {
            errors.email = 'L\'adresse email est requise'
        } else if (!isValidEmail(credentials.email)) {
            errors.email = 'Format d\'email invalide'
        }

        const passwordValidation = validatePassword(credentials.password)
        if (!passwordValidation.isValid) {
            // Fix définitif: S'assurer qu'on a toujours une string valide
            const firstMessage = passwordValidation.messages.find(msg => msg && msg.trim() !== '')
            errors.password = firstMessage || 'Le mot de passe ne respecte pas les critères requis'
        }

        if (credentials.password !== credentials.confirmPassword) {
            errors.confirmPassword = 'Les mots de passe ne correspondent pas'
        }

        if (!credentials.acceptTerms) {
            errors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation'
        }

        return errors
    }

    const clearError = () => {
        authStore.clearError()
    }

    const getAvatarUrl = (userData: any) => {
        if (userData?.avatar) return userData.avatar
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName.value)}&background=3B82F6&color=ffffff&size=100`
    }

    return {
        // État
        user: readonly(user),
        isLoggedIn: readonly(isLoggedIn),
        isLoading: readonly(isLoading),
        error: readonly(error),
        fullName: readonly(fullName),
        userInitials: readonly(userInitials),
        isAdmin: readonly(isAdmin),
        isEmailVerified: readonly(isEmailVerified),

        // Actions
        login,
        register,
        logout,
        updateProfile,

        // Guards
        requireAuth,
        requireGuest,
        requireAdmin,

        // Validations
        isValidEmail,
        validatePassword,
        validateLoginForm,
        validateRegisterForm,

        // Utilitaires
        clearError,
        getAvatarUrl
    }
}