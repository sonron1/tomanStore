
import { defineStore } from 'pinia'
import type { Product } from '~/types/product'
import { useNotificationStore } from "~/stores/notifications"

export interface CartItem {
    product: Product
    quantity: number
    size: string
    color: string
}

interface CartState {
    items: CartItem[]
    isHydrated: boolean // ✅ AJOUT: Flag pour l'hydratation
}

export const useCartStore = defineStore('cart', {
    state: (): CartState => ({
        items: [],
        isHydrated: false // ✅ AJOUT: Flag pour savoir si les données ont été chargées
    }),

    getters: {
        itemCount(): number {
            return this.items.reduce((total, item) => total + item.quantity, 0)
        },

        total(): number {
            return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
        },

        isFreeShipping(): boolean {
            return this.total >= 25000
        },

        getTotalWithShipping(): number {
            const shippingCost = this.isFreeShipping ? 0 : 2500
            return this.total + shippingCost
        },

        isInCart() {
            return (productId: number, size: string, color: string): boolean => {
                return this.items.some(item =>
                    item.product.id === productId &&
                    item.size === size &&
                    item.color === color
                )
            }
        },

        getItemQuantity() {
            return (productId: number, size: string, color: string): number => {
                const item = this.items.find(item =>
                    item.product.id === productId &&
                    item.size === size &&
                    item.color === color
                )
                return item ? item.quantity : 0
            }
        }
    },

    actions: {
        // ✅ PERSISTANCE MANUELLE
        _saveToStorage(): void {
            if (process.client) {
                try {
                    localStorage.setItem('tomanstore-cart', JSON.stringify(this.items))
                    console.log('💾 Panier sauvegardé:', this.items.length, 'articles')
                } catch (error) {
                    console.error('❌ Erreur sauvegarde panier:', error)
                }
            }
        },

        // ✅ CHARGEMENT DEPUIS LE STORAGE AMÉLIORÉ
        loadFromStorage(): void {
            if (process.client && !this.isHydrated) {
                try {
                    const stored = localStorage.getItem('tomanstore-cart')
                    if (stored) {
                        const parsedItems = JSON.parse(stored)
                        if (Array.isArray(parsedItems)) {
                            this.items = parsedItems
                            console.log('✅ Panier chargé depuis localStorage:', this.items.length, 'articles')
                        }
                    }
                } catch (error) {
                    console.error('❌ Erreur chargement panier:', error)
                    this.items = []
                } finally {
                    this.isHydrated = true
                }
            }
        },

        // ✅ NOUVELLE MÉTHODE: Forcer la synchronisation
        forceSync(): void {
            this.isHydrated = false
            this.loadFromStorage()
        },

        // ✅ FONCTION ADDTOCART AVEC SAUVEGARDE
        addToCart(product: Product, size: string, color: string, quantity: number = 1): boolean {
            const notificationStore = useNotificationStore()
            const { formatPrice } = useCurrency()

            // Validation du produit
            if (!product.inStock) {
                notificationStore.notifyError('Produit indisponible', 'Ce produit n\'est plus en stock')
                return false
            }

            // Vérifier que la taille est disponible
            const selectedSize = product.sizes.find(s => s.size === size && s.available)
            if (!selectedSize) {
                notificationStore.notifyError('Taille indisponible', `La taille ${size} n'est pas disponible`)
                return false
            }

            // Vérifier que la couleur est disponible
            const selectedColor = product.colors.find(c => c.name === color && c.available)
            if (!selectedColor) {
                notificationStore.notifyError('Couleur indisponible', `La couleur ${color} n'est pas disponible`)
                return false
            }

            // Valider la quantité
            if (quantity <= 0 || quantity > 10) {
                notificationStore.notifyError('Quantité invalide', 'La quantité doit être entre 1 et 10')
                return false
            }

            // Chercher si l'article existe déjà
            const existingItemIndex = this.items.findIndex(
                item => item.product.id === product.id &&
                    item.size === size &&
                    item.color === color
            )

            if (existingItemIndex > -1) {
                const existingItem = this.items[existingItemIndex]
                if (existingItem) {
                    const newQuantity = existingItem.quantity + quantity
                    if (newQuantity > 10) {
                        notificationStore.notifyError('Limite atteinte', 'Maximum 10 articles par produit')
                        return false
                    }
                    existingItem.quantity = newQuantity
                }
            } else {
                this.items.push({
                    product: { ...product },
                    quantity,
                    size,
                    color
                })
            }

            // ✅ SAUVEGARDER APRÈS MODIFICATION
            this._saveToStorage()

            notificationStore.notifySuccess(
                'Produit ajouté !',
                `${product.name} (${size}, ${color}) - ${formatPrice(product.price)} FCFA`
            )

            return true
        },

        // ✅ FONCTION UPDATEQUANTITY AVEC SAUVEGARDE
        updateQuantity(productId: number, size: string, color: string, newQuantity: number): boolean {
            const notificationStore = useNotificationStore()

            const itemIndex = this.items.findIndex(
                item => item.product.id === productId &&
                    item.size === size &&
                    item.color === color
            )

            if (itemIndex === -1) {
                return false
            }

            if (newQuantity <= 0) {
                return this.removeFromCart(productId, size, color)
            } else if (newQuantity > 10) {
                notificationStore.notifyError('Limite atteinte', 'Maximum 10 articles par produit')
                return false
            } else {
                const item = this.items[itemIndex]
                if (item) {
                    item.quantity = newQuantity

                    // ✅ SAUVEGARDER APRÈS MODIFICATION
                    this._saveToStorage()

                    notificationStore.notifySuccess(
                        'Quantité mise à jour',
                        `Nouvelle quantité : ${newQuantity}`
                    )
                    return true
                }
                return false
            }
        },

        // ✅ FONCTION REMOVEFROMCART AVEC SAUVEGARDE
        removeFromCart(productId: number, size: string, color: string): boolean {
            const notificationStore = useNotificationStore()

            const itemIndex = this.items.findIndex(
                item => item.product.id === productId &&
                    item.size === size &&
                    item.color === color
            )

            if (itemIndex === -1) {
                return false
            }

            const removedItem = this.items.splice(itemIndex, 1)[0]

            // ✅ SAUVEGARDER APRÈS MODIFICATION
            this._saveToStorage()

            if (removedItem) {
                notificationStore.notifySuccess(
                    'Produit supprimé',
                    `${removedItem.product.name} retiré du panier`
                )
            }

            return true
        },

        // ✅ CLEARCART AVEC SAUVEGARDE
        clearCart(): void {
            const notificationStore = useNotificationStore()
            const itemsCount = this.itemCount
            this.items = []

            // ✅ SAUVEGARDER APRÈS MODIFICATION
            this._saveToStorage()

            if (itemsCount > 0) {
                notificationStore.notifySuccess(
                    'Panier vidé',
                    'Tous les articles ont été supprimés'
                )
            }
        },

        getShippingSavings(): number {
            return this.isFreeShipping ? 2500 : 0
        },

        getAmountForFreeShipping(): number {
            return Math.max(0, 25000 - this.total)
        },

        getUniqueItemsCount(): number {
            return this.items.length
        },

        getItemsByCategory(category: string): CartItem[] {
            return this.items.filter(item => item.product.category === category)
        },

        getAveragePrice(): number {
            if (this.items.length === 0) return 0
            return this.total / this.itemCount
        }
    }
})