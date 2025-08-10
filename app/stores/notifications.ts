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

    const addNotification = (notification: Omit<Notification, 'id'>) => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)

        const newNotification: Notification = {
            id,
            duration: 5000, // 5 secondes par défaut
            persistent: false,
            ...notification
        }

        // Ajouter la notification au début du tableau
        notifications.value.unshift(newNotification)

        // Limiter le nombre de notifications
        if (notifications.value.length > maxNotifications) {
            notifications.value = notifications.value.slice(0, maxNotifications)
        }

        // Auto-suppression si pas persistante et duration > 0
        if (!newNotification.persistent && newNotification.duration && newNotification.duration > 0) {
            setTimeout(() => {
                removeNotification(id)
            }, newNotification.duration)
        }

        return id
    }

    const removeNotification = (id: string) => {
        const index = notifications.value.findIndex(n => n.id === id)
        if (index > -1) {
            notifications.value.splice(index, 1)
        }
    }

    const clearAllNotifications = () => {
        notifications.value = []
    }

    // Méthodes raccourcies pour faciliter l'utilisation
    const notifySuccess = (title: string, message: string, duration?: number) => {
        return addNotification({ type: 'success', title, message, duration })
    }

    const notifyError = (title: string, message: string, persistent?: number) => {
        return addNotification({ type: 'error', title, message, persistent, duration: persistent ? 0 : 8000 })
    }

    const notifyWarning = (title: string, message: string, duration?: number) => {
        return addNotification({ type: 'warning', title, message, duration: duration || 6000 })
    }

    const notifyInfo = (title: string, message: string, duration?: number) => {
        return addNotification({ type: 'info', title, message, duration: duration || 5000 })
    }

    return {
        notifications: readonly(notifications),
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