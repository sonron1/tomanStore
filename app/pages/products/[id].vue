<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Fil d'Ariane -->
    <nav class="mb-8">
      <ol class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <li><NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-gray-200">Accueil</NuxtLink></li>
        <li class="text-gray-400 dark:text-gray-500">/</li>
        <li><NuxtLink to="/products" class="hover:text-gray-900 dark:hover:text-gray-200">Produits</NuxtLink></li>
        <li class="text-gray-400 dark:text-gray-500">/</li>
        <li class="text-gray-900 dark:text-white">{{ product.name }}</li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Image du produit -->
      <div class="aspect-square">
        <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover rounded-lg shadow-lg"
            loading="lazy"
        >
      </div>

      <!-- Informations du produit -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ product.name }}</h1>
        <!-- ✅ CHANGEMENT : Prix en FCFA -->
        <p class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6">
          {{ formatPrice(product.price) }} FCFA
        </p>

        <div class="mb-6">
          <span class="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
            {{ product.category }}
          </span>
        </div>

        <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{{ product.description }}</p>

        <!-- Sélection de la couleur -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Couleur</h3>
          <div class="flex gap-3">
            <button
                v-for="color in availableColors"
                :key="color.name"
                @click="selectedColor = color.name"
                :class="[
                'w-10 h-10 rounded-full border-4 transition-all',
                selectedColor === color.name
                  ? 'border-primary-600 scale-110 ring-2 ring-primary-200'
                  : 'border-gray-300 hover:border-gray-400'
              ]"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
            ></button>
          </div>
          <p v-if="selectedColor" class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Couleur sélectionnée : {{ selectedColor }}
          </p>
        </div>

        <!-- Sélection de la taille -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Taille</h3>
          <div class="flex gap-3">
            <button
                v-for="size in availableSizes"
                :key="size.size"
                @click="selectedSize = size.size"
                :disabled="!size.available"
                :class="[
                'px-4 py-2 border-2 rounded-lg transition-all',
                !size.available
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                  : selectedSize === size.size
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 text-gray-900 dark:text-white'
              ]"
            >
              {{ size.size }}
            </button>
          </div>
          <p v-if="selectedSize" class="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Taille sélectionnée : {{ selectedSize }}
          </p>
        </div>

        <!-- Quantité et ajout au panier -->
        <div class="flex gap-4 mb-8">
          <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
                @click="quantity = Math.max(1, quantity - 1)"
                class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                :disabled="quantity <= 1"
            >
              -
            </button>
            <span class="px-4 py-2 border-l border-r border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
              {{ quantity }}
            </span>
            <button
                @click="quantity = Math.min(10, quantity + 1)"
                class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                :disabled="quantity >= 10"
            >
              +
            </button>
          </div>

          <button
              @click="addToCart"
              :disabled="!product.inStock || !selectedColor || !selectedSize"
              class="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!product.inStock">Rupture de stock</span>
            <span v-else-if="!selectedColor || !selectedSize">Choisir couleur et taille</span>
            <!-- ✅ CHANGEMENT : Prix total en FCFA -->
            <span v-else>Ajouter au panier ({{ formatPrice(product.price * quantity) }} FCFA)</span>
          </button>
        </div>

        <!-- Informations supplémentaires -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informations produit</h3>
          <ul class="space-y-2 text-gray-600 dark:text-gray-400">
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              Matière : 100% coton bio de qualité
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
              </svg>
              Entretien : Lavage en machine à 30°C
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15a1 1 0 002 0v-2a1 1 0 00-2 0v2z" clip-rule="evenodd"/>
              </svg>
              Coupe : {{ product.category.toLowerCase() }}
            </li>
            <!-- ✅ CHANGEMENT : Seuil livraison gratuite en FCFA -->
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" clip-rule="evenodd"/>
              </svg>
              Livraison gratuite dès 25 000 FCFA d'achat
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clip-rule="evenodd"/>
              </svg>
              Fabriqué au Bénin 🇧🇯
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Message si produit non trouvé -->
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Produit non trouvé</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      Le produit que vous cherchez n'existe pas ou n'est plus disponible.
    </p>
    <NuxtLink to="/products" class="btn-primary">
      Retour aux produits
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "~/stores/cart";
import {useProductsStore} from "~/stores/products";

const route = useRoute()
const { getProductById } = useProductsStore()
const { addToCart: addToCartStore } = useCartStore()
const { formatPrice } = useCurrency() // ✅ AJOUT : Utilisation du composable currency

// Récupérer le produit par son ID
const product = computed(() => {
  const idParam = route.params.id

  if (!idParam || Array.isArray(idParam)) {
    return undefined
  }

  const id = parseInt(idParam, 10)
  if (isNaN(id)) {
    return undefined
  }

  return getProductById(id)
})

// Variables réactives pour les sélections
const selectedColor = ref('')
const selectedSize = ref('')
const quantity = ref(1)

// Couleurs et tailles disponibles
const availableColors = computed(() => {
  return product.value?.colors.filter(color => color.available) || []
})

const availableSizes = computed(() => {
  return product.value?.sizes.filter(size => size.available) || []
})

// Initialiser les sélections par défaut
watch(product, (newProduct) => {
  if (newProduct) {
    selectedColor.value = availableColors.value[0]?.name || ''
    selectedSize.value = availableSizes.value[0]?.size || ''
  }
}, { immediate: true })

// ✅ CHANGEMENT : Fonction d'ajout au panier améliorée
const addToCart = () => {
  if (product.value && selectedColor.value && selectedSize.value) {
    const success = addToCartStore(product.value, selectedSize.value, selectedColor.value, quantity.value)

    if (success) {
      // Réinitialiser la quantité après ajout réussi
      quantity.value = 1
    }
  }
}

// Meta tags dynamiques
useSeoMeta({
  title: () => product.value?.name || 'Produit non trouvé',
  description: () => product.value?.description || 'Produit non trouvé dans notre boutique de t-shirts Made in Bénin'
})
</script>