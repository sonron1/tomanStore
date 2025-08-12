import type { KKiaPayResponse, KKiaPayError } from '~/types/kkiapay'
import {usePaymentStore} from "~/stores/payment";
import {useCartStore} from "~/stores/cart";
import {useNotificationStore} from "~/stores/notifications";

export const usePayment = () => {
    const paymentStore = usePaymentStore()
    const cartStore = useCartStore()
    const notificationStore = useNotificationStore()
    const { openPayment, addPaymentListeners, removePaymentListeners } = useKKiaPay()

    // Traiter un paiement
    const processPayment = async (
        amount: number,
        customerInfo?: { name?: string, email?: string, phone?: string }
    ) => {
        try {
            paymentStore.setProcessing(true)
            paymentStore.setError(null)

            // Configuration du paiement
            const paymentConfig = {
                amount: amount,
                theme: '#3b82f6',
                data: JSON.stringify({
                    orderId: `ORDER-${Date.now()}`,
                    timestamp: new Date().toISOString()
                }),
                ...customerInfo
            }

            // Ajouter les listeners avant d'ouvrir le widget
            addPaymentListeners(
                (response: KKiaPayResponse) => handlePaymentSuccess(response),
                (error: KKiaPayError) => handlePaymentError(error)
            )

            // Ouvrir le widget de paiement
            await openPayment(paymentConfig)

        } catch (error) {
            paymentStore.setProcessing(false)
            const errorMessage = error instanceof Error ? error.message : 'Erreur de paiement'
            paymentStore.setError(errorMessage)

            notificationStore.notifyError('Erreur', errorMessage, 5000)
            console.error('Erreur lors du processus de paiement:', error)
        }
    }

    // Gérer le succès du paiement
    const handlePaymentSuccess = (response: KKiaPayResponse) => {
        console.log('🎉 Paiement réussi:', response)

        // Mettre à jour le store
        paymentStore.handlePaymentSuccess(response)

        // Vider le panier
        cartStore.clearCart()

        // Notification de succès
        notificationStore.notifySuccess(
            'Paiement réussi !',
            `Transaction ${response.transactionId} effectuée avec succès`,
            5000
        )

        // Redirection
        navigateTo(`/order-confirmation?transaction=${response.transactionId}`)

        // Nettoyer les listeners
        removePaymentListeners()
    }

    // Gérer l'échec du paiement
    const handlePaymentError = (error: KKiaPayError) => {
        console.error('❌ Erreur de paiement:', error)

        // Mettre à jour le store
        paymentStore.handlePaymentError(error)

        // Notification d'erreur
        const errorMessage = error.message || 'Erreur lors du paiement'
        notificationStore.notifyError('Paiement échoué', errorMessage, 5000)

        // Nettoyer les listeners
        removePaymentListeners()
    }

    return {
        processPayment,
        handlePaymentSuccess,
        handlePaymentError,
        // États réactifs du store
        isProcessing: computed(() => paymentStore.isProcessing),
        error: computed(() => paymentStore.error),
        currentTransaction: computed(() => paymentStore.currentTransaction)
    }
}