
// ✅ CORRECTION: Import explicite du store
import { useCartStore } from '~/stores/cart'

export default defineNuxtPlugin(() => {
    if (process.client) {
        const cartStore = useCartStore()

        // ✅ CORRECTION: Utiliser loadFromStorage au lieu de reloadFromStorage
        cartStore.loadFromStorage()

        // Écouter les changements de localStorage (synchronisation entre onglets)
        window.addEventListener('storage', (e) => {
            if (e.key === 'tomanstore-cart') {
                console.log('🔄 Synchronisation panier entre onglets')
                // ✅ CORRECTION: Utiliser loadFromStorage au lieu de reloadFromStorage
                cartStore.loadFromStorage()
            }
        })
    }
})