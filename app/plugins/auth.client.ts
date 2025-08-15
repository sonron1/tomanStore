export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore()

    // Vérifier l'authentification au démarrage de l'application côté client
    if (process.client) {
        await authStore.checkAuth()
    }
})