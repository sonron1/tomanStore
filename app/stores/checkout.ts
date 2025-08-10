import { defineStore } from 'pinia'
import type { CheckoutFormData, ShippingOption, PaymentMethod, OrderInfo } from '~/types/checkout'

export const useCheckoutStore = defineStore('checkout', () => {
    // État du formulaire
    const formData = ref<CheckoutFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'France',
        shippingMethod: 'standard',
        paymentMethod: 'card',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
        cardName: '',
        notes: ''
    })

    // État de validation
    const errors = ref<Partial<Record<keyof CheckoutFormData, string>>>({})
    const isSubmitting = ref(false)

    // Options de livraison
    const shippingOptions: ShippingOption[] = [
        {
            id: 'standard',
            name: 'Livraison standard',
            description: 'Livraison en 3-5 jours ouvrés',
            price: 4.99,
            estimatedDays: 5
        },
        {
            id: 'express',
            name: 'Livraison express',
            description: 'Livraison en 1-2 jours ouvrés',
            price: 9.99,
            estimatedDays: 2
        },
        {
            id: 'pickup',
            name: 'Retrait en magasin',
            description: 'Retrait gratuit en magasin',
            price: 0,
            estimatedDays: 1
        }
    ]

    // Méthodes de paiement
    const paymentMethods: PaymentMethod[] = [
        {
            id: 'card',
            name: 'Carte bancaire',
            description: 'Visa, Mastercard, American Express',
            icon: '💳'
        },
        {
            id: 'paypal',
            name: 'PayPal',
            description: 'Paiement sécurisé avec PayPal',
            icon: '🅿️'
        },
        {
            id: 'bank',
            name: 'Virement bancaire',
            description: 'Paiement par virement bancaire',
            icon: '🏦'
        }
    ]

    // Validation du formulaire
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {}

        if (!formData.value.firstName.trim()) {
            newErrors.firstName = 'Le prénom est obligatoire'
        }
        if (!formData.value.lastName.trim()) {
            newErrors.lastName = 'Le nom est obligatoire'
        }
        if (!formData.value.email.trim()) {
            newErrors.email = 'L\'email est obligatoire'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
            newErrors.email = 'Email invalide'
        }
        if (!formData.value.phone.trim()) {
            newErrors.phone = 'Le téléphone est obligatoire'
        }
        if (!formData.value.address.trim()) {
            newErrors.address = 'L\'adresse est obligatoire'
        }
        if (!formData.value.city.trim()) {
            newErrors.city = 'La ville est obligatoire'
        }
        if (!formData.value.postalCode.trim()) {
            newErrors.postalCode = 'Le code postal est obligatoire'
        }

        if (formData.value.paymentMethod === 'card') {
            if (!formData.value.cardNumber?.trim()) {
                newErrors.cardNumber = 'Le numéro de carte est obligatoire'
            }
            if (!formData.value.cardExpiry?.trim()) {
                newErrors.cardExpiry = 'La date d\'expiration est obligatoire'
            }
            if (!formData.value.cardCVC?.trim()) {
                newErrors.cardCVC = 'Le CVC est obligatoire'
            }
            if (!formData.value.cardName?.trim()) {
                newErrors.cardName = 'Le nom sur la carte est obligatoire'
            }
        }

        errors.value = newErrors
        return Object.keys(newErrors).length === 0
    }

    // Calculer le coût de livraison
    const shippingCost = computed(() => {
        const selectedShipping = shippingOptions.find(
            option => option.id === formData.value.shippingMethod
        )
        return selectedShipping?.price || 0
    })

    // Sauvegarder les informations de commande
    const saveOrderToSession = (total: number): OrderInfo | null => {
        if (process.client) {
            const orderInfo: OrderInfo = {
                orderNumber: 'TS-' + Date.now().toString().slice(-6),
                timestamp: Date.now(),
                customerInfo: {
                    firstName: formData.value.firstName,
                    lastName: formData.value.lastName,
                    email: formData.value.email,
                    phone: formData.value.phone,
                    address: formData.value.address,
                    city: formData.value.city,
                    postalCode: formData.value.postalCode,
                    country: formData.value.country
                },
                paymentMethod: formData.value.paymentMethod,
                shippingMethod: formData.value.shippingMethod,
                total: total
            }

            sessionStorage.setItem('recent-order', JSON.stringify(orderInfo))

            setTimeout(() => {
                if (process.client) {
                    sessionStorage.removeItem('recent-order')
                }
            }, 60 * 60 * 1000)

            return orderInfo
        }
        return null
    }

    // Soumettre la commande
    const submitOrder = async () => {
        if (!validateForm()) {
            return { success: false, orderInfo: null }
        }

        isSubmitting.value = true

        try {
            // UTILISER VOTRE STORE CART POUR LE TOTAL
            const { total: cartTotal } = useCartStore()

            await new Promise(resolve => setTimeout(resolve, 2000))

            const orderInfo = saveOrderToSession(cartTotal + shippingCost.value)

            console.log('Commande soumise:', formData.value)
            console.log('Informations de commande sauvegardées:', orderInfo)

            resetForm()
            return { success: true, orderInfo }

        } catch (error) {
            console.error('Erreur lors de la soumission:', error)
            return { success: false, orderInfo: null }
        } finally {
            isSubmitting.value = false
        }
    }

    // Réinitialiser le formulaire
    const resetForm = () => {
        formData.value = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            country: 'France',
            shippingMethod: 'standard',
            paymentMethod: 'card',
            cardNumber: '',
            cardExpiry: '',
            cardCVC: '',
            cardName: '',
            notes: ''
        }
        errors.value = {}
    }

    return {
        formData,
        errors: readonly(errors),
        isSubmitting: readonly(isSubmitting),
        shippingOptions,
        paymentMethods,
        shippingCost,
        validateForm,
        submitOrder,
        resetForm,
        saveOrderToSession
    }
})