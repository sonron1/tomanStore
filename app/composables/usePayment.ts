import type { KKiaPayResponse, KKiaPayError, TransactionData } from '~/types/kkiapay'

export const usePayment = () => {
    const { openPayment, setupPaymentListeners, clearPaymentListeners, ensureKkiaPayReady } = useKKiaPay()
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

    // ✅ Vérification côté serveur
    const verifyTransactionServer = async (transactionId: string): Promise<boolean> => {
        try {
            console.log('🔍 Vérification côté serveur:', transactionId)

            // Appel à l'API de vérification Nuxt
            const response = await $fetch('/api/verify-transaction', {
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
                path: '/order/success',
                query: {
                    transactionId: response.transactionId,
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

    // ✅ Fonction principale de traitement du paiement (gestion d'erreur améliorée)
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

            // ✅ Vérifier que le SDK est prêt
            const sdkReady = await ensureKkiaPayReady()
            if (!sdkReady) {
                // ✅ Ne pas faire de throw ici - gérer l'erreur proprement
                console.error('❌ SDK KKiaPay non disponible')
                notificationStore.notifyError(
                    'Service indisponible',
                    'Le service de paiement est momentanément indisponible. Veuillez réessayer dans quelques instants.'
                )
                return // ✅ Return au lieu de throw
            }

            // ✅ Préparer les données de transaction
            const transactionData: TransactionData = {
                orderId: generateOrderId(),
                cartItems: cartStore.items,
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

            // ✅ Ouvrir le widget de paiement avec gestion d'erreur
            try {
                await openPayment(paymentConfig, transactionData)
                console.log('✅ Widget de paiement ouvert avec succès')
            } catch (paymentError) {
                console.error('❌ Erreur lors de l\'ouverture du widget:', paymentError)

                // ✅ Gestion spécifique de l'erreur d'ouverture
                notificationStore.notifyError(
                    'Erreur d\'ouverture',
                    'Impossible d\'ouvrir le widget de paiement. Vérifiez votre connexion et réessayez.'
                )

                // ✅ Nettoyer les listeners si l'ouverture échoue
                clearPaymentListeners()
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
        } finally {
            // ✅ S'assurer que isProcessing est remis à false
            isProcessing.value = false
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