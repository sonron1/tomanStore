// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    // Modules nécessaires pour notre boutique
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts'
    ],

    // Configuration Google Fonts
    googleFonts: {
        families: {
            'DM Sans': [300, 400, 500, 600, 700]
        }
    },

    // Configuration des pages
    pages: true,

    // Meta tags par défaut
    app: {
        head: {
            title: 'TomanStore - Boutique de T-shirts',
            meta: [
                { name: 'description', content: 'Découvrez notre collection de t-shirts de qualité' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ]
        }
    }
})