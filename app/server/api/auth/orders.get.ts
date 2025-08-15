import { requireAuth, createSuccessResponse } from '~/server/utils/auth'
import type { UserOrder } from '~/types/auth'

// Base de données simulée pour les commandes
const userOrders: Record<number, UserOrder[]> = {}

export default defineEventHandler(async (event) => {
    try {
        const currentUser = requireAuth(event)
        const orders = userOrders[currentUser.id] || []

        // Trier par date de création (plus récentes en premier)
        const sortedOrders = orders.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        return createSuccessResponse({ orders: sortedOrders })
    } catch (error: any) {
        if (error.statusCode === 401 || error.statusCode === 403) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Erreur interne du serveur'
        })
    }
})