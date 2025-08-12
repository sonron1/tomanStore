import type { KKiaPayConfig, KKiaPayResponse, KKiaPayError } from '~/types/kkiapay'

export const useKKiaPay = () => {
    const config = useRuntimeConfig()
    const isKkiaPayReady = ref(false)

    // ✅ AMÉLIORATION: Vérification plus robuste
    const checkKkiaPayReady = () => {
        if (process.client) {
            const hasWidget = typeof window.openKkiapayWidget === 'function'
            const hasListeners = typeof window.addKkiapayListener === 'function'
            const hasRemoveListener = typeof window.removeKkiapayListener === 'function'

            isKkiaPayReady.value = hasWidget && hasListeners && hasRemoveListener

            console.log('🔍 Vérification SDK KKiaPay:', {
                hasWidget,
                hasListeners,
                hasRemoveListener,
                isReady: isKkiaPayReady.value
            })

            return isKkiaPayReady.value
        }
        return false
    }

    // ✅ AMÉLIORATION: Attente plus intelligente
    const waitForKkiaPay = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (checkKkiaPayReady()) {
                resolve(true)
                return
            }

            console.log('⏳ Attente du SDK KKiaPay...')

            let attempts = 0
            const maxAttempts = 100 // 50 secondes (100 × 500ms)

            const checkInterval = setInterval(() => {
                attempts++
                console.log(`🔄 Tentative ${attempts}/${maxAttempts} - Vérification SDK...`)

                if (checkKkiaPayReady()) {
                    console.log('🎉 SDK KKiaPay maintenant disponible!')
                    clearInterval(checkInterval)
                    resolve(true)
                    return
                }

                // Diagnostic détaillé toutes les 10 tentatives
                if (attempts % 10 === 0) {
                    console.log('🔍 Diagnostic SDK:', {
                        windowKeys: Object.keys(window).filter(k => k.toLowerCase().includes('kkia')),
                        scriptsLoaded: document.querySelectorAll('script[src*="kkiapay"]').length,
                        networkStatus: navigator.onLine ? 'En ligne' : 'Hors ligne'
                    })
                }

                if (attempts >= maxAttempts) {
                    clearInterval(checkInterval)
                    console.error('❌ TIMEOUT: SDK KKiaPay non chargé après', (maxAttempts * 500 / 1000), 'secondes')
                    resolve(false)
                }
            }, 500)
        })
    }

    // ✅ AMÉLIORATION: Chargement manuel du script si nécessaire
    const loadKkiaPayScript = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            // Vérifier si le script existe déjà
            const existingScript = document.querySelector('script[src*="kkiapay"]')
            if (existingScript) {
                console.log('📜 Script KKiaPay déjà présent')
                resolve(true)
                return
            }

            console.log('📥 Chargement manuel du script KKiaPay...')

            const script = document.createElement('script')
            script.src = 'https://cdn.kkiapay.me/k.js'
            script.async = false
            script.defer = false

            script.onload = () => {
                console.log('✅ Script KKiaPay chargé manuellement')
                // Attendre un peu que les fonctions soient initialisées
                setTimeout(() => {
                    resolve(checkKkiaPayReady())
                }, 1000)
            }

            script.onerror = (error) => {
                console.error('❌ Erreur chargement manuel du script:', error)
                reject(error)
            }

            document.head.appendChild(script)
        })
    }

    // ✅ FONCTION DE RÉCUPÉRATION INTELLIGENTE
    const ensureKkiaPayReady = async (): Promise<boolean> => {
        console.log('🛡️ Vérification/récupération du SDK KKiaPay...')

        // 1. Vérification immédiate
        if (checkKkiaPayReady()) {
            return true
        }

        // 2. Attendre le chargement normal
        const normalLoad = await waitForKkiaPay()
        if (normalLoad) {
            return true
        }

        // 3. Tentative de chargement manuel
        console.log('🔧 Tentative de récupération par chargement manuel...')
        try {
            const manualLoad = await loadKkiaPayScript()
            if (manualLoad) {
                return true
            }
        } catch (error) {
            console.error('❌ Chargement manuel échoué:', error)
        }

        // 4. Dernière chance avec une attente supplémentaire
        console.log('⏰ Dernière chance - attente supplémentaire...')
        return new Promise((resolve) => {
            setTimeout(() => {
                const finalCheck = checkKkiaPayReady()
                console.log(finalCheck ? '🎉 Récupération réussie!' : '💀 Échec définitif')
                resolve(finalCheck)
            }, 3000)
        })
    }

    const openPayment = async (paymentConfig: Omit<KKiaPayConfig, 'key'>) => {
        try {
            console.log('🚀 Début ouverture paiement KKiaPay...')

            // ✅ UTILISER LA FONCTION DE RÉCUPÉRATION
            const isReady = await ensureKkiaPayReady()
            if (!isReady) {
                throw new Error('KKiaPay SDK indisponible après toutes les tentatives de récupération')
            }

            const fullConfig: KKiaPayConfig = {
                ...paymentConfig,
                key: config.public.kkiapayPublicKey,
                sandbox: config.public.isKkiapayDev || true,
                position: 'center'
            }

            console.log('🔧 Configuration paiement:', {
                ...fullConfig,
                key: `${fullConfig.key?.slice(0, 8)}...`
            })

            window.openKkiapayWidget(fullConfig)
            console.log('✅ Widget KKiaPay ouvert avec succès')

        } catch (error) {
            console.error('❌ Erreur ouverture paiement:', error)
            throw error
        }
    }

    const addPaymentListeners = (
        onSuccess: (response: KKiaPayResponse) => void,
        onError: (error: KKiaPayError) => void
    ) => {
        if (process.client && typeof window.addKkiapayListener === 'function') {
            console.log('🔗 Ajout des listeners KKiaPay...')

            window.addKkiapayListener('success', (response: any) => {
                console.log('✅ Paiement réussi:', response)
                onSuccess(response)
            })

            window.addKkiapayListener('failed', (error: any) => {
                console.error('❌ Paiement échoué:', error)
                onError(error)
            })

            window.addKkiapayListener('pending', (response: any) => {
                console.log('⏳ Paiement en attente:', response)
            })

            console.log('✅ Listeners ajoutés avec succès')
        }
    }

    const removePaymentListeners = () => {
        if (process.client && typeof window.removeKkiapayListener === 'function') {
            console.log('🗑️ Suppression des listeners...')
            window.removeKkiapayListener('success')
            window.removeKkiapayListener('failed')
            window.removeKkiapayListener('pending')
        }
    }

    const testSDK = () => {
        if (process.client) {
            console.log('🧪 Test complet du SDK KKiaPay:')
            console.log('- openKkiapayWidget:', typeof window.openKkiapayWidget)
            console.log('- addKkiapayListener:', typeof window.addKkiapayListener)
            console.log('- removeKkiapayListener:', typeof window.removeKkiapayListener)
            console.log('- window.kkiapay:', typeof window.kkiapay)
            console.log('- Clé publique:', config.public.kkiapayPublicKey?.slice(0, 12) + '...')
            console.log('- Mode sandbox:', config.public.isKkiapayDev)
            console.log('- SDK Prêt:', isKkiaPayReady.value ? '✅' : '❌')

            const kkiaObjects = Object.getOwnPropertyNames(window).filter(name =>
                name.toLowerCase().includes('kkia')
            )
            console.log('- Objets KKiaPay:', kkiaObjects)

            return {
                isReady: isKkiaPayReady.value,
                hasWidget: typeof window.openKkiapayWidget === 'function',
                hasListeners: typeof window.addKkiapayListener === 'function'
            }
        }
        return { isReady: false, hasWidget: false, hasListeners: false }
    }

    // ✅ INITIALISATION AMÉLIORÉE
    onMounted(async () => {
        if (process.client) {
            console.log('🔧 Initialisation avancée du SDK KKiaPay...')

            // Test initial
            testSDK()

            // Assurer que KKiaPay est prêt
            await ensureKkiaPayReady()

            // Test final
            const finalResult = testSDK()
            console.log('📊 Résultat final:', finalResult)
        }
    })

    return {
        isKkiaPayReady: readonly(isKkiaPayReady),
        checkKkiaPayReady,
        waitForKkiaPay,
        ensureKkiaPayReady,
        openPayment,
        addPaymentListeners,
        removePaymentListeners,
        testSDK
    }
}