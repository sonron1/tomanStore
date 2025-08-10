export interface CheckoutFormData {
    // Informations personnelles
    firstName: string
    lastName: string
    email: string
    phone: string

    // Adresse de livraison
    address: string
    city: string
    postalCode: string
    country: string

    // Méthode de livraison
    shippingMethod: 'standard' | 'express' | 'pickup'

    // Méthode de paiement
    paymentMethod: 'card' | 'paypal' | 'bank'

    // Informations de carte (si paiement par carte)
    cardNumber?: string
    cardExpiry?: string
    cardCVC?: string
    cardName?: string

    // Commentaires
    notes?: string
}

export interface ShippingOption {
    id: string
    name: string
    description: string
    price: number
    estimatedDays: number
}

export interface PaymentMethod {
    id: string
    name: string
    description: string
    icon: string
}

// Types pour les codes promo
export interface PromoCode {
    discount: number
    description: string
    freeShipping?: boolean
}

export interface PromoCodeMap {
    [key: string]: PromoCode
}

// Interface pour les données de commande sauvegardées
export interface OrderInfo {
    orderNumber: string
    timestamp: number
    customerInfo: {
        firstName: string
        lastName: string
        email: string
        phone: string
        address: string
        city: string
        postalCode: string
        country: string
    }
    paymentMethod: string
    shippingMethod: string
    total: number
}