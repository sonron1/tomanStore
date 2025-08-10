import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'tomanstore-theme'

export const useThemeStore = defineStore('theme', () => {
    const currentTheme = ref<Theme>('light')
    const isDark = ref(false)

    // Fonction pour appliquer le thème
    const applyTheme = (theme: Theme) => {
        if (!process.client) return

        const shouldBeDark = theme === 'dark'
        isDark.value = shouldBeDark

        // Appliquer la classe au document
        if (shouldBeDark) {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')

            // FORCER les couleurs de body en mode sombre
            document.body.style.backgroundColor = '#111827' // gray-900
            document.body.style.color = '#f9fafb' // gray-50 (blanc)
        } else {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')

            // Couleurs par défaut en mode clair
            document.body.style.backgroundColor = '#f9fafb' // gray-50
            document.body.style.color = '#111827' // gray-900
        }

        // Sauvegarder dans localStorage
        localStorage.setItem(STORAGE_KEY, theme)

        console.log('🎨 Thème appliqué:', theme, '- Mode sombre:', shouldBeDark)
    }

    // Fonction pour changer le thème
    const setTheme = (theme: Theme) => {
        currentTheme.value = theme
        applyTheme(theme)
    }

    // Fonction pour basculer entre clair/sombre
    const toggleTheme = () => {
        const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
    }

    // Fonction pour charger le thème depuis le localStorage
    const loadTheme = () => {
        if (!process.client) return

        try {
            const stored = localStorage.getItem(STORAGE_KEY) as Theme
            if (stored && ['light', 'dark'].includes(stored)) {
                currentTheme.value = stored
            } else {
                currentTheme.value = 'light'
            }
            applyTheme(currentTheme.value)
        } catch (error) {
            console.warn('Erreur chargement thème:', error)
            currentTheme.value = 'light'
            applyTheme('light')
        }
    }

    // Initialisation
    onMounted(() => {
        loadTheme()
    })

    return {
        currentTheme: readonly(currentTheme),
        isDark: readonly(isDark),
        setTheme,
        toggleTheme,
        loadTheme
    }
})