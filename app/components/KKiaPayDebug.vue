<template>
  <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4" v-if="showDebug">
    <h3 class="font-bold mb-2">🔧 Debug KKiaPay SDK</h3>
    <div class="space-y-2 text-sm">
      <p>SDK Prêt: <span :class="isKkiaPayReady ? 'text-green-600' : 'text-red-600'">{{ isKkiaPayReady ? '✅' : '❌' }}</span></p>
      <p>openKkiapayWidget: <span>{{ windowWidgetStatus }}</span></p>
      <p>addKkiapayListener: <span>{{ windowListenerStatus }}</span></p>
      <p>Clé publique: <span>{{ publicKey?.slice(0, 8) }}...</span></p>
      <p>Mode sandbox: <span>{{ sandboxMode ? '✅' : '❌' }}</span></p>

      <button
          @click="testSDK"
          class="bg-blue-500 text-white px-3 py-1 rounded text-xs mt-2"
      >
        🧪 Test SDK
      </button>

      <button
          @click="testPayment"
          class="bg-green-500 text-white px-3 py-1 rounded text-xs mt-2 ml-2"
          :disabled="!isKkiaPayReady"
      >
        💳 Test Paiement (1000 FCFA)
      </button>

      <button @click="forceReloadSDK" class="px-4 py-2 bg-red-500 text-white rounded text-xs ml-2">
        🔄 Recharger SDK
      </button>

      <!-- ✅ Nouveau bouton de diagnostic complet -->
      <button @click="fullDiagnostic" class="px-4 py-2 bg-purple-500 text-white rounded text-xs ml-2">
        🔍 Diagnostic Complet
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKKiaPay } from '~/composables/useKKiaPay'

const { isKkiaPayReady, testSDK, checkKkiaPayReady } = useKKiaPay()
const config = useRuntimeConfig()

const showDebug = ref(process.env.NODE_ENV === 'development')

const windowWidgetStatus = computed(() => {
  if (process.client) {
    return typeof window.openKkiapayWidget
  }
  return 'N/A (SSR)'
})

const windowListenerStatus = computed(() => {
  if (process.client) {
    return typeof window.addKkiapayListener
  }
  return 'N/A (SSR)'
})

const forceReloadSDK = async () => {
  console.log('🔄 Rechargement forcé du SDK...')

  // Supprimer l'ancien script
  const oldScript = document.querySelector('script[src*="kkiapay"]')
  if (oldScript) {
    oldScript.remove()
  }

  // Recharger
  const script = document.createElement('script')
  script.src = 'https://cdn.kkiapay.me/k.js'
  script.onload = () => {
    setTimeout(() => {
      testSDK()
      checkKkiaPayReady()
    }, 1000)
  }
  document.head.appendChild(script)
}

const publicKey = computed(() => config.public.kkiapayPublicKey)
const sandboxMode = computed(() => config.public.isKkiapayDev)

const testPayment = () => {
  if (process.client && window.openKkiapayWidget) {
    try {
      window.openKkiapayWidget({
        key: config.public.kkiapayPublicKey,
        amount: 1000,
        sandbox: true,
        name: 'Test User',
        email: 'test@example.com',
        data: JSON.stringify({ test: true })
      })
    } catch (error) {
      console.error('Erreur test paiement:', error)
    }
  }
}

// ✅ Nouveau diagnostic complet
const fullDiagnostic = () => {
  console.log('🔍 === DIAGNOSTIC COMPLET KKIAPAY ===')
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    isDev: config.public.isKkiapayDev,
    publicKey: config.public.kkiapayPublicKey,
    baseUrl: config.public.kkiapayBaseUrl
  })

  if (process.client) {
    console.log('Window objects:', {
      openKkiapayWidget: typeof window.openKkiapayWidget,
      addKkiapayListener: typeof window.addKkiapayListener,
      removeKkiapayListener: typeof window.removeKkiapayListener,
      waitForKkiaPay: typeof window.waitForKkiaPay,
      kkiaPayLoaded: window.kkiaPayLoaded
    })

    console.log('DOM:', {
      scriptsCount: document.querySelectorAll('script[src*="kkiapay"]').length,
      scripts: Array.from(document.querySelectorAll('script[src*="kkiapay"]')).map(s => s.getAttribute('src'))
    })
  }

  testSDK()
}

onMounted(() => {
  if (process.client) {
    // Attendre un peu puis tester
    setTimeout(() => {
      testSDK()
    }, 2000)
  }
})
</script>