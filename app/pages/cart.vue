<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Mon panier</h1>

    <!-- Panier vide -->
    <div v-if="items.length === 0" class="text-center py-16">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m0 0h12.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Votre panier est vide</h2>
      <p class="text-gray-600 mb-8">Découvrez notre collection de t-shirts et ajoutez vos favoris !</p>
      <NuxtLink to="/products" class="btn-primary">
        Explorer nos produits
      </NuxtLink>
    </div>

    <!-- Contenu du panier -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Liste des articles -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold">Articles ({{ itemCount }})</h2>
          </div>

          <div class="divide-y divide-gray-200">
            <div
                v-for="item in items"
                :key="`${item.product.id}-${item.size}-${item.color}`"
                class="p-6 flex items-center space-x-4"
            >
              <!-- Image du produit -->
              <div class="flex-shrink-0">
                <img
                    :src="item.product.image"
                    :alt="item.product.name"
                    class="w-20 h-20 object-cover rounded-lg"
                >
              </div>

              <!-- Informations du produit -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900">{{ item.product.name }}</h3>
                <p class="text-sm text-gray-600 mb-2">
                  Taille: {{ item.size }} | Couleur: {{ item.color }}
                </p>
                <p class="text-lg font-semibold text-primary-600">{{ formatPrice(item.product.price) }} FCFA</p>
              </div>

              <!-- Contrôles de quantité -->
              <div class="flex items-center space-x-3">
                <div class="flex items-center border border-gray-300 rounded-lg">
                  <button
                      @click="updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)"
                      class="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span class="px-4 py-2 border-l border-r border-gray-300">{{ item.quantity }}</span>
                  <button
                      @click="updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)"
                      class="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                    @click="removeFromCart(item.product.id, item.size, item.color)"
                    class="text-red-600 hover:text-red-800 transition-colors p-2"
                    title="Supprimer"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Résumé de commande -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
          <h2 class="text-lg font-semibold mb-4">Résumé de commande</h2>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">Sous-total ({{ itemCount }} articles)</span>
              <span class="font-semibold">{{ formatPrice(total) }} FCFA</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Livraison</span>
              <span class="font-semibold">
                <span v-if="isFreeShipping" class="text-green-600">Gratuite</span>
                <span v-else>1 500 FCFA</span>
              </span>
            </div>
            <div v-if="!isFreeShipping" class="text-sm text-gray-500">
              Plus que {{ formatPrice(25000 - total) }} FCFA pour la livraison gratuite !
            </div>
            <div class="border-t pt-3">
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-primary-600">{{ formatPrice(getTotalWithShipping) }} FCFA</span>
              </div>
            </div>
          </div>

          <button
              @click="proceedToCheckout"
              class="w-full btn-primary mb-4"
          >
            Procéder au paiement
          </button>

          <div class="text-center">
            <NuxtLink to="/products" class="text-primary-600 hover:text-primary-800 transition-colors">
              Continuer mes achats
            </NuxtLink>
          </div>

          <!-- Informations de livraison -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="flex items-center text-sm text-gray-600 mb-2">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              Livraison gratuite dès 25 000 FCFA
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Retours gratuits sous 30 jours
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from "~/stores/cart"
import { useNotificationStore } from "~/stores/notifications"
import { useCurrency } from "~/composables/useCurrency"

const cartStore = useCartStore()
const { items, total, itemCount, getTotalWithShipping, isFreeShipping } = storeToRefs(cartStore)
const { updateQuantity, removeFromCart } = cartStore
const { formatPrice } = useCurrency()

const proceedToCheckout = async () => {
  if (items.value.length === 0) {
    const { notifyError } = useNotificationStore()
    notifyError('Erreur', 'Votre panier est vide !')
    return
  }

  try {
    await navigateTo('/checkout')
  } catch (error) {
    console.error('Erreur lors de la redirection:', error)
    const { notifyError } = useNotificationStore()
    notifyError('Erreur', 'Impossible d\'accéder à la page de paiement')
  }
}

watchEffect(() => {
  console.log('🔄 Panier mis à jour:', items.value.length, 'articles', 'Total:', total.value)
})

useSeoMeta({
  title: 'Mon panier',
  description: 'Consultez et modifiez les articles de votre panier.'
})
</script>