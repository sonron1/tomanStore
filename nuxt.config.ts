export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    srcDir: 'app/',
    serverDir: 'app/server/',

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
    ],

    pinia: {
        storesDirs: ['./stores/**']
    },

    imports: {
        dirs: [
            'composables',
            'utils',
            'stores'
        ],
        imports: [
            {
                from: 'pinia',
                name: 'defineStore'
            },
            {
                from: 'pinia',
                name: 'storeToRefs'
            },
            {
                from: 'pinia',
                name: 'acceptHMRUpdate'
            }
        ]
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
                    src: 'https://cdn.kkiapay.me/k.js',
                    // ✅ CORRECTION : Utilisez SEULEMENT defer, pas async
                    defer: true,
                    crossorigin: 'anonymous'
                }
            ]
        }
    },

    ssr: true,

    experimental: {
        payloadExtraction: false
    },

    runtimeConfig: {
        // Privées (serveur uniquement)
        kkiapayPrivateKey: process.env.NUXT_KKIAPAY_PRIVATE_KEY,
        kkiapaySecret: process.env.NUXT_KKIAPAY_SECRET,

        // Publiques (client + serveur)
        public: {
            // ✅ CORRECTION : Utiliser les bonnes variables d'environnement
            kkiapayPublicKey: process.env.NUXT_PUBLIC_KKIAPAY_PUBLIC_KEY || '6b2e5b20770411f09d7665c57074dbd4',
            kkiapayBaseUrl: process.env.NUXT_PUBLIC_KKIAPAY_BASE_URL || 'https://api.kkiapay.me/v1',
            isKkiapayDev: process.env.NODE_ENV === 'development'
        }
    },

    nitro: {
        experimental: {
            wasm: true
        }
    }
})