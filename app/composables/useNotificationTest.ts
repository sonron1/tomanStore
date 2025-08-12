export const useNotificationTest = () => {
    const { notifySuccess, notifyError, notifyWarning, notifyInfo } = useNotificationStore()

    const testAllNotifications = () => {
        if (!process.client) {
            console.warn('Test notifications disponible seulement côté client')
            return
        }

        console.log('🧪 Test de toutes les notifications...')

        // Test avec délai pour voir la séquence
        notifySuccess('Test Success', 'Cette notification devrait disparaître dans 3 secondes')

        setTimeout(() => {
            notifyError('Test Error', 'Cette notification devrait aussi disparaître dans 3 secondes')
        }, 500)

        setTimeout(() => {
            notifyWarning('Test Warning', 'Cette notification devrait également disparaître dans 3 secondes')
        }, 1000)

        setTimeout(() => {
            notifyInfo('Test Info', 'Cette dernière notification devrait disparaître dans 3 secondes')
        }, 1500)
    }

    return {
        testAllNotifications
    }
}