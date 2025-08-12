<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <!-- ✅ AJOUT: Composant de debug en développement -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
      <KKiaPayDebug />
    </div>


    <!-- ✅ AJOUT: État de chargement pendant l'hydratation -->
    <div v-if="!isHydrated" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- ✅ AJOUT: Message si panier vide après hydratation -->
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

    <!-- ✅ CONTENU PRINCIPAL: Affiché seulement si le panier contient des articles -->
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Finaliser ma commande</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Complétez vos informations pour valider votre achat
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Formulaire -->
        <div class="space-y-6">
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
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Votre prénom"
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
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Votre nom"
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
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="votre@email.com"
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
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="+229 XX XX XX XX"
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
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Rue, quartier..."
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ville *
                  </label>
                  <select
                      v-model="formData.city"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    Département
                  </label>
                  <input
                      v-model="formData.department"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Littoral, Ouémé..."
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pays
                  </label>
                  <input
                      v-model="formData.country"
                      type="text"
                      readonly
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500"
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
                <label class="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div class="flex items-center">
                    <input
                        v-model="formData.shippingMethod"
                        :value="option.id"
                        type="radio"
                        class="mr-3 text-primary-600 focus:ring-primary-500"
                    >
                    <div>
                      <div class="font-medium text-gray-900 dark:text-white">
                        {{ option.name }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ option.description }}
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium text-gray-900 dark:text-white">
                      {{ option.price === 0 ? 'Gratuit' : `${formatPrice(option.price)} FCFA` }}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Résumé et paiement -->
        <div class="space-y-6">
          <!-- Résumé de commande -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              📋 Résumé de commande
            </h2>

            <!-- Articles -->
            <div class="space-y-3 mb-4 max-h-60 overflow-y-auto">
              <div
                  v-for="item in cartItems"
                  :key="`${item.product.id}-${item.size}-${item.color}`"
                  class="flex items-center space-x-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <img
                    :src="item.product.image"
                    :alt="item.product.name"
                    class="w-12 h-12 object-cover rounded-md"
                    loading="lazy"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-sm text-gray-900 dark:text-white truncate">
                    {{ item.product.name }}
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    {{ item.size }} | {{ item.color }} | Qté: {{ item.quantity }}
                  </p>
                </div>
                <p class="font-semibold text-gray-900 dark:text-white text-sm">
                  {{ formatPrice(item.product.price * item.quantity) }} FCFA
                </p>
              </div>
            </div>

            <!-- Totaux -->
            <div class="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Sous-total</span>
                <span class="text-gray-900 dark:text-white">{{ formatPrice(cartTotal) }} FCFA</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Livraison</span>
                <span class="text-gray-900 dark:text-white">
                  {{ selectedShipping?.price === 0 ? 'Gratuite' : `${formatPrice(selectedShipping?.price || 0)} FCFA` }}
                </span>
              </div>
              <div v-if="!isFreeShipping && cartTotal < 25000" class="text-xs text-gray-500 dark:text-gray-400">
                Plus que {{ formatPrice(25000 - cartTotal) }} FCFA pour la livraison gratuite !
              </div>
              <div class="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                <span class="text-gray-900 dark:text-white">Total</span>
                <span class="text-primary-600 dark:text-primary-400">{{ formatPrice(finalTotal) }} FCFA</span>
              </div>
            </div>
          </div>

          <!-- Section paiement KKiaPay -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              💳 Paiement sécurisé
            </h2>

            <!-- Information sur KKiaPay -->
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div class="flex items-start">
                <div class="w-5 h-5 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0 mt-0.5 mr-3"></div>
                <div>
                  <h3 class="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Paiement via KKiaPay
                  </h3>
                  <p class="text-sm text-blue-700 dark:text-blue-300">
                    Solution de paiement mobile leader en Afrique de l'Ouest
                  </p>
                </div>
              </div>
            </div>

            <!-- Bouton de paiement amélioré -->
            <div class="payment-section">
              <button
                  @click="handlePayment"
                  :disabled="isProcessing || !isFormValid || finalTotal <= 0"
                  :class="[
                  'w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200',
                  isProcessing || !isFormValid
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                ]"
              >
                <div class="flex items-center justify-center space-x-3">
                  <!-- Spinner de chargement -->
                  <svg
                      v-if="isProcessing"
                      class="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                  >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    />
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>

                  <!-- Logo KKiaPay et montant -->
                  <div v-else class="flex items-center space-x-2">
                    <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span class="text-primary-600 font-bold text-xs">K</span>
                    </div>
                    <span>{{ formatPrice(finalTotal) }} FCFA</span>
                  </div>
                </div>

                <div class="mt-1 text-sm opacity-90">
                  <span v-if="isProcessing">Traitement en cours...</span>
                  <span v-else-if="!isFormValid">Complétez le formulaire</span>
                  <span v-else>Payer avec KKiaPay</span>
                </div>
              </button>

              <!-- Informations sur les méthodes de paiement -->
              <div class="mt-4 text-center">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Paiement sécurisé via KKiaPay</p>
                <div class="flex justify-center items-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
                  <div class="flex items-center space-x-1">
                    <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>Mobile Money</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <div class="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span>Orange Money</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span>Carte Bancaire</span>
                  </div>
                </div>
              </div>

              <!-- Erreur de paiement -->
              <div
                  v-if="error"
                  class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <p class="text-red-700 dark:text-red-300 text-sm">{{ error }}</p>
                <button
                    @click="clearError"
                    class="mt-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm underline"
                >
                  Réessayer
                </button>
              </div>
            </div>

            <!-- Informations de sécurité -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div class="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>Paiement sécurisé</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Transaction instantanée</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ✅ IMPORTS NÉCESSAIRES
