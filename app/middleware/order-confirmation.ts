import {useNotificationStore} from "~/stores/notifications";

export default defineNuxtRouteMiddleware((to, from) => {
    // Vérifier si l'utilisateur vient bien de la page de checkout
    const isFromCheckout = from.path === '/checkout'

    // Vérifier s'il y a un état de commande dans sessionStorage
    const hasOrderInSession = process.client && sessionStorage.getItem('recent-order')

    // Vérifier les paramètres de l'URL pour un numéro de commande
    const hasOrderQuery = to.query.order || to.query.orderNumber

    console.log('🔍 Middleware order-confirmation:', {
        isFromCheckout,
        hasOrderInSession: !!hasOrderInSession,
        hasOrderQuery: !!hasOrderQuery,
        fromPath: from.path,
        toPath: to.path
    })

    // Permettre l'accès si conditions remplies
    if (isFromCheckout || hasOrderInSession || hasOrderQuery) {
        return
    }

    // Sinon, rediriger vers la page d'accueil
    if (process.client) {
        const { notifyWarning } = useNotificationStore()
        notifyWarning(
            'Accès restreint',
            'Cette page est accessible uniquement après avoir passé une commande.'
        )
    }

    return navigateTo('/')
})