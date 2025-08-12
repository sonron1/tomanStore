import { defineStore } from 'pinia'

export interface Notification {
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    duration?: number // en millisecondes, 0 = pas de suppression auto
    persistent?: boolean // si true, ne se supprime pas automatiquement
}

export const useNotificationStore = defineStore('notifications', () => {
    const notifications = ref<Notification[]>([])
    const maxNotifications = 5 // Limite le nombre de notifications affichées

    // ✅ Map pour stocker les timers
    const timers = ref<Map<string, ReturnType<typeof setTimeout>>>(new Map())

    const addNotification = (notification: Omit<Notification, 'id'>) => {
        // ✅ S'assurer qu'on est côté client
        if (!process.client) {
            console.warn('⚠️ Tentative d\'ajout de notification côté serveur - ignorée')
            return ''
        }

        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)

        const newNotification: Notification = {
            id,
            type: notification.type,
            title: notification.title,
            message: notification.message,
            // ✅ FORCER 3 SECONDES
            duration: 3000,
            persistent: false
        }

        console.log('🔔 Nouvelle notification créée:', {
            id: newNotification.id,
            type: newNotification.type,
            title: newNotification.title,
            duration: newNotification.duration
        })

        // Ajouter la notification
        notifications.value.unshift(newNotification)

        // Limiter le nombre de notifications
        if (notifications.value.length > maxNotifications) {
            notifications.value = notifications.value.slice(0, maxNotifications)
        }

        // ✅ TIMER GARANTI CÔTÉ CLIENT
        console.log(`⏱️ Timer démarré pour notification ${id} - 3 secondes`)

        const timer = setTimeout(() => {
            console.log(`🗑️ Suppression automatique de la notification ${id}`)
            removeNotification(id)
        }, 3000)

        // Stocker le timer
        timers.value.set(id, timer)

        return id
    }

    const removeNotification = (id: string) => {
        console.log(`❌ Tentative de suppression notification ${id}`)

        // Nettoyer le timer si il existe
        const timer = timers.value.get(id)
        if (timer) {
            clearTimeout(timer)
            timers.value.delete(id)
            console.log(`⏰ Timer ${id} nettoyé`)
        }

        // Supprimer la notification
        const index = notifications.value.findIndex(n => n.id === id)
        if (index > -1) {
            notifications.value.splice(index, 1)
            console.log(`✅ Notification ${id} supprimée, ${notifications.value.length} restantes`)
        } else {
            console.log(`⚠️ Notification ${id} introuvable`)
        }
    }

    const clearAllNotifications = () => {
        // Nettoyer tous les timers
        timers.value.forEach((timer) => {
            clearTimeout(timer)
        })
        timers.value.clear()

        notifications.value = []
        console.log('🗑️ Toutes les notifications supprimées')
    }

    // ✅ Méthodes avec vérification côté client
    const notifySuccess = (title: string, message: string) => {
        if (!process.client) return ''
        return addNotification({ type: 'success', title, message })
    }

    const notifyError = (title: string, message: string) => {
        if (!process.client) return ''
        return addNotification({ type: 'error', title, message })
    }

    const notifyWarning = (title: string, message: string) => {
        if (!process.client) return ''
        return addNotification({ type: 'warning', title, message })
    }

    const notifyInfo = (title: string, message: string) => {
        if (!process.client) return ''
        return addNotification({ type: 'info', title, message })
    }

    // ✅ Nettoyage au démontage
    if (process.client) {
        window.addEventListener('beforeunload', () => {
            clearAllNotifications()
        })
    }

    return {
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications,
        // Méthodes raccourcies
        notifySuccess,
        notifyError,
        notifyWarning,
        notifyInfo
    }
})