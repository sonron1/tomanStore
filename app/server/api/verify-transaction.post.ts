// ✅ API de vérification des transactions côté serveur
export default defineEventHandler(async (event) => {
    try {
        const { transactionId } = await readBody(event)

        if (!transactionId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'ID de transaction manquant'
            })
        }

        const config = useRuntimeConfig()

        console.log('🔍 Vérification transaction serveur:', transactionId)

        // ✅ Appel à l'API KKiaPay pour vérifier la transaction
        const response = await fetch(`${config.public.kkiapayBaseUrl}/transaction/${transactionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.kkiapayPrivateKey}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw createError({
                statusCode: response.status,
                statusMessage: `Erreur KKiaPay: ${response.statusText}`
            })
        }

        const transactionData = await response.json()

        console.log('✅ Transaction vérifiée:', {
            id: transactionId,
            status: transactionData.status,
            amount: transactionData.amount
        })

        // ✅ Ici vous pouvez sauvegarder la transaction en base de données
        // await saveTransactionToDatabase(transactionData)

        return {
            success: true,
            data: {
                transactionId,
                status: transactionData.status,
                amount: transactionData.amount,
                verifiedAt: new Date().toISOString()
            }
        }

    } catch (error) {
        console.error('❌ Erreur vérification transaction:', error)

        throw createError({
            statusCode: 500,
            statusMessage: 'Erreur lors de la vérification'
        })
    }
})