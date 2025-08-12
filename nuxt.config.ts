
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
    ],

    pinia: {
        storesDirs: ['./stores/**']
    },

    googleFonts: {
        families: {
            'DM Sans': [300, 400, 500, 600, 700]
        }
    },

    pages: true,

    app: {
        head: {
            title: 'TomanStore - Boutique de T-shirts',
            meta: [
                { name: 'description', content: 'Découvrez notre collection de t-shirts de qualité' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            script: [
                {
                    // ✅ CORRECTION: URL et configuration améliorées
                    src: 'https://cdn.kkiapay.me/k.js',
                    // ✅ Chargement synchrone pour garantir la disponibilité
                    defer: false,
                    async: false,
                    // ✅ Callback pour vérifier le chargement
                    onload: 'console.log("✅ Script KKiaPay chargé")',
                    onerror: 'console.error("❌ Erreur chargement KKiaPay")'
                }
            ]
        }
    },

    ssr: true,

    runtimeConfig: {
        kkiapayPrivateKey: process.env.KKIAPAY_PRIVATE_KEY,
        kkiapaySecret: process.env.KKIAPAY_SECRET,
        public: {
            kkiapayPublicKey: process.env.KKIAPAY_PUBLIC_KEY || '6b2e5b20770411f09d7665c57074dbd4',
            kkiapayBaseUrl: process.env.KKIAPAY_BASE_URL || 'https://api.kkiapay.me/v1',
            isKkiapayDev: true
        }
    }
})