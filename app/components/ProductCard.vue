<template>
  <div class="product-card">
    <!-- Image du produit -->
    <div class="relative overflow-hidden">
      <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
      >
      <div v-if="!product.inStock" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <span class="text-white font-semibold">Rupture de stock</span>
      </div>
    </div>

    <!-- Contenu de la carte -->
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>

      <!-- Prix et catégorie -->
      <div class="flex justify-between items-center mb-3">
        <span class="text-2xl font-bold text-primary-600">{{ formatPrice(product.price) }}€</span>
        <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">{{ product.category }}</span>
      </div>

      <!-- Couleurs disponibles -->
      <div class="flex gap-2 mb-3">
        <div
            v-for="color in product.colors.filter(c => c.available)"
            :key="color.name"
            class="w-6 h-6 rounded-full border-2 border-gray-300"
            :style="{ backgroundColor: color.hex }"
            :title="color.name"
        ></div>
      </div>

      <!-- Tailles disponibles -->
      <div class="flex gap-2 mb-4">
        <span
            v-for="size in product.sizes.filter(s => s.available)"
            :key="size.size"
            class="px-2 py-1 border border-gray-300 rounded text-xs"
        >
          {{ size.size }}
        </span>
      </div>

      <!-- Boutons d'action -->
      <div class="flex gap-2">
        <NuxtLink
            :to="`/products/${product.id}`"
            class="flex-1 btn-secondary text-center"
        >
          Voir détails
        </NuxtLink>
        <button
            @click="quickAdd"
            :disabled="!product.inStock"
            class="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const { addToCart } = useCartStore()

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

const quickAdd = () => {
  if (!props.product.inStock) return

  // Prendre la première couleur et taille disponible
  const availableColor = props.product.colors.find(c => c.available)
  const availableSize = props.product.sizes.find(s => s.available)

  if (availableColor && availableSize) {
    addToCart(props.product, availableSize.size, availableColor.name)
    // Vous pourrez ajouter une notification ici plus tard
  }
}
</script>