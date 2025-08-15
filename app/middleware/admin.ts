export default defineNuxtRouteMiddleware(() => {
    const { isLoggedIn, isAdmin } = useAuth()

    if (!isLoggedIn.value) {
        const { notifyWarning } = useNotificationStore()
        notifyWarning('Connexion requise', 'Vous devez être connecté pour accéder à cette page')
        return navigateTo('/auth/login')
    }

    if (!isAdmin.value) {
        const { notifyError } = useNotificationStore()
        notifyError('Accès refusé', 'Vous n\'avez pas les droits d\'administration')
        return navigateTo('/')
    }
})