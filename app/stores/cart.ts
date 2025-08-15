import { defineStore } from 'pinia'
import type { Product } from '~/types/product'

interface CartItem {
    product: Product
    quantity: number
    size: string
    color: string
}

export const useCartStore = defineStore('cart', () => {
    // ✅ État réactif
    const items = ref<CartItem[]>([])
    const isLoaded = ref(false)

    // ✅ Getters calculés - CORRECTION DES BUGS
    const itemCount = computed(() => {
        // ✅ Calcul sécurisé du nombre d'articles
        if (!Array.isArray(items.value)) return 0

        return items.value.reduce((total, item) => {
            const quantity = typeof item.quantity === 'number' ? item.quantity : 0
            return total + quantity
        }, 0)
    })

    const total = computed(() => {
        // ✅ Calcul sécurisé du total
        if (!Array.isArray(items.value)) return 0

        return items.value.reduce((total, item) => {
            const price = typeof item.product?.price === 'number' ? item.product.price : 0
            const quantity = typeof item.quantity === 'number' ? item.quantity : 0
            return total + (price * quantity)
        }, 0)
    })

    const isFreeShipping = computed(() => {
        return total.value >= 25000
    })

    const getTotalWithShipping = computed(() => {
        const shippingCost = isFreeShipping.value ? 0 : 2500
        return total.value + shippingCost
    })

    // ✅ Fonction de sauvegarde dans localStorage
    const _saveToStorage = () => {
        if (process.client) {
            try {
                const dataToSave = items.value.map(item => ({
                    ...item,
                    // ✅ S'assurer que les valeurs sont correctes
                    quantity: typeof item.quantity === 'number' ? item.quantity : 1,
                    size: item.size || 'M',
                    color: item.color || 'Default'
                }))

                localStorage.setItem('cart-items', JSON.stringify(dataToSave))
                console.log('💾 Panier sauvegardé:', dataToSave.length, 'articles, itemCount:', itemCount.value)
            } catch (error) {
                console.error('❌ Erreur sauvegarde panier:', error)
            }
        }
    }

    // ✅ Fonction de chargement depuis localStorage
    const _loadFromStorage = () => {
        if (process.client && !isLoaded.value) {
            try {
                const saved = localStorage.getItem('cart-items')
                if (saved) {
                    const parsedItems = JSON.parse(saved)
                    if (Array.isArray(parsedItems)) {
                        // ✅ Nettoyer et valider les données chargées
                        items.value = parsedItems.map(item => ({
                            product: item.product,
                            quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
                            size: typeof item.size === 'string' ? item.size : 'M',
                            color: typeof item.color === 'string' ? item.color : 'Default'
                        })).filter(item =>
                            // ✅ Filtrer les items invalides
                            item.product &&
                            typeof item.product.id === 'number' &&
                            typeof item.product.price === 'number'
                        )

                        console.log('📂 Panier chargé:', items.value.length, 'articles, itemCount calculé:', itemCount.value)
                    }
                }
            } catch (error) {
                console.error('❌ Erreur chargement panier:', error)
                items.value = []
            }
            isLoaded.value = true
        }
    }

    // ✅ Actions
    const addToCart = (product: Product, quantity: number = 1, size: string = 'M', color: string = 'Default') => {
        // ✅ Validation des paramètres
        if (!product || typeof product.id !== 'number' || typeof product.price !== 'number') {
            console.error('❌ Produit invalide:', product)
            return false
        }

        const validQuantity = typeof quantity === 'number' && quantity > 0 ? quantity : 1
        const validSize = typeof size === 'string' && size.trim() ? size : 'M'
        const validColor = typeof color === 'string' && color.trim() ? color : 'Default'

        try {
            const notificationStore = useNotificationStore()

            // Chercher si l'article existe déjà
            const existingItem = items.value.find(
                item => item.product.id === product.id &&
                    item.size === validSize &&
                    item.color === validColor
            )

            if (existingItem) {
                existingItem.quantity += validQuantity
                console.log('➕ Quantité mise à jour:', existingItem.quantity, 'pour', product.name)
            } else {
                const newItem: CartItem = {
                    product: { ...product },
                    quantity: validQuantity,
                    size: validSize,
                    color: validColor
                }
                items.value.push(newItem)
                console.log('🆕 Nouvel article ajouté:', newItem, 'ItemCount sera:', itemCount.value + validQuantity)
            }

            _saveToStorage()

            notificationStore.notifySuccess(
                'Ajouté au panier !',
                `${product.name} a été ajouté à votre panier`
            )

            console.log('✅ Article ajouté avec succès. ItemCount actuel:', itemCount.value)
            return true
        } catch (error) {
            console.error('❌ Erreur lors de l\'ajout au panier:', error)
            return false
        }
    }

    const removeFromCart = (productId: number, size: string, color: string): boolean => {
        try {
            const notificationStore = useNotificationStore()

            const itemIndex = items.value.findIndex(
                item => item.product.id === productId &&
                    item.size === size &&
                    item.color === color
            )

            if (itemIndex === -1) {
                console.warn('⚠️ Article non trouvé pour suppression')
                return false
            }

            const removedItem = items.value.splice(itemIndex, 1)[0]
            _saveToStorage()

            if (removedItem) {
                notificationStore.notifySuccess(
                    'Produit supprimé',
                    `${removedItem.product.name} retiré du panier`
                )
            }

            console.log('🗑️ Article supprimé:', removedItem?.product.name, 'ItemCount:', itemCount.value)
            return true
        } catch (error) {
            console.error('❌ Erreur lors de la suppression:', error)
            return false
        }
    }

    const updateQuantity = (productId: number, size: string, color: string, newQuantity: number): boolean => {
        if (typeof newQuantity !== 'number' || newQuantity < 0) {
            console.warn('⚠️ Quantité invalide:', newQuantity)
            return false
        }

        if (newQuantity === 0) {
            return removeFromCart(productId, size, color)
        }

        try {
            const item = items.value.find(
                item => item.product.id === productId &&
                    item.size === size &&
                    item.color === color
            )

            if (!item) {
                console.warn('⚠️ Article non trouvé pour mise à jour quantité')
                return false
            }

            const oldQuantity = item.quantity
            item.quantity = newQuantity
            _saveToStorage()

            console.log('🔢 Quantité mise à jour:', oldQuantity, '->', newQuantity, 'ItemCount:', itemCount.value)
            return true
        } catch (error) {
            console.error('❌ Erreur lors de la mise à jour:', error)
            return false
        }
    }

    const clearCart = () => {
        const itemCount = items.value.length
        items.value = []
        _saveToStorage()
        console.log('🗑️ Panier vidé:', itemCount, 'articles supprimés')
    }

    const getItemInCart = (productId: number, size: string, color: string): CartItem | undefined => {
        return items.value.find(
            item => item.product.id === productId &&
                item.size === size &&
                item.color === color
        )
    }

    const isInCart = (productId: number, size?: string, color?: string): boolean => {
        return items.value.some(
            item => item.product.id === productId &&
                (!size || item.size === size) &&
                (!color || item.color === color)
        )
    }

    // ✅ Initialisation automatique côté client
    if (process.client) {
        _loadFromStorage()
    }

    return {
        // État
        items: readonly(items),
        itemCount,
        total,
        isFreeShipping,
        getTotalWithShipping,
        isLoaded: readonly(isLoaded),

        // Actions
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemInCart,
        isInCart,

        // Méthodes internes (exposées pour debug)
        _loadFromStorage,
        _saveToStorage
    }
})