import { useCartStore } from '~/stores/cart'
import { usePaymentStore } from '~/stores/payment'
import { useNotificationStore } from '~/stores/notifications'
import { usePayment } from '~/composables/usePayment'
import { useKKiaPay } from '~/composables/useKKiaPay'

const cartStore = useCartStore()
const paymentStore = usePaymentStore()
const notificationStore = useNotificationStore()
const { processPayment, isProcessing, error } = usePayment()
const { isKkiaPayReady } = useKKiaPay()
const { formatPrice } = useCurrency()

const { items: cartItems, total: cartTotal, isFreeShipping } = storeToRefs(cartStore)

// ✅ AJOUT: État d'hydratation pour éviter les erreurs SSR
const isHydrated = ref(false)

// ✅ HYDRATATION CÔTÉ CLIENT
onMounted(() => {
  if (process.client) {
    // Forcer le chargement du panier depuis localStorage
    cartStore.forceSync()

    // Marquer comme hydraté après un délai pour laisser le temps au store de se synchroniser
    nextTick(() => {
      isHydrated.value = true
    })
  }
})

// Données du formulaire
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  department: '',
  country: 'Bénin',
  shippingMethod: 'standard'
})

// Options de livraison adaptées au Bénin avec prix en FCFA
const shippingOptions = [
  {
    id: 'standard',
    name: 'Livraison standard',
    description: '3-5 jours ouvrés',
    price: 2500
  },
  {
    id: 'express',
    name: 'Livraison express',
    description: '24-48h (Cotonou & Porto-Novo)',
    price: 5000
  },
  {
    id: 'free',
    name: 'Livraison économique',
    description: '7-10 jours ouvrés',
    price: 1500
  }
]

// Calculs
const selectedShipping = computed(() => {
  return shippingOptions.find(option => option.id === formData.shippingMethod)
})

const shippingCost = computed(() => {
  // Livraison gratuite si > 25000 FCFA
  if (isFreeShipping.value) return 0
  return selectedShipping.value?.price || 0
})

const finalTotal = computed(() => {
  return cartTotal.value + shippingCost.value
})

// Validation du formulaire
const isFormValid = computed(() => {
  return formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.city.trim() !== ''
})

// ✅ FONCTION DE PAIEMENT AMÉLIORÉE
const handlePayment = async () => {
  if (!isFormValid.value || finalTotal.value <= 0) {
    notificationStore.notifyWarning(
        'Formulaire incomplet',
        'Veuillez remplir tous les champs obligatoires'
    )
    return
  }

  if (!isKkiaPayReady.value) {
    notificationStore.notifyError(
        'Service indisponible',
        'Le service de paiement n\'est pas disponible. Veuillez réessayer.'
    )
    return
  }

  try {
    const customerInfo = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone
    }

    await processPayment(finalTotal.value, customerInfo)
  } catch (error) {
    console.error('Erreur lors du paiement:', error)
    notificationStore.notifyError('Erreur', 'Impossible d\'accéder à la page de paiement')
  }
}

// Effacer l'erreur
const clearError = () => {
  paymentStore.clearCurrentTransaction()
}

// Meta tags
useSeoMeta({
  title: 'Checkout - Finaliser ma commande',
  description: 'Finalisez votre commande et procédez au paiement sécurisé avec KKiaPay. Livraison gratuite dès 25 000 FCFA.'
})
</script>