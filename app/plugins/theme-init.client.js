import {useThemeStore} from "~/stores/theme.js";

export default defineNuxtPlugin(() => {
    if (process.client) {
        const themeStore = useThemeStore()

        // Initialiser le thème immédiatement pour éviter le flash
        themeStore.loadTheme()
    }
})