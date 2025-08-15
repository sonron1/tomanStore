import { defineStore } from 'pinia'
import type {
    User,
    AuthState,
    LoginCredentials,
    RegisterCredentials,
    AuthResponse,
    UpdateProfileRequest,
    Address,
    UserOrder
} from '~/types/auth'

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isLoggedIn: false,
        isLoading: false,
        error: null,
        token: null,
        refreshToken: null
    }),

    getters: {
        currentUser: (state): User | null => state.user,
        isAuthenticated: (state): boolean => state.isLoggedIn && !!state.user,
        isAdmin: (state): boolean => state.user?.role === 'admin',
        fullName: (state): string => {
            if (!state.user) return ''
            return `${state.user.firstName} ${state.user.lastName}`
        },
        userInitials: (state): string => {
            if (!state.user) return '??'
            return `${state.user.firstName[0]}${state.user.lastName[0]}`.toUpperCase()
        },
        isEmailVerified: (state): boolean => state.user?.emailVerified ?? false
    },

    actions: {
        setLoading(loading: boolean) {
            this.isLoading = loading
        },

        setError(error: string | null) {
            this.error = error
        },

        clearError() {
            this.error = null
        },

        saveTokens(token: string, refreshToken: string) {
            this.token = token
            this.refreshToken = refreshToken

            if (process.client) {
                localStorage.setItem('auth_token', token)
                localStorage.setItem('refresh_token', refreshToken)
            }
        },

        clearTokens() {
            this.token = null
            this.refreshToken = null

            if (process.client) {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('refresh_token')
            }
        },

        async login(credentials: LoginCredentials): Promise<AuthResponse> {
            this.setLoading(true)
            this.clearError()

            try {
                const response = await $fetch<AuthResponse>('/api/auth/login', {
                    method: 'POST',
                    body: credentials
                })

                if (response.success && response.data) {
                    this.user = response.data.user
                    this.isLoggedIn = true
                    this.saveTokens(response.data.token, response.data.refreshToken)

                    const { notifySuccess } = useNotificationStore()
                    notifySuccess('Connexion réussie', `Bienvenue ${this.fullName} !`)
                }

                return response
            } catch (error: any) {
                const errorMessage = error.data?.message || 'Erreur lors de la connexion'
                this.setError(errorMessage)

                const { notifyError } = useNotificationStore()
                notifyError('Erreur de connexion', errorMessage)

                return {
                    success: false,
                    error: errorMessage
                }
            } finally {
                this.setLoading(false)
            }
        },

        async register(credentials: RegisterCredentials): Promise<AuthResponse> {
            this.setLoading(true)
            this.clearError()

            try {
                const response = await $fetch<AuthResponse>('/api/auth/register', {
                    method: 'POST',
                    body: credentials
                })

                if (response.success && response.data) {
                    this.user = response.data.user
                    this.isLoggedIn = true
                    this.saveTokens(response.data.token, response.data.refreshToken)

                    const { notifySuccess } = useNotificationStore()
                    notifySuccess('Inscription réussie', 'Votre compte a été créé avec succès !')
                }

                return response
            } catch (error: any) {
                const errorMessage = error.data?.message || 'Erreur lors de l\'inscription'
                this.setError(errorMessage)

                const { notifyError } = useNotificationStore()
                notifyError('Erreur d\'inscription', errorMessage)

                return {
                    success: false,
                    error: errorMessage
                }
            } finally {
                this.setLoading(false)
            }
        },

        async logout(): Promise<void> {
            this.setLoading(true)

            try {
                if (this.token) {
                    await $fetch('/api/auth/logout', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.token}`
                        }
                    })
                }
            } catch (error) {
                console.warn('Erreur lors de la déconnexion côté serveur:', error)
            } finally {
                this.user = null
                this.isLoggedIn = false
                this.clearTokens()
                this.clearError()
                this.setLoading(false)

                const { notifyInfo } = useNotificationStore()
                notifyInfo('Déconnexion', 'Vous avez été déconnecté avec succès')

                await navigateTo('/')
            }
        },

        async refreshAuthToken(): Promise<boolean> {
            if (!this.refreshToken) return false

            try {
                const response = await $fetch<AuthResponse>('/api/auth/refresh', {
                    method: 'POST',
                    body: { refreshToken: this.refreshToken }
                })

                if (response.success && response.data) {
                    this.saveTokens(response.data.token, response.data.refreshToken)
                    return true
                }

                return false
            } catch (error) {
                console.error('Erreur lors du rafraîchissement du token:', error)
                await this.logout()
                return false
            }
        },

        async checkAuth(): Promise<void> {
            if (!process.client) return

            const token = localStorage.getItem('auth_token')
            const refreshToken = localStorage.getItem('refresh_token')

            if (!token || !refreshToken) return

            this.setLoading(true)

            try {
                const response = await $fetch<{ user: User }>('/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (response.user) {
                    this.user = response.user
                    this.isLoggedIn = true
                    this.token = token
                    this.refreshToken = refreshToken
                }
            } catch (error) {
                this.refreshToken = refreshToken
                const refreshed = await this.refreshAuthToken()

                if (!refreshed) {
                    this.clearTokens()
                }
            } finally {
                this.setLoading(false)
            }
        },

        async updateProfile(data: UpdateProfileRequest): Promise<boolean> {
            if (!this.isAuthenticated) return false

            this.setLoading(true)

            try {
                const response = await $fetch<{ user: User }>('/api/auth/profile', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: data
                })

                if (response.user) {
                    this.user = response.user

                    const { notifySuccess } = useNotificationStore()
                    notifySuccess('Profil mis à jour', 'Vos informations ont été mises à jour')

                    return true
                }

                return false
            } catch (error: any) {
                const errorMessage = error.data?.message || 'Erreur lors de la mise à jour'
                this.setError(errorMessage)

                const { notifyError } = useNotificationStore()
                notifyError('Erreur de mise à jour', errorMessage)

                return false
            } finally {
                this.setLoading(false)
            }
        },

        async getUserAddresses(): Promise<Address[]> {
            if (!this.isAuthenticated) return []

            try {
                const response = await $fetch<{ addresses: Address[] }>('/api/auth/addresses', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                })

                return response.addresses || []
            } catch (error) {
                console.error('Erreur lors de la récupération des adresses:', error)
                return []
            }
        },

        async getUserOrders(): Promise<UserOrder[]> {
            if (!this.isAuthenticated) return []

            try {
                const response = await $fetch<{ orders: UserOrder[] }>('/api/auth/orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                })

                return response.orders || []
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error)
                return []
            }
        },


        // Ajouter ces méthodes dans les actions du store :

        async saveAddress(addressData: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<boolean> {
            if (!this.isAuthenticated) return false

            try {
                const response = await $fetch<{ address: Address }>('/api/auth/addresses', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: addressData
                })

                if (response.address) {
                    const { notifySuccess } = useNotificationStore()
                    notifySuccess('Adresse ajoutée', 'Votre nouvelle adresse a été enregistrée')
                    return true
                }

                return false
            } catch (error: any) {
                const errorMessage = error.data?.message || 'Erreur lors de l\'ajout'
                const { notifyError } = useNotificationStore()
                notifyError('Erreur', errorMessage)
                return false
            }
        },

        async updateAddress(addressId: number, updates: Partial<Address>): Promise<boolean> {
            if (!this.isAuthenticated) return false

            try {
                const response = await $fetch<{ address: Address }>(`/api/auth/addresses/${addressId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: updates
                })

                if (response.address) {
                    const { notifySuccess } = useNotificationStore()
                    notifySuccess('Adresse modifiée', 'Votre adresse a été mise à jour')
                    return true
                }

                return false
            } catch (error: any) {
                const errorMessage = error.data?.message || 'Erreur lors de la modification'
                const { notifyError } = useNotificationStore()
                notifyError('Erreur', errorMessage)
                return false
            }
        },

        async deleteAddress(addressId: number): Promise<boolean> {
            if (!this.isAuthenticated) return false

            try {
                await $fetch(`/api/auth/addresses/${addressId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                })

                const { notifySuccess } = useNotificationStore()
                notifySuccess('Adresse supprimée', 'L\'adresse a été supprimée avec succès')
                return true
            } catch (error: any) {
                const errorMessage = error.data?.message || 'Erreur lors de la suppression'
                const { notifyError } = useNotificationStore()
                notifyError('Erreur', errorMessage)
                return false
            }
        }
    }
})