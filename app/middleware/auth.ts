export default defineNuxtRouteMiddleware((to) => {
    const { isLoggedIn } = useAuth()

    if (!isLoggedIn.value) {
        const { notifyWarning } = useNotificationStore()
        notifyWarning('Connexion requise', 'Vous devez être connecté pour accéder à cette page')

        return navigateTo('/auth/login')
    }
})