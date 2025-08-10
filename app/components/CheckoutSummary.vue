<template>
  <div class="card sticky top-8">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
      📋 Récapitulatif de commande
    </h2>

    <!-- Articles du panier -->
    <div class="space-y-4 mb-6">
      <div
          v-for="item in cartItems"
          :key="`${item.product.id}-${item.size}-${item.color}`"
          class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
      >
        <img
            :src="item.product.image"
            :alt="item.product.name"
            class="w-16 h-16 object-cover rounded-lg"
        >
        <div class="flex-1">
          <h3 class="font-medium text-gray-900 dark:text-white text-sm">
            {{ item.product.name }}
          </h3>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span v-if="item.color">{{ item.color }}</span>
            <span v-if="item.color && item.size"> • </span>
            <span v-if="item.size">{{ item.size }}</span>
          </div>
          <div class="flex justify-between items-center mt-2">
            <span class="text-sm text-gray-600 dark:text-gray-300">
              Qté: {{ item.quantity }}
            </span>
            <span class="font-medium text-gray-900 dark:text-white text-sm">
              {{ (item.product.price * item.quantity).toFixed(2) }}€
            </span>
          </div>
        </div>
      </div>

      <!-- Message si panier vide -->
      <div v-if="cartItems.length === 0" class="text-center py-8">
        <div class="text-6xl mb-4">🛒</div>
        <p class="text-gray-500 dark:text-gray-400">Votre panier est vide</p>
        <NuxtLink
            to="/products"
            class="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          Continuer mes achats
        </NuxtLink>
      </div>
    </div>

    <!-- Calculs des totaux -->
    <div v-if="cartItems.length > 0" class="border-t border-gray-200 dark:border-gray-600 pt-6 space-y-3">
      <!-- Sous-total -->
      <div class="flex justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-400">
          Sous-total ({{ itemCount }} article{{ itemCount > 1 ? 's' : '' }})
        </span>
        <span class="font-medium text-gray-900 dark:text-white">
          {{ subtotal.toFixed(2) }}€
        </span>
      </div>

      <!-- Livraison -->
      <div class="flex justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-400">
          Livraison
        </span>
        <span class="font-medium text-gray-900 dark:text-white">
          {{ shippingCost === 0 ? 'Gratuite' : `${shippingCost.toFixed(2)}€` }}
        </span>
      </div>

      <!-- TVA (optionnel) -->
      <div class="flex justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-400">
          TVA (20%)
        </span>
        <span class="font-medium text-gray-900 dark:text-white">
          {{ taxAmount.toFixed(2) }}€
        </span>
      </div>

      <!-- Code promo (s'il y en a un) -->
      <div v-if="discount > 0" class="flex justify-between text-sm text-green-600 dark:text-green-400">
        <span>Remise appliquée</span>
        <span>-{{ discount.toFixed(2) }}€</span>
      </div>

      <!-- Total final -->
      <div class="border-t border-gray-200 dark:border-gray-600 pt-3">
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold text-gray-900 dark:text-white">
            Total
          </span>
          <span class="text-xl font-bold text-blue-600 dark:text-blue-400">
            {{ finalTotal.toFixed(2) }}€
          </span>
        </div>
      </div>
    </div>

    <!-- Code promo -->
    <div v-if="cartItems.length > 0" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
      <div class="flex space-x-2">
        <input
            v-model="promoCode"
            type="text"
            placeholder="Code promo"
            class="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
        <button
            @click="applyPromoCode"
            :disabled="!promoCode.trim() || applyingPromo"
            class="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="applyingPromo">...</span>
          <span v-else>Appliquer</span>
        </button>
      </div>
      <p v-if="promoMessage" :class="[
        'text-xs mt-2',
        promoMessage.includes('invalide') ? 'text-red-500' : 'text-green-500'
      ]">
        {{ promoMessage }}
      </p>
    </div>

    <!-- Informations de sécurité -->
    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
      <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 1L5 6v10h10V6l-5-5zM8 14V9h4v5H8z" clip-rule="evenodd"/>
        </svg>
        <span>Paiement 100% sécurisé</span>
      </div>

      <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
        <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Satisfaction garantie</span>
      </div>

      <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
        <svg class="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
        <span>Retours gratuits sous 30 jours</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PromoCodeMap } from '~/types/checkout'

// UTILISER VOTRE STORE EXISTANT
const { items: cartItems, total: subtotal, itemCount } = useCartStore()
const { shippingCost } = useCheckoutStore()
const { notifySuccess, notifyError } = useNotificationStore()

// État pour le code promo
const promoCode = ref('')
const discount = ref(0)
const applyingPromo = ref(false)
const promoMessage = ref('')

// Calcul de la TVA (20%)
const taxAmount = computed(() => {
  return (subtotal * 0.2)
})

// Total final avec livraison, TVA et remise
const finalTotal = computed(() => {
  return subtotal + shippingCost + taxAmount.value - discount.value
})

// Codes promo disponibles (simulation)
const validPromoCodes: PromoCodeMap = {
  'WELCOME10': {
    discount: 10,
    description: '10€ de remise de bienvenue'
  },
  'SAVE20': {
    discount: 20,
    description: '20€ de remise'
  },
  'FREESHIP': {
    discount: 0,
    freeShipping: true,
    description: 'Livraison gratuite'
  }
}

// Appliquer un code promo
const applyPromoCode = async () => {
  if (!promoCode.value.trim()) return

  applyingPromo.value = true
  promoMessage.value = ''

  try {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000))

    const code = promoCode.value.toUpperCase()
    const promoInfo = validPromoCodes[code]

    if (promoInfo) {
      if (promoInfo.freeShipping) {
        promoMessage.value = `Code appliqué : ${promoInfo.description}`
        notifySuccess('Code promo appliqué !', promoInfo.description)
      } else {
        discount.value = promoInfo.discount
        promoMessage.value = `Code appliqué : ${promoInfo.description}`
        notifySuccess('Code promo appliqué !', `${promoInfo.discount}€ de remise`)
      }

      // Réinitialiser le champ
      promoCode.value = ''
    } else {
      promoMessage.value = 'Code promo invalide'
      notifyError('Code promo invalide', 'Vérifiez votre code et réessayez')
    }
  } catch (error) {
    promoMessage.value = 'Erreur lors de l\'application du code'
    notifyError('Erreur', 'Impossible d\'appliquer le code promo')
  } finally {
    applyingPromo.value = false
  }
}
</script>