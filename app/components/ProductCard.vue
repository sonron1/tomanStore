<template>
  <div class="product-card group cursor-pointer" @click="goToProduct">
    <!-- Image du produit -->
    <div class="aspect-square overflow-hidden">
      <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
      />
    </div>

    <!-- Contenu -->
    <div class="p-6">
      <!-- Catégorie -->
      <span class="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full mb-2">
        {{ product.category }}
      </span>

      <!-- Nom du produit -->
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ product.name }}
      </h3>

      <!-- Description tronquée -->
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Prix et statut stock -->
      <div class="flex items-center justify-between">
        <!-- ✅ CHANGEMENT : Prix en FCFA -->
        <p class="text-xl font-bold text-primary-600 dark:text-primary-400">
          {{ formatPrice(product.price) }} FCFA
        </p>

        <!-- Statut stock -->
        <div class="flex items-center text-sm">
          <div
              :class="[
              'w-2 h-2 rounded-full mr-2',
              product.inStock ? 'bg-green-500' : 'bg-red-500'
            ]"
          ></div>
          <span :class="product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
            {{ product.inStock ? 'En stock' : 'Rupture' }}
          </span>
        </div>
      </div>

      <!-- Couleurs disponibles -->
      <div class="mt-4">
        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-500 dark:text-gray-400 mr-2">Couleurs :</span>
          <div class="flex gap-1">
            <div
                v-for="color in availableColors.slice(0, 4)"
                :key="color.name"
                :class="[
                'w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600',
                'hover:scale-110 transition-transform'
              ]"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
            ></div>
            <span
                v-if="availableColors.length > 4"
                class="text-xs text-gray-500 dark:text-gray-400 ml-1"
            >
              +{{ availableColors.length - 4 }}
            </span>
          </div>
        </div>
      </div>

      <!-- Tailles disponibles -->
      <div class="mt-2">
        <div class="flex items-center gap-1">
          <span class="text-xs text-gray-500 dark:text-gray-400 mr-2">Tailles :</span>
          <div class="flex gap-1 text-xs">
            <span
                v-for="size in availableSizes.slice(0, 4)"
                :key="size.size"
                class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
            >
              {{ size.size }}
            </span>
            <span
                v-if="availableSizes.length > 4"
                class="text-xs text-gray-500 dark:text-gray-400 ml-1"
            >
              +{{ availableSizes.length - 4 }}
            </span>
          </div>
        </div>
      </div>

      <!-- Bouton d'action -->
      <button
          @click.stop="quickAddToCart"
          :disabled="!product.inStock"
          class="w-full mt-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2"
      >
        <span v-if="!product.inStock">Produit indisponible</span>
        <span v-else>Ajouter au panier</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import {useCartStore} from "~/stores/cart";

interface Props {
  product: Product
}

const props = defineProps<Props>()

// ✅ AJOUT : Utilisation du composable currency
const { formatPrice } = useCurrency()
const { addToCart } = useCartStore()

// Couleurs et tailles disponibles
const availableColors = computed(() => {
  return props.product.colors.filter(color => color.available)
})

const availableSizes = computed(() => {
  return props.product.sizes.filter(size => size.available)
})

// Navigation vers la page détail
const goToProduct = () => {
  navigateTo(`/products/${props.product.id}`)
}

// Ajout rapide au panier avec première couleur et taille disponibles
const quickAddToCart = () => {
  if (!props.product.inStock) return

  const firstColor = availableColors.value[0]?.name
  const firstSize = availableSizes.value[0]?.size

  if (firstColor && firstSize) {
    addToCart(props.product, firstSize, firstColor, 1)
  } else {
    // Si pas de couleur/taille disponible, rediriger vers la page détail
    goToProduct()
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>