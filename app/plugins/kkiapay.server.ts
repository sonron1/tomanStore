// ✅ Plugin côté serveur pour la vérification des transactions
export default defineNuxtPlugin(() => {
    console.log('🖥️ Plugin KKiaPay Server - Initialisation...')

    const config = useRuntimeConfig()

    // ✅ Fonction de vérification de transaction côté serveur
    const verifyTransaction = async (transactionId: string) => {
        try {
            const response = await fetch(`${config.public.kkiapayBaseUrl}/transaction/${transactionId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.kkiapayPrivateKey}`,
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()
            console.log('✅ Transaction vérifiée côté serveur:', transactionId)
            return data
        } catch (error) {
            console.error('❌ Erreur vérification transaction:', error)
            throw error
        }
    }

    // ✅ Fournir les fonctions côté serveur
    return {
        provide: {
            kkiapayServer: {
                verifyTransaction
            }
        }
    }
})