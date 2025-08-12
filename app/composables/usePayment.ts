import type { KKiaPayResponse, KKiaPayError } from '~/types/kkiapay'
import { usePaymentStore } from "~/stores/payment"
import { useCartStore } from "~/stores/cart"
import { useNotificationStore } from "~/stores/notifications"

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
            console.log('💳 Démarrage du processus de paiement:', { amount, customerInfo })

            paymentStore.setProcessing(true)
            paymentStore.setError(null)

            // ✅ CORRECTION: Configuration conforme à la documentation KKiaPay
            const paymentConfig = {
                amount: amount,
                theme: '#3b82f6',
                data: JSON.stringify({
                    orderId: `TOMAN-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    items: cartStore.items.length
                }),
                sandbox: true, // ✅ Mode test pour le développement
                ...customerInfo
            }

            console.log('🔧 Configuration paiement:', paymentConfig)

            // Ajouter les listeners avant d'ouvrir le widget
            addPaymentListeners(
                (response: KKiaPayResponse) => handlePaymentSuccess(response),
                (error: KKiaPayError) => handlePaymentError(error)
            )

            // Ouvrir le widget de paiement
            await openPayment(paymentConfig)

            console.log('🎯 Widget KKiaPay ouvert avec succès')

        } catch (error) {
            paymentStore.setProcessing(false)
            const errorMessage = error instanceof Error ? error.message : 'Erreur de paiement inconnue'
            paymentStore.setError(errorMessage)

            console.error('❌ Erreur processus paiement:', error)
            notificationStore.notifyError('Erreur de paiement', errorMessage)
        }
    }

    // Gérer le succès du paiement
    const handlePaymentSuccess = (response: KKiaPayResponse) => {
        console.log('🎉 Paiement réussi - Réponse complète:', response)

        try {
            // Mettre à jour le store
            paymentStore.handlePaymentSuccess(response)

            // Vider le panier
            cartStore.clearCart()

            // Notification de succès
            notificationStore.notifySuccess(
                'Paiement réussi !',
                `Transaction ${response.transactionId} effectuée avec succès`
            )

            // Redirection vers la page de confirmation
            navigateTo(`/order-confirmation?transaction=${response.transactionId}`)

        } catch (error) {
            console.error('❌ Erreur lors du traitement du succès:', error)
        } finally {
            // Nettoyer
            paymentStore.setProcessing(false)
            removePaymentListeners()
        }
    }

    // Gérer l'échec du paiement
    const handlePaymentError = (error: KKiaPayError) => {
        console.error('❌ Paiement échoué - Erreur complète:', error)

        try {
            // Mettre à jour le store
            paymentStore.handlePaymentError(error)

            // Notification d'erreur
            const errorMessage = error.message || 'Échec du paiement'
            notificationStore.notifyError('Paiement échoué', errorMessage)

        } catch (err) {
            console.error('❌ Erreur lors du traitement de l\'échec:', err)
        } finally {
            // Nettoyer
            paymentStore.setProcessing(false)
            removePaymentListeners()
        }
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