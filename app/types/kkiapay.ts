
// ✅ Types complets pour KKiaPay SDK selon la documentation officielle
export interface KKiaPayConfig {
    key: string               // Clé publique KKiaPay
    amount: number           // Montant en FCFA
    name?: string            // Nom du client
    email?: string           // Email du client
    phone?: string           // Numéro de téléphone
    sandbox?: boolean        // Mode sandbox/test
    data?: string           // Données métier (JSON stringifié)
    callback?: string       // URL de callback
    theme?: string          // Thème du widget (blue, green, red)
    position?: 'left' | 'right' | 'center'  // Position du widget
    partnerId?: string      // ID du partenaire
    reason?: string         // Raison du paiement
}

// ✅ Réponse de succès KKiaPay
export interface KKiaPayResponse {
    transactionId: string    // ID unique de la transaction
    amount: number          // Montant de la transaction
    fees: number           // Frais de transaction
    status: string         // Statut de la transaction
    performedAt: string    // Date de la transaction (ISO)
    reason?: string        // Raison du paiement
    source: {
        type: string       // Type de source (momo, card, etc.)
        name: string       // Nom de la source
    }
    customer?: {
        name?: string      // Nom du client
        email?: string     // Email du client
        phone?: string     // Téléphone du client
    }
}

// ✅ Erreur KKiaPay
export interface KKiaPayError {
    message: string          // Message d'erreur
    reason?: string         // Raison de l'erreur
    code?: string          // Code d'erreur
}

// ✅ Événements KKiaPay
export type KKiaPayEventType = 'success' | 'failed' | 'pending'

// ✅ Données de transaction pour l'application
export interface TransactionData {
    orderId: string         // ID de la commande dans l'app
    cartItems: any[]       // Articles du panier
    shipping: {
        address: string
        city: string
        phone: string
    }
    customer: {
        firstName: string
        lastName: string
        email: string
        phone: string
    }
    totals: {
        subtotal: number
        shipping: number
        total: number
    }
}

// ✅ Extensions globales pour TypeScript
declare global {
    interface Window {
        openKkiapayWidget: (config: KKiaPayConfig) => void
        addKkiapayListener: (event: KKiaPayEventType, callback: (response: any) => void) => void
        removeKkiapayListener: (event: KKiaPayEventType) => void
        kkiaPayLoaded?: boolean
    }
}

export {}