export default defineNuxtPlugin(() => {
    console.log('🔌 Plugin KKiaPay - Initialisation côté client...')

    // ✅ État de chargement du SDK
    let isSDKReady = false
    let listeners: Array<() => void> = []

    // ✅ Fonction de vérification du SDK
    const checkSDKAvailability = (): boolean => {
        return !!(
            typeof window !== 'undefined' &&
            window.openKkiapayWidget &&
            typeof window.openKkiapayWidget === 'function' &&
            window.addKkiapayListener &&
            typeof window.addKkiapayListener === 'function'
        )
    }

    // ✅ Fonction d'initialisation du SDK
    const initializeSDK = () => {
        if (checkSDKAvailability()) {
            console.log('✅ Plugin KKiaPay - SDK détecté et prêt!')
            isSDKReady = true

            // Notifier tous les listeners en attente
            listeners.forEach(callback => callback())
            listeners = []

            // Émettre l'événement global
            window.dispatchEvent(new CustomEvent('kkiapay-ready', {
                detail: { timestamp: Date.now() }
            }))

            return true
        }
        return false
    }

    // ✅ Tentative d'initialisation immédiate
    if (initializeSDK()) {
        return
    }

    // ✅ Écouter l'événement de chargement du script
    window.addEventListener('kkiapay-sdk-loaded', () => {
        console.log('📡 Événement de chargement SDK reçu')
        setTimeout(initializeSDK, 100) // Petit délai pour l'initialisation
    })

    // ✅ Vérification périodique robuste
    let checkAttempts = 0
    const maxAttempts = 50 // 10 secondes (50 × 200ms)

    const checkInterval = setInterval(() => {
        checkAttempts++

        if (initializeSDK()) {
            clearInterval(checkInterval)
            return
        }

        // ✅ Diagnostic détaillé toutes les 10 tentatives
        if (checkAttempts % 10 === 0) {
            console.log(`🔍 Plugin KKiaPay - Tentative ${checkAttempts}/${maxAttempts}:`, {
                windowKeys: Object.keys(window).filter(k => k.toLowerCase().includes('kkia')),
                scriptElements: document.querySelectorAll('script[src*="kkiapay"]').length,
                kkiaPayLoaded: window.kkiaPayLoaded
            })
        }

        if (checkAttempts >= maxAttempts) {
            console.error('❌ Plugin KKiaPay - Timeout après', (maxAttempts * 200 / 1000), 'secondes')
            clearInterval(checkInterval)

            // Émettre un événement d'erreur
            window.dispatchEvent(new CustomEvent('kkiapay-error', {
                detail: {
                    reason: 'timeout',
                    attempts: checkAttempts,
                    timestamp: Date.now()
                }
            }))
        }
    }, 200)

    // ✅ Fonction publique pour attendre la disponibilité
    window.waitForKkiaPay = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (isSDKReady) {
                resolve(true)
                return
            }

            listeners.push(() => resolve(true))

            // Timeout de sécurité
            setTimeout(() => resolve(false), 15000) // 15 secondes max
        })
    }

    // ✅ Nettoyage lors du démontage
    window.addEventListener('beforeunload', () => {
        if (checkInterval) {
            clearInterval(checkInterval)
        }
    })
})

// ✅ Extension TypeScript pour la fonction d'attente
declare global {
    interface Window {
        waitForKkiaPay?: () => Promise<boolean>
    }
}