import {useThemeStore} from "~/stores/theme";

export default defineNuxtPlugin(() => {
    const themeStore = useThemeStore()

    // S'exécuter dès que Nuxt est prêt côté client
    onNuxtReady(() => {
        themeStore.loadTheme()
    })
})