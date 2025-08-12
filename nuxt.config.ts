// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    // Modules nécessaires pour notre boutique
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
    ],

    pinia: {
        storesDirs: ['./stores/**']
    },


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
            ],
            script: [
                {
                    src: 'https://cdn.kkiapay.me/k.js',
                    defer: true
                }
            ]
        }
    },
    // Configuration pour KKiaPay
    runtimeConfig: {
        // Variables côté serveur (privées)
        kkiapayPrivateKey: process.env.KKIAPAY_PRIVATE_KEY,
        kkiapaySecret: process.env.KKIAPAY_SECRET,

        // Variables côté client (publiques)
        public: {
            kkiapayPublicKey: process.env.KKIAPAY_PUBLIC_KEY || '6b2e5b20770411f09d7665c57074dbd4',
            kkiapayBaseUrl: process.env.KKIAPAY_BASE_URL || 'https://api.kkiapay.me/v1',
            isKkiapayDev: process.env.NODE_ENV === 'development'
        }
    }
})