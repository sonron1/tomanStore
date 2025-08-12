
// ✅ TYPES CONFORMES À LA DOCUMENTATION KKIAPAY OFFICIELLE

export interface KKiaPayConfig {
    key: string
    amount: number
    phone?: string
    name?: string
    email?: string
    data?: string
    sandbox?: boolean
    theme?: string
    position?: 'center' | 'left' | 'right'
}

export interface KKiaPayResponse {
    transactionId: string
    status: 'SUCCESS'
    amount: number
    phone?: string
    name?: string
    email?: string
    data?: string
}

export interface KKiaPayError {
    status: 'FAILED'
    message: string
    transactionId?: string
}

// ✅ DÉCLARATIONS GLOBALES POUR LE SDK KKIAPAY SELON LA DOCUMENTATION
declare global {
    interface Window {
        // ✅ CORRECTION: API correcte selon la documentation officielle
        openKkiapayWidget: (config: KKiaPayConfig) => void
        // ✅ ÉVÉNEMENTS KKIAPAY
        addKkiapayListener: (event: string, callback: (response: any) => void) => void
        removeKkiapayListener: (event: string) => void
        // ✅ API alternative (selon la documentation)
        kkiapay?: {
            open: (config: KKiaPayConfig) => void
            close: () => void
        }
    }
}

export {}