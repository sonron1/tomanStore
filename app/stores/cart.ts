import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types/product'

const STORAGE_KEY = 'tomanstore-cart-items'

export const useCartStore = defineStore('cart', () => {
    // État réactif - utiliser shallowRef pour de meilleures performances avec des objets complexes
    const items = ref<CartItem[]>([])

    // Forcer la réactivité avec un trigger
    const cartVersion = ref(0)

    // Fonction pour charger depuis localStorage
    const loadFromStorage = () => {
        if (process.client) {
            try {
                const stored = localStorage.getItem(STORAGE_KEY)
                if (stored) {
                    const parsedItems = JSON.parse(stored)
                    items.value = Array.isArray(parsedItems) ? parsedItems : []
                    cartVersion.value++
                    console.log('✅ Panier chargé:', items.value.length, 'articles')
                }
            } catch (error) {
                console.warn('❌ Erreur chargement panier:', error)
                items.value = []
            }
        }
    }

    // Fonction pour sauvegarder dans localStorage
    const saveToStorage = () => {
        if (process.client) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
                cartVersion.value++ // Forcer la réactivité
                console.log('💾 Panier sauvegardé:', items.value.length, 'articles')
            } catch (error) {
                console.warn('❌ Erreur sauvegarde panier:', error)
            }
        }
    }

    // Charger les données au démarrage
    if (process.client) {
        loadFromStorage()
    }

    // Computed properties avec dépendance au cartVersion pour forcer les recalculs
    const total = computed(() => {
        cartVersion.value // Dépendance explicite pour forcer la réactivité
        return items.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    })

    const itemCount = computed(() => {
        cartVersion.value // Dépendance explicite
        return items.value.reduce((count, item) => count + item.quantity, 0)
    })

    const getTotalWithShipping = computed(() => {
        const subtotal = total.value
        const shipping = subtotal >= 50 ? 0 : 4.99
        return subtotal + shipping
    })

    const isFreeShipping = computed(() => {
        return total.value >= 50
    })

    // Actions avec triggers de réactivité
    const addToCart = (product: Product, size: string, color: string, quantity: number = 1) => {
        const { notifySuccess } = useNotificationStore()

        const existingItem = items.value.find(
            item => item.product.id === product.id && item.size === size && item.color === color
        )

        if (existingItem) {
            existingItem.quantity += quantity
            notifySuccess(
                'Panier mis à jour',
                `Quantité de "${product.name}" mise à jour (${existingItem.quantity})`,
                3000
            )
        } else {
            items.value.push({
                product,
                size,
                color,
                quantity
            })
            notifySuccess(
                'Article ajouté',
                `"${product.name}" a été ajouté à votre panier`,
                3000
            )
        }

        // Sauvegarder et déclencher la réactivité
        saveToStorage()

        // Forcer la mise à jour de l'interface
        nextTick(() => {
            cartVersion.value++
        })
    }

    const removeFromCart = (productId: number, size: string, color: string) => {
        const { notifyInfo } = useNotificationStore()

        const index = items.value.findIndex(
            item => item.product.id === productId && item.size === size && item.color === color
        )

        if (index > -1) {
            const itemToRemove = items.value[index]
            if (itemToRemove) {
                const productName = itemToRemove.product.name

                // Utiliser splice pour maintenir la réactivité
                items.value.splice(index, 1)

                notifyInfo(
                    'Article supprimé',
                    `"${productName}" a été retiré de votre panier`,
                    3000
                )

                // Sauvegarder et déclencher la réactivité
                saveToStorage()

                // Forcer la mise à jour
                nextTick(() => {
                    cartVersion.value++
                })
            }
        }
    }

    const updateQuantity = (productId: number, size: string, color: string, quantity: number) => {
        const item = items.value.find(
            item => item.product.id === productId && item.size === size && item.color === color
        )

        if (item) {
            if (quantity <= 0) {
                removeFromCart(productId, size, color)
            } else {
                const oldQuantity = item.quantity
                item.quantity = quantity

                if (process.client) {
                    const { notifySuccess } = useNotificationStore()
                    notifySuccess(
                        'Quantité mise à jour',
                        `Quantité changée de ${oldQuantity} à ${quantity}`,
                        2000
                    )
                }

                // Sauvegarder et déclencher la réactivité
                saveToStorage()

                // Forcer la mise à jour
                nextTick(() => {
                    cartVersion.value++
                })
            }
        }
    }

    const clearCart = () => {
        const { notifyInfo } = useNotificationStore()
        const previousItemCount = items.value.length

        items.value.length = 0 // Vider le tableau en gardant la réactivité
        saveToStorage()

        if (previousItemCount > 0) {
            notifyInfo(
                'Panier vidé',
                'Tous les articles ont été supprimés de votre panier',
                3000
            )
        }

        // Forcer la mise à jour
        nextTick(() => {
            cartVersion.value++
        })
    }

    const reloadFromStorage = () => {
        loadFromStorage()
    }

    return {
        items: readonly(items),
        total,
        itemCount,
        getTotalWithShipping,
        isFreeShipping,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        reloadFromStorage,
        cartVersion: readonly(cartVersion) // Exposer pour debug si nécessaire
    }
})