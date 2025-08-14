import type { KKiaPayResponse, KKiaPayError, TransactionData } from '~/types/kkiapay'

export const usePayment = () => {
    const { openPayment, setupPaymentListeners, clearPaymentListeners, ensureKkiaPayReady, checkKkiaPayReady } = useKKiaPay()
    const cartStore = useCartStore()
    const notificationStore = useNotificationStore()
    const router = useRouter()

    const isProcessing = ref(false)
    const currentTransaction = ref<string | null>(null)

    // ✅ Générateur d'ID de commande (corrigé - substring au lieu de substr)
    const generateOrderId = (): string => {
        const timestamp = Date.now().toString(36)
        const random = Math.random().toString(36).substring(2, 7) // ✅ substring au lieu de substr
        return `TOM${timestamp}${random}`.toUpperCase()
    }

    // ✅ Vérification côté serveur avec typage correct
    const verifyTransactionServer = async (transactionId: string): Promise<boolean> => {
        try {
            console.log('🔍 Vérification côté serveur:', transactionId)

            // Appel à l'API de vérification Nuxt
            const response = await $fetch<{
                success?: boolean
                data?: {
                    status?: string
                }
            }>('/api/verify-transaction', {
                method: 'POST',
                body: { transactionId }
            })

            if (response?.success && response?.data?.status === 'SUCCESSFUL') {
                console.log('✅ Transaction vérifiée côté serveur')
                return true
            } else {
                console.warn('⚠️ Transaction non confirmée côté serveur')
                return false
            }
        } catch (error) {
            console.error('❌ Erreur vérification serveur:', error)
            return false
        }
    }

    // ✅ Gestionnaire de succès de paiement
    const handlePaymentSuccess = async (response: KKiaPayResponse) => {
        try {
            console.log('🎉 Paiement réussi - Traitement...', response)

            currentTransaction.value = response.transactionId

            // ✅ Afficher notification de succès
            notificationStore.notifySuccess(
                'Paiement réussi !',
                `Transaction ${response.transactionId.slice(0, 8)}... confirmée`
            )

            // ✅ Vérification côté serveur (optionnelle)
            await verifyTransactionServer(response.transactionId)

            // ✅ Vider le panier
            cartStore.clearCart()

            // ✅ Rediriger vers la page de succès
            await router.push({
                path: '/order-confirmation',
                query: {
                    transaction: response.transactionId,
                    amount: response.amount.toString()
                }
            })

        } catch (error) {
            console.error('❌ Erreur post-paiement:', error)

            notificationStore.notifyWarning(
                'Paiement effectué',
                'Votre paiement a été traité mais une erreur est survenue. Contactez le support si nécessaire.'
            )
        } finally {
            isProcessing.value = false
            clearPaymentListeners()
        }
    }

    // ✅ Gestionnaire d'erreur de paiement
    const handlePaymentError = (error: KKiaPayError) => {
        console.error('❌ Paiement échoué:', error)

        let errorMessage = 'Votre paiement a échoué'

        // Messages d'erreur personnalisés selon le type
        if (error.message?.toLowerCase().includes('insufficient')) {
            errorMessage = 'Solde insuffisant'
        } else if (error.message?.toLowerCase().includes('network')) {
            errorMessage = 'Problème de connexion'
        } else if (error.message?.toLowerCase().includes('canceled')) {
            errorMessage = 'Paiement annulé'
        }

        notificationStore.notifyError(
            'Paiement échoué',
            errorMessage
        )

        isProcessing.value = false
        clearPaymentListeners()
    }

    // ✅ Gestionnaire de paiement en attente
    const handlePaymentPending = (response: any) => {
        console.log('⏳ Paiement en attente:', response)

        notificationStore.notifyInfo(
            'Paiement en cours',
            'Votre paiement est en cours de traitement...'
        )
    }

    // ✅ Fonction principale de traitement du paiement (CORRECTION MAJEURE)
    const processPayment = async (checkoutData: {
        customer: {
            firstName: string
            lastName: string
            email: string
            phone: string
        }
        shipping: {
            address: string
            city: string
            phone: string
        }
        totals: {
            subtotal: number
            shipping: number
            total: number
        }
    }) => {
        if (isProcessing.value) {
            console.warn('⚠️ Paiement déjà en cours...')
            return
        }

        try {
            console.log('💳 Début du processus de paiement...')
            isProcessing.value = true

            // ✅ CORRECTION: Vérification simple d'abord
            if (process.client && typeof window.openKkiapayWidget === 'function') {
                console.log('✅ SDK KKiaPay disponible - utilisation directe')
            } else {
                // ✅ Seulement si pas disponible, essayer ensureKkiaPayReady
                console.log('⏳ SDK non disponible, tentative de récupération...')
                const sdkReady = await ensureKkiaPayReady()
                if (!sdkReady) {
                    console.error('❌ SDK KKiaPay non disponible après récupération')
                    notificationStore.notifyError(
                        'Service indisponible',
                        'Le service de paiement est momentanément indisponible. Veuillez réessayer dans quelques instants.'
                    )
                    return
                }
            }

            // ✅ Préparer les données de transaction (correction du typage)
            const transactionData: TransactionData = {
                orderId: generateOrderId(),
                cartItems: [...cartStore.items], // ✅ Copier pour éviter readonly
                shipping: checkoutData.shipping,
                customer: checkoutData.customer,
                totals: checkoutData.totals
            }

            // ✅ Configurer les listeners avant d'ouvrir le paiement
            setupPaymentListeners(
                handlePaymentSuccess,
                handlePaymentError,
                handlePaymentPending
            )

            // ✅ Configuration du paiement
            const paymentConfig = {
                amount: Math.round(checkoutData.totals.total),
                name: `${checkoutData.customer.firstName} ${checkoutData.customer.lastName}`,
                email: checkoutData.customer.email,
                phone: checkoutData.customer.phone,
                reason: `Commande TomanStore #${transactionData.orderId}`,
                partnerId: 'tomanstore',
            }

            console.log('🔧 Ouverture du widget de paiement:', {
                ...paymentConfig,
                orderId: transactionData.orderId
            })

            // ✅ CORRECTION: Utilisation directe si disponible, sinon openPayment
            if (process.client && typeof window.openKkiapayWidget === 'function') {
                const config = useRuntimeConfig()

                // ✅ Configuration complète du paiement avec typage correct
                const fullConfig = {
                    key: config.public.kkiapayPublicKey,
                    sandbox: config.public.isKkiapayDev,
                    position: 'center' as const, // ✅ Type literal pour position
                    theme: 'blue' as const,     // ✅ Type literal pour theme
                    ...paymentConfig,
                    data: JSON.stringify(transactionData)
                }

                console.log('🚀 Ouverture directe du widget...')
                window.openKkiapayWidget(fullConfig)
                console.log('✅ Widget de paiement ouvert avec succès')
            } else {
                // ✅ Fallback vers openPayment
                await openPayment(paymentConfig, transactionData)
                console.log('✅ Widget de paiement ouvert via openPayment')
            }

        } catch (error) {
            console.error('❌ Erreur générale lors du paiement:', error)

            // ✅ Gestion d'erreur plus robuste
            const errorMessage = error instanceof Error
                ? error.message
                : 'Une erreur inattendue est survenue lors de l\'initialisation du paiement'

            notificationStore.notifyError(
                'Erreur de paiement',
                errorMessage
            )

            // ✅ Nettoyer les listeners en cas d'erreur
            clearPaymentListeners()
        } finally {
            // ✅ S'assurer que isProcessing est remis à false SEULEMENT si pas de paiement lancé
            // Le paiement remettra isProcessing à false dans les handlers
        }
    }

    // ✅ Fonction de nettoyage manuelle (utile pour les tests)
    const resetPayment = () => {
        isProcessing.value = false
        currentTransaction.value = null
        clearPaymentListeners()
        console.log('🔄 État de paiement réinitialisé')
    }

    // ✅ Nettoyage automatique
    if (process.client) {
        onUnmounted(() => {
            clearPaymentListeners()
            isProcessing.value = false
        })
    }

    return {
        // États
        isProcessing: readonly(isProcessing),
        currentTransaction: readonly(currentTransaction),

        // Méthodes principales
        processPayment,
        verifyTransactionServer,
        resetPayment, // ✅ Nouvelle méthode

        // Gestionnaires (exposés pour tests)
        handlePaymentSuccess,
        handlePaymentError,
        handlePaymentPending
    }
}