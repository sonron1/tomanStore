export default defineNuxtPlugin(() => {
    if (process.client) {
        const cartStore = useCartStore()

        // Initialisation immédiate
        cartStore.reloadFromStorage()

        // Écouter les changements de localStorage (synchronisation entre onglets)
        window.addEventListener('storage', (e) => {
            if (e.key === 'tomanstore-cart-items') {
                console.log('🔄 Synchronisation panier entre onglets')
                cartStore.reloadFromStorage()
            }
        })
    }
})