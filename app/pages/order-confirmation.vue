<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- En-tête de succès -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-6">
          <svg class="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎉 Commande confirmée !
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-2">
          Merci pour votre achat !
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          Votre commande <strong>#{{ orderNumber }}</strong> a été enregistrée avec succès.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <!-- Détails de la commande -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Détails de votre commande
          </h2>

          <div class="space-y-4">
            <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-gray-600 dark:text-gray-400">Numéro de commande</span>
              <span class="font-medium text-gray-900 dark:text-white">#{{ orderNumber }}</span>
            </div>

            <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-gray-600 dark:text-gray-400">Date de commande</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ orderDate }}</span>
            </div>

            <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-gray-600 dark:text-gray-400">Status</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                En traitement
              </span>
            </div>

            <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-gray-600 dark:text-gray-400">Mode de paiement</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ paymentMethod }}</span>
            </div>

            <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-gray-600 dark:text-gray-400">Mode de livraison</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ shippingMethod }}</span>
            </div>

            <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
              <span class="text-gray-600 dark:text-gray-400">Livraison estimée</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ estimatedDelivery }}</span>
            </div>

            <div class="flex justify-between py-2 text-lg font-semibold">
              <span class="text-gray-900 dark:text-white">Total payé</span>
              <span class="text-blue-600 dark:text-blue-400">{{ totalAmount }}€</span>
            </div>
          </div>
        </div>

        <!-- Informations de livraison -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Adresse de livraison
          </h2>

          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div class="font-medium text-gray-900 dark:text-white mb-2">
              {{ customerInfo.firstName }} {{ customerInfo.lastName }}
            </div>
            <div class="text-gray-600 dark:text-gray-400 space-y-1">
              <div>{{ customerInfo.address }}</div>
              <div>{{ customerInfo.postalCode }} {{ customerInfo.city }}</div>
              <div>{{ customerInfo.country }}</div>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
              <div class="text-sm text-gray-600 dark:text-gray-400">
                <div>📧 {{ customerInfo.email }}</div>
                <div>📱 {{ customerInfo.phone }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Prochaines étapes -->
      <div class="card mt-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Que se passe-t-il maintenant ?
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span class="text-blue-600 dark:text-blue-400 font-semibold text-sm">1</span>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">Confirmation par email</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Vous recevrez un email de confirmation avec tous les détails de votre commande.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
              <span class="text-yellow-600 dark:text-yellow-400 font-semibold text-sm">2</span>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">Préparation</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Nos équipes préparent soigneusement votre commande dans nos entrepôts.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <span class="text-green-600 dark:text-green-400 font-semibold text-sm">3</span>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">Expédition</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Votre commande est expédiée avec un numéro de suivi que nous vous communiquerons.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-8 text-center space-y-4">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
              to="/products"
              class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>
            Continuer mes achats
          </NuxtLink>

          <button
              @click="downloadInvoice"
              class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Télécharger la facture
          </button>
        </div>

        <p class="text-sm text-gray-500 dark:text-gray-400">
          Une question ? <a href="/contact" class="text-blue-600 dark:text-blue-400 hover:underline">Contactez notre service client</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderInfo } from '~/types/checkout'

// Protection de la route avec le middleware
definePageMeta({
  middleware: 'order-confirmation'
})

const route = useRoute()
const { notifySuccess } = useNotificationStore()

// Données de commande
const orderData = ref<OrderInfo | null>(null)
const orderNumber = ref('TS-123456')
const orderDate = ref(new Date().toLocaleDateString('fr-FR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}))

const totalAmount = ref('87.94')
const paymentMethod = ref('Carte bancaire')
const shippingMethod = ref('Livraison standard')

const customerInfo = ref({
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@example.com',
  phone: '+33 6 12 34 56 78',
  address: '123 rue de la République',
  city: 'Paris',
  postalCode: '75001',
  country: 'France'
})

// Charger les données de commande
onMounted(() => {
  try {
    const storedOrder = sessionStorage.getItem('recent-order')
    if (storedOrder) {
      orderData.value = JSON.parse(storedOrder)

      if (orderData.value) {
        orderNumber.value = orderData.value.orderNumber
        totalAmount.value = orderData.value.total.toFixed(2)
        customerInfo.value = orderData.value.customerInfo
        paymentMethod.value = getPaymentMethodLabel(orderData.value.paymentMethod)
        shippingMethod.value = getShippingMethodLabel(orderData.value.shippingMethod)
      }
    }

    const urlOrderNumber = route.query.orderNumber
    if (urlOrderNumber && typeof urlOrderNumber === 'string') {
      orderNumber.value = urlOrderNumber
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
})

// Helpers
const getPaymentMethodLabel = (method: string) => {
  switch (method) {
    case 'card': return 'Carte bancaire'
    case 'paypal': return 'PayPal'
    case 'bank': return 'Virement bancaire'
    default: return 'Carte bancaire'
  }
}

const getShippingMethodLabel = (method: string) => {
  switch (method) {
    case 'standard': return 'Livraison standard'
    case 'express': return 'Livraison express'
    case 'pickup': return 'Retrait en magasin'
    default: return 'Livraison standard'
  }
}

const estimatedDelivery = computed(() => {
  const today = new Date()
  const deliveryDate = new Date(today.getTime() + (5 * 24 * 60 * 60 * 1000))
  return deliveryDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const downloadInvoice = () => {
  notifySuccess(
      'Facture téléchargée',
      'Votre facture a été téléchargée avec succès.'
  )
  console.log('Téléchargement de la facture pour:', orderNumber.value)
}

useSeoMeta({
  title: `Commande confirmée #${orderNumber.value}`,
  description: 'Votre commande a été confirmée avec succès.',
  robots: 'noindex, nofollow'
})
</script>