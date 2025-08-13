
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <!-- Debug en développement -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
      <KKiaPayDebug v-if="isDev" />
    </div>

    <!-- État de chargement -->
    <div v-if="!isHydrated || !cartStore?.isLoaded" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <span class="ml-4 text-gray-600">Chargement...</span>
    </div>

    <!-- Panier vide -->
    <div v-else-if="cartItems.length === 0" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
      <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m0 0h12.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Votre panier est vide</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Vous devez ajouter des articles à votre panier avant de pouvoir passer commande.
      </p>
      <NuxtLink to="/products" class="btn-primary">
        Explorer nos produits
      </NuxtLink>
    </div>

    <!-- Contenu principal -->
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Finaliser ma commande</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Complétez vos informations pour valider votre achat
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Formulaire -->
        <form @submit.prevent="handleSubmit" class="space-y-6">

          <!-- Informations personnelles -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              👤 Informations personnelles
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prénom *
                </label>
                <input
                    v-model="formData.firstName"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Votre prénom"
                    :disabled="isProcessing"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom *
                </label>
                <input
                    v-model="formData.lastName"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Votre nom"
                    :disabled="isProcessing"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                    v-model="formData.email"
                    type="email"
                    required
                    class="input-field"
                    placeholder="votre@email.com"
                    :disabled="isProcessing"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Téléphone *
                </label>
                <input
                    v-model="formData.phone"
                    type="tel"
                    required
                    class="input-field"
                    placeholder="+229 XX XX XX XX"
                    :disabled="isProcessing"
                />
              </div>
            </div>
          </div>

          <!-- Adresse de livraison -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              🏠 Adresse de livraison
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse *
                </label>
                <input
                    v-model="formData.address"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Rue, quartier..."
                    :disabled="isProcessing"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ville *
                  </label>
                  <select
                      v-model="formData.city"
                      required
                      class="input-field"
                      :disabled="isProcessing"
                  >
                    <option value="">Choisir une ville</option>
                    <option value="Cotonou">Cotonou</option>
                    <option value="Porto-Novo">Porto-Novo</option>
                    <option value="Parakou">Parakou</option>
                    <option value="Abomey-Calavi">Abomey-Calavi</option>
                    <option value="Bohicon">Bohicon</option>
                    <option value="Natitingou">Natitingou</option>
                    <option value="Ouidah">Ouidah</option>
                    <option value="Kandi">Kandi</option>
                    <option value="Lokossa">Lokossa</option>
                    <option value="Abomey">Abomey</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pays
                  </label>
                  <input
                      v-model="formData.country"
                      type="text"
                      readonly
                      class="input-field bg-gray-100 dark:bg-gray-700 text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Mode de livraison -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              🚚 Mode de livraison
            </h2>

            <div class="space-y-3">
              <div
                  v-for="option in shippingOptions"
                  :key="option.id"
                  class="relative"
              >
                <label class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-300 cursor-pointer transition-colors">
                  <input
                      v-model="selectedShipping"
                      :value="option.id"
                      type="radio"
                      name="shipping"
                      class="sr-only"
                      :disabled="isProcessing"
                  >
                  <div class="flex items-center w-full">
                    <div class="w-4 h-4 border-2 border-primary-300 rounded-full mr-3 relative flex-shrink-0">
                      <div
                          v-if="selectedShipping === option.id"
                          class="w-2 h-2 bg-primary-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      ></div>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between">
                        <span class="font-medium text-gray-900 dark:text-white">{{ option.name }}</span>
                        <span class="font-semibold text-gray-900 dark:text-white">
                          {{ option.price === 0 ? 'Gratuit' : `${formatPrice(option.price)} FCFA` }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ option.description }}</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Bouton de paiement -->
          <div class="card">
            <button
                type="submit"
                :disabled="!isFormValid || isProcessing"
                class="w-full btn-payment"
            >
              <span v-if="isProcessing" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours...
              </span>
              <span v-else class="flex items-center justify-center">
                💳 Payer {{ formatPrice(finalTotal) }} FCFA avec KKiaPay
              </span>
            </button>

            <div class="mt-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                🔒 Paiement sécurisé avec KKiaPay • Mode {{ isDev ? 'Test' : 'Production' }}
              </p>
            </div>

            <!-- Debug -->
            <div v-if="isDev" class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p class="text-xs font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🔧 Debug:</p>
              <pre class="text-xs text-yellow-700 dark:text-yellow-300 overflow-auto max-h-40">{{ debugFormData }}</pre>
            </div>
          </div>
        </form>

        <!-- Récapitulatif -->
        <div>
          <CheckoutSummary :shipping-cost="shippingCost" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ✅ Imports corrigés avec storeToRefs
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/cart'

definePageMeta({
  title: 'Finaliser ma commande - TomanStore',
  description: 'Compléter votre commande et procéder au paiement sécurisé'
})

// ✅ Composables et stores avec gestion d'erreur
const cartStore = useCartStore()
const { formatPrice } = useCurrency()
const config = useRuntimeConfig()

// ✅ Variables réactives extraites avec storeToRefs pour maintenir la réactivité
const { items: cartItems, total: cartTotal, isLoaded: cartIsLoaded } = storeToRefs(cartStore)

// ✅ Obtenir processPayment et isProcessing de manière sécurisée
let processPayment: Function
let isProcessing: Ref<boolean>

try {
  const paymentComposable = usePayment()
  processPayment = paymentComposable.processPayment
  isProcessing = paymentComposable.isProcessing
} catch (error) {
  console.error('❌ Erreur initialisation usePayment:', error)
  // Fallback
  isProcessing = ref(false)
  processPayment = async () => {
    console.error('usePayment non disponible')
  }
}

// ✅ États locaux
const isHydrated = ref(false)
const isDev = computed(() => config.public.isKkiapayDev || false)

// ✅ Formulaire
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: 'Bénin'
})

const selectedShipping = ref('standard')

const shippingOptions = [
  {
    id: 'standard',
    name: 'Livraison Standard',
    description: '3-5 jours ouvrés',
    price: 2500
  },
  {
    id: 'express',
    name: 'Livraison Express',
    description: '1-2 jours ouvrés',
    price: 5000
  },
  {
    id: 'free',
    name: 'Livraison Gratuite',
    description: '5-7 jours ouvrés (commande > 25 000 FCFA)',
    price: 0
  }
]

// ✅ Computed properties sécurisées
const subtotal = computed(() => cartTotal.value || 0)

const shippingCost = computed(() => {
  const option = shippingOptions.find(o => o.id === selectedShipping.value)
  return option ? option.price : 0
})

const finalTotal = computed(() => subtotal.value + shippingCost.value)

const isFormValid = computed(() => {
  const requiredFields = [
    formData.firstName.trim(),
    formData.lastName.trim(),
    formData.email.trim(),
    formData.phone.trim(),
    formData.address.trim(),
    formData.city.trim()
  ]

  return requiredFields.every(field => !!field) &&
      selectedShipping.value &&
      cartItems.value.length > 0
})

const debugFormData = computed(() => ({
  storeLoaded: !!cartStore,
  cartLoaded: cartIsLoaded.value,
  formValid: isFormValid.value,
  cartItemsCount: cartItems.value.length,
  subtotal: subtotal.value,
  shippingCost: shippingCost.value,
  finalTotal: finalTotal.value,
  formData: { ...formData },
  selectedShipping: selectedShipping.value
}))

// ✅ Handler amélioré
const handleSubmit = async () => {
  console.log('🚀 handleSubmit déclenchée')

  // Vérifications de sécurité
  if (!cartStore) {
    console.error('❌ Cart store non disponible!')
    return
  }

  if (!isFormValid.value) {
    console.warn('⚠️ Formulaire invalide')
    return
  }

  if (isProcessing.value) {
    console.warn('⚠️ Paiement déjà en cours')
    return
  }

  try {
    const checkoutData = {
      customer: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim()
      },
      shipping: {
        address: formData.address.trim(),
        city: formData.city.trim(),
        phone: formData.phone.trim()
      },
      totals: {
        subtotal: subtotal.value,
        shipping: shippingCost.value,
        total: finalTotal.value
      }
    }

    console.log('🚀 Lancement paiement:', checkoutData)

    if (processPayment) {
      await processPayment(checkoutData)
    } else {
      console.error('❌ processPayment non disponible')
    }

  } catch (error) {
    console.error('❌ Erreur soumission:', error)
  }
}

// ✅ Lifecycle amélioré avec gestion d'erreur
onMounted(async () => {
  console.log('🏗️ Checkout mounted')

  // Attendre que Pinia soit complètement initialisé
  await nextTick()

  try {
    // Forcer le chargement du panier si nécessaire
    if (cartStore && !cartIsLoaded.value) {
      cartStore._loadFromStorage()
    }

    // Attendre encore un tick pour s'assurer que tout est chargé
    await nextTick()

    isHydrated.value = true

    // Auto-sélection livraison gratuite si éligible
    if (subtotal.value >= 25000) {
      selectedShipping.value = 'free'
    }

    console.log('✅ Checkout initialisé:', {
      cartLoaded: cartIsLoaded.value,
      itemsCount: cartItems.value.length,
      subtotal: subtotal.value
    })

  } catch (error) {
    console.error('❌ Erreur lors du montage checkout:', error)
    isHydrated.value = true // Permettre l'affichage malgré l'erreur
  }
})

// ✅ Surveillance des changements de panier
watch(cartItems, (newItems) => {
  console.log('🔄 Panier mis à jour:', newItems.length, 'articles')
}, { deep: true })

// ✅ Surveillance du total pour ajustement automatique de la livraison
watch(subtotal, (newSubtotal) => {
  if (newSubtotal >= 25000 && selectedShipping.value !== 'free') {
    selectedShipping.value = 'free'
    console.log('🎉 Livraison gratuite activée automatiquement')
  }
})
</script>

<style scoped>
.card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
}

.input-field {
  @apply w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-primary {
  @apply px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors;
}

.btn-payment {
  @apply px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-lg;
}

.border-primary-300 {
  @apply border-blue-300;
}

.border-primary-600 {
  @apply border-blue-600;
}

.bg-primary-600 {
  @apply bg-blue-600;
}
</style>