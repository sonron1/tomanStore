import type { KKiaPayConfig, KKiaPayResponse, KKiaPayError, TransactionData } from '~/types/kkiapay'

export const useKKiaPay = () => {
    const config = useRuntimeConfig()
    const isKkiaPayReady = ref(false)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // ✅ Vérification de disponibilité du SDK
    const checkKkiaPayReady = (): boolean => {
        // ✅ Utilisation d'import.meta.client au lieu de process.client
        if (import.meta.client) {
            const hasWidget = typeof window.openKkiapayWidget === 'function'
            const hasAddListener = typeof window.addKkiapayListener === 'function'
            const hasRemoveListener = typeof window.removeKkiapayListener === 'function'

            const ready = hasWidget && hasAddListener && hasRemoveListener
            isKkiaPayReady.value = ready

            console.log('🔍 Vérification SDK KKiaPay:', {
                hasWidget,
                hasAddListener,
                hasRemoveListener,
                isReady: ready
            })

            return ready
        }
        return false
    }

    // ✅ Attente intelligente du SDK avec fallback
    const waitForKkiaPay = async (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (checkKkiaPayReady()) {
                resolve(true)
                return
            }

            console.log('⏳ Attente du SDK KKiaPay...')
            isLoading.value = true

            // ✅ Utiliser la fonction d'attente du plugin si disponible
            if (import.meta.client && window.waitForKkiaPay) {
                window.waitForKkiaPay().then((success) => {
                    isLoading.value = false
                    isKkiaPayReady.value = success
                    resolve(success)
                })
                return
            }

            // ✅ Fallback avec vérification manuelle
            let attempts = 0
            const maxAttempts = 75 // 15 secondes

            const checkInterval = setInterval(() => {
                attempts++

                if (checkKkiaPayReady()) {
                    clearInterval(checkInterval)
                    isLoading.value = false
                    resolve(true)
                    return
                }

                if (attempts >= maxAttempts) {
                    clearInterval(checkInterval)
                    isLoading.value = false
                    error.value = 'Timeout: SDK KKiaPay non disponible'
                    console.error('❌ Timeout attente SDK KKiaPay')
                    resolve(false)
                }
            }, 200)
        })
    }

    // ✅ Chargement dynamique du script si nécessaire
    const loadKkiaPayScript = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            // ✅ Utilisation d'import.meta.client au lieu de process.client
            if (!import.meta.client) {
                resolve(false)
                return
            }

            // Vérifier si le script existe déjà
            const existingScript = document.querySelector('script[src*="kkiapay"]')
            if (existingScript) {
                console.log('📜 Script KKiaPay déjà présent')
                setTimeout(() => resolve(checkKkiaPayReady()), 1000)
                return
            }

            console.log('📥 Chargement dynamique du script KKiaPay...')

            const script = document.createElement('script')
            script.src = 'https://cdn.kkiapay.me/k.js'
            script.defer = true
            script.crossOrigin = 'anonymous'

            script.onload = () => {
                console.log('✅ Script KKiaPay chargé dynamiquement')
                setTimeout(() => {
                    resolve(checkKkiaPayReady())
                }, 1000)
            }

            script.onerror = (err) => {
                console.error('❌ Erreur chargement dynamique:', err)
                reject(new Error('Échec du chargement du script KKiaPay'))
            }

            document.head.appendChild(script)
        })
    }

    // ✅ Fonction de récupération complète
    const ensureKkiaPayReady = async (): Promise<boolean> => {
        console.log('🛡️ Vérification/récupération du SDK KKiaPay...')
        error.value = null

        // 1. Vérification immédiate
        if (checkKkiaPayReady()) {
            return true
        }

        // 2. Attendre le chargement normal
        const normalLoad = await waitForKkiaPay()
        if (normalLoad) {
            return true
        }

        // 3. Tentative de chargement dynamique
        console.log('🔧 Tentative de récupération par chargement dynamique...')
        try {
            const dynamicLoad = await loadKkiaPayScript()
            if (dynamicLoad) {
                return true
            }
        } catch (err) {
            console.error('❌ Chargement dynamique échoué:', err)
            error.value = 'Impossible de charger le SDK KKiaPay'
        }

        // 4. Dernière chance
        console.log('⏰ Dernière tentative...')
        return new Promise((resolve) => {
            setTimeout(() => {
                const success = checkKkiaPayReady()
                console.log(success ? '🎉 Récupération réussie!' : '💀 Échec définitif')
                if (!success) {
                    error.value = 'SDK KKiaPay définitivement indisponible'
                }
                resolve(success)
            }, 3000)
        })
    }

    // ✅ Ouverture du widget de paiement
    const openPayment = async (paymentConfig: Omit<KKiaPayConfig, 'key'>, transactionData?: TransactionData) => {
        try {
            console.log('🚀 Début ouverture paiement KKiaPay...')
            error.value = null
            isLoading.value = true

            // Vérifier la disponibilité du SDK
            const isReady = await ensureKkiaPayReady()
            if (!isReady) {
                throw new Error('SDK KKiaPay indisponible après toutes les tentatives')
            }

            // Configuration complète du paiement
            const fullConfig: KKiaPayConfig = {
                key: config.public.kkiapayPublicKey,
                sandbox: config.public.isKkiapayDev,
                position: 'center',
                theme: 'blue',
                ...paymentConfig,
                // ✅ Ajouter les données de transaction si fournies
                data: transactionData ? JSON.stringify(transactionData) : paymentConfig.data
            }

            console.log('🔧 Configuration paiement:', {
                ...fullConfig,
                key: `${fullConfig.key?.slice(0, 8)}...`,
                data: transactionData ? '[Transaction Data]' : fullConfig.data?.slice(0, 50) + '...'
            })

            // Ouvrir le widget
            window.openKkiapayWidget(fullConfig)
            console.log('✅ Widget KKiaPay ouvert')

        } catch (err) {
            console.error('❌ Erreur ouverture paiement:', err)
            error.value = err instanceof Error ? err.message : 'Erreur lors de l\'ouverture du paiement'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    // ✅ Gestion des événements de paiement
    const setupPaymentListeners = (
        onSuccess: (response: KKiaPayResponse) => void,
        onError: (error: KKiaPayError) => void,
        onPending?: (response: any) => void
    ) => {
        // ✅ Utilisation d'import.meta.client au lieu de process.client
        if (!import.meta.client || typeof window.addKkiapayListener !== 'function') {
            console.warn('⚠️ Listeners non disponibles')
            return
        }

        console.log('🔗 Configuration des listeners de paiement...')

        // Success
        window.addKkiapayListener('success', (response: KKiaPayResponse) => {
            console.log('✅ Paiement réussi:', response)
            onSuccess(response)
        })

        // Failed
        window.addKkiapayListener('failed', (error: KKiaPayError) => {
            console.error('❌ Paiement échoué:', error)
            onError(error)
        })

        // Pending (optionnel)
        if (onPending) {
            window.addKkiapayListener('pending', (response: any) => {
                console.log('⏳ Paiement en attente:', response)
                onPending(response)
            })
        }

        console.log('✅ Listeners configurés')
    }

    // ✅ Nettoyage des listeners
    const clearPaymentListeners = () => {
        // ✅ Utilisation d'import.meta.client au lieu de process.client
        if (import.meta.client && typeof window.removeKkiapayListener === 'function') {
            console.log('🗑️ Nettoyage des listeners...')
            window.removeKkiapayListener('success')
            window.removeKkiapayListener('failed')
            window.removeKkiapayListener('pending')
        }
    }

    // ✅ Fonction de test pour le développement
    const testSDK = () => {
        // ✅ Utilisation d'import.meta.client au lieu de process.client
        if (!import.meta.client) return

        console.log('🧪 Test complet du SDK KKiaPay:')
        console.log('- openKkiapayWidget:', typeof window.openKkiapayWidget)
        console.log('- addKkiapayListener:', typeof window.addKkiapayListener)
        console.log('- removeKkiapayListener:', typeof window.removeKkiapayListener)
        console.log('- Clé publique:', config.public.kkiapayPublicKey?.slice(0, 8) + '...')
        console.log('- Mode sandbox:', config.public.isKkiapayDev)
        console.log('- État ready:', isKkiaPayReady.value)

        return {
            hasWidget: typeof window.openKkiapayWidget === 'function',
            hasListeners: typeof window.addKkiapayListener === 'function',
            config: {
                publicKey: config.public.kkiapayPublicKey,
                sandbox: config.public.isKkiapayDev
            }
        }
    }

    // ✅ Auto-vérification côté client avec import.meta.client
    if (import.meta.client) {
        onMounted(() => {
            // Vérification initiale après montage
            setTimeout(() => {
                checkKkiaPayReady()
            }, 1000)

            // Écouter les événements SDK
            window.addEventListener('kkiapay-ready', () => {
                isKkiaPayReady.value = true
                error.value = null
            })

            window.addEventListener('kkiapay-error', () => {
                error.value = 'Erreur de chargement du SDK KKiaPay'
            })
        })

        // Nettoyage automatique
        onUnmounted(() => {
            clearPaymentListeners()
        })
    }

    return {
        // États
        isKkiaPayReady: readonly(isKkiaPayReady),
        isLoading: readonly(isLoading),
        error: readonly(error),

        // Méthodes principales
        ensureKkiaPayReady,
        openPayment,
        setupPaymentListeners,
        clearPaymentListeners,

        // Utilitaires
        checkKkiaPayReady,
        testSDK,

        // Configuration
        config: {
            publicKey: config.public.kkiapayPublicKey,
            sandbox: config.public.isKkiapayDev,
            baseUrl: config.public.kkiapayBaseUrl
        }
    }
}