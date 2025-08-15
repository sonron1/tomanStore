export default defineNuxtPlugin(async () => {
    console.log('🛒 Initialisation du panier côté client...')

    // ✅ Attendre plusieurs ticks pour s'assurer que Pinia est complètement prêt
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))

    try {
        const cartStore = useCartStore()

        // ✅ Vérifier que le store est disponible et la méthode existe
        if (cartStore && typeof cartStore._loadFromStorage === 'function') {
            // Charger depuis le localStorage
            cartStore._loadFromStorage()

            // Attendre et vérifier le chargement
            await nextTick()

            console.log('✅ Panier initialisé depuis localStorage:', {
                itemCount: cartStore.itemCount,
                totalItems: cartStore.items?.length || 0,
                total: cartStore.total
            })
        } else {
            console.warn('⚠️ Store panier non disponible ou méthode manquante')
        }
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation du panier:', error)
    }
})