export default defineNuxtPlugin(() => {
    if (process.client) {
        console.log('🔌 Plugin KKiaPay - Initialisation...')

        // Vérifier périodiquement si le SDK se charge
        let checkCount = 0
        const maxChecks = 50

        const checkInterval = setInterval(() => {
            checkCount++

            if (typeof window.openKkiapayWidget === 'function') {
                console.log('✅ Plugin KKiaPay - SDK détecté!')
                clearInterval(checkInterval)

                // Émettre un événement personnalisé
                window.dispatchEvent(new CustomEvent('kkiapay-ready'))
            } else if (checkCount >= maxChecks) {
                console.error('❌ Plugin KKiaPay - Timeout')
                clearInterval(checkInterval)

                // Émettre un événement d'erreur
                window.dispatchEvent(new CustomEvent('kkiapay-error'))
            }
        }, 200)
    }
})