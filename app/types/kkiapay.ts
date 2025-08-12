export interface KKiaPayConfig {
    amount: number
    key: string
    callback?: string
    data?: string
    position?: 'left' | 'right' | 'center'
    theme?: string
    sandbox?: boolean
    phone?: string
    name?: string
    email?: string
    paymentmethod?: 'momo' | 'card'
}

export interface KKiaPayResponse {
    transactionId: string
    status: string
    phone?: string
    amount: number
    fees: number
    receivedAmount: number
    paymentMethod: string
    [key: string]: any
}

export interface KKiaPayError {
    message: string
    code?: string
    [key: string]: any
}

declare global {
    interface Window {
        openKkiapayWidget: (config: KKiaPayConfig) => void
        addSuccessListener: (callback: (response: KKiaPayResponse) => void) => void
        addFailedListener: (callback: (error: KKiaPayError) => void) => void
        removeKkiapayListener: () => void
    }
}

export {}