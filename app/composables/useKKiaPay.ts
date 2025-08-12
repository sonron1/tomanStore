import type { KKiaPayConfig, KKiaPayResponse, KKiaPayError } from '~/types/kkiapay'

export const useKKiaPay = () => {
    const config = useRuntimeConfig()
    const isKkiaPayReady = ref(false)

    // Vérifier si KKiaPay est chargé
    const checkKkiaPayReady = () => {
        if (process.client) {
            isKkiaPayReady.value = typeof window.openKkiapayWidget === 'function'
        }
        return isKkiaPayReady.value
    }

    // Attendre que KKiaPay soit prêt
    const waitForKkiaPay = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (checkKkiaPayReady()) {
                resolve(true)
                return
            }

            const checkInterval = setInterval(() => {
                if (checkKkiaPayReady()) {
                    clearInterval(checkInterval)
                    resolve(true)
                }
            }, 100)

            setTimeout(() => {
                clearInterval(checkInterval)
                resolve(false)
            }, 10000)
        })
    }

    // Ouvrir le widget de paiement
    const openPayment = async (paymentConfig: Omit<KKiaPayConfig, 'key'>) => {
        try {
            const isReady = await waitForKkiaPay()
            if (!isReady) {
                throw new Error('KKiaPay SDK non disponible')
            }

            const fullConfig: KKiaPayConfig = {
                ...paymentConfig,
                key: config.public.kkiapayPublicKey,
                sandbox: config.public.isKkiapayDev,
                position: paymentConfig.position || 'center'
            }

            if (process.client) {
                window.openKkiapayWidget(fullConfig)
            }
        } catch (error) {
            console.error('Erreur KKiaPay:', error)
            throw error
        }
    }

    // Ajouter les listeners
    const addPaymentListeners = (
        onSuccess: (response: KKiaPayResponse) => void,
        onError: (error: KKiaPayError) => void
    ) => {
        if (process.client && typeof window.addSuccessListener === 'function') {
            window.addSuccessListener(onSuccess)
            window.addFailedListener(onError)
        }
    }

    // Supprimer les listeners
    const removePaymentListeners = () => {
        if (process.client && typeof window.removeKkiapayListener === 'function') {
            window.removeKkiapayListener()
        }
    }

    return {
        isKkiaPayReady: readonly(isKkiaPayReady),
        checkKkiaPayReady,
        waitForKkiaPay,
        openPayment,
        addPaymentListeners,
        removePaymentListeners
    }
}