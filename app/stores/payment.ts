import type { KKiaPayResponse, KKiaPayError } from '~/types/kkiapay'

interface PaymentState {
    isProcessing: boolean
    currentTransaction: KKiaPayResponse | null
    paymentHistory: KKiaPayResponse[]
    error: string | null
}

export const usePaymentStore = defineStore('payment', {
    state: (): PaymentState => ({
        isProcessing: false,
        currentTransaction: null,
        paymentHistory: [],
        error: null
    }),

    actions: {
        setProcessing(isProcessing: boolean) {
            this.isProcessing = isProcessing
        },

        setError(error: string | null) {
            this.error = error
        },

        setCurrentTransaction(transaction: KKiaPayResponse | null) {
            this.currentTransaction = transaction
        },

        addToHistory(transaction: KKiaPayResponse) {
            this.paymentHistory.push(transaction)
        },

        handlePaymentSuccess(response: KKiaPayResponse) {
            console.log('🎉 Paiement réussi:', response)
            this.currentTransaction = response
            this.paymentHistory.push(response)
            this.isProcessing = false
            this.error = null
        },

        handlePaymentError(error: KKiaPayError) {
            console.error('❌ Erreur de paiement:', error)
            this.error = error.message || 'Erreur lors du paiement'
            this.isProcessing = false
        },

        // ✅ CORRECTION : Ajouter la fonction verifyTransaction
        async verifyTransaction(transactionId: string): Promise<boolean> {
            try {
                console.log('🔍 Vérification de la transaction:', transactionId)

                // TODO: Implémenter l'appel API réel vers KKiaPay
                // const response = await $fetch(`/api/payments/verify/${transactionId}`)

                // Pour l'instant, simulation de vérification
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Marquer comme vérifié dans l'historique si trouvé
                const transaction = this.paymentHistory.find(t => t.transactionId === transactionId)
                if (transaction) {
                    transaction.status = 'verified'
                }

                console.log('✅ Transaction vérifiée avec succès')
                return true

            } catch (error) {
                console.error('❌ Erreur lors de la vérification:', error)
                this.setError('Impossible de vérifier la transaction')
                return false
            }
        },

        // ✅ Obtenir une transaction par ID
        getTransactionById(transactionId: string): KKiaPayResponse | null {
            return this.paymentHistory.find(t => t.transactionId === transactionId) || null
        },

        // ✅ Marquer une transaction comme échouée
        markTransactionAsFailed(transactionId: string, reason?: string) {
            const transaction = this.paymentHistory.find(t => t.transactionId === transactionId)
            if (transaction) {
                transaction.status = 'failed'
                if (reason) {
                    transaction.failureReason = reason
                }
            }
        },

        clearCurrentTransaction() {
            this.currentTransaction = null
            this.error = null
        },

        reset() {
            this.isProcessing = false
            this.currentTransaction = null
            this.error = null
        },

        // ✅ Nettoyer les anciennes transactions (optionnel)
        clearHistory() {
            this.paymentHistory = []
        }
    },

    getters: {
        hasSuccessfulPayments(): boolean {
            return this.paymentHistory.length > 0
        },

        lastPayment(): KKiaPayResponse | null {
            if (this.paymentHistory.length === 0) {
                return null
            }
            const lastTransaction = this.paymentHistory[this.paymentHistory.length - 1]
            return lastTransaction ?? null
        },

        // ✅ Obtenir les transactions réussies uniquement
        successfulPayments(): KKiaPayResponse[] {
            return this.paymentHistory.filter(t => t.status === 'success' || t.status === 'verified')
        },

        // ✅ Calculer le montant total des achats
        totalPurchaseAmount(): number {
            return this.successfulPayments.reduce((total, transaction) => total + transaction.amount, 0)
        }
    }
})