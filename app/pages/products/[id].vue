<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Fil d'Ariane -->
    <nav class="mb-8">
      <ol class="flex items-center space-x-2 text-sm">
        <li><NuxtLink to="/" class="text-gray-500 hover:text-gray-900">Accueil</NuxtLink></li>
        <li class="text-gray-400">/</li>
        <li><NuxtLink to="/products" class="text-gray-500 hover:text-gray-900">Produits</NuxtLink></li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-900">{{ product.name }}</li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Image du produit -->
      <div class="aspect-square">
        <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover rounded-lg shadow-lg"
        >
      </div>

      <!-- Informations du produit -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
        <p class="text-2xl font-bold text-primary-600 mb-6">{{ formatPrice(product.price) }}€</p>

        <div class="mb-6">
          <span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
            {{ product.category }}
          </span>
        </div>

        <p class="text-gray-600 mb-8 leading-relaxed">{{ product.description }}</p>

        <!-- Sélection de la couleur -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3">Couleur</h3>
          <div class="flex gap-3">
            <button
                v-for="color in availableColors"
                :key="color.name"
                @click="selectedColor = color.name"
                :class="[
                'w-10 h-10 rounded-full border-4 transition-all',
                selectedColor === color.name
                  ? 'border-primary-600 scale-110'
                  : 'border-gray-300 hover:border-gray-400'
              ]"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
            ></button>
          </div>
        </div>

        <!-- Sélection de la taille -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-3">Taille</h3>
          <div class="flex gap-3">
            <button
                v-for="size in availableSizes"
                :key="size.size"
                @click="selectedSize = size.size"
                :class="[
                'px-4 py-2 border-2 rounded-lg transition-all',
                selectedSize === size.size
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 hover:border-gray-400'
              ]"
            >
              {{ size.size }}
            </button>
          </div>
        </div>

        <!-- Quantité et ajout au panier -->
        <div class="flex gap-4 mb-8">
          <div class="flex items-center border border-gray-300 rounded-lg">
            <button
                @click="quantity = Math.max(1, quantity - 1)"
                class="px-3 py-2 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span class="px-4 py-2 border-l border-r border-gray-300">{{ quantity }}</span>
            <button
                @click="quantity = Math.min(10, quantity + 1)"
                class="px-3 py-2 hover:bg-gray-100 transition-colors"
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
            <span v-else>Ajouter au panier ({{ formatPrice(product.price * quantity) }}€)</span>
          </button>
        </div>

        <!-- Informations supplémentaires -->
        <div class="border-t pt-8">
          <h3 class="text-lg font-semibold mb-4">Informations produit</h3>
          <ul class="space-y-2 text-gray-600">
            <li>• Matière : 100% coton bio</li>
            <li>• Entretien : Lavage en machine à 30°C</li>
            <li>• Coupe : {{ product.category.toLowerCase() }}</li>
            <li>• Livraison gratuite dès 50€ d'achat</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Message si produit non trouvé -->
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
    <p class="text-gray-600 mb-8">Le produit que vous cherchez n'existe pas ou n'est plus disponible.</p>
    <NuxtLink to="/products" class="btn-primary">
      Retour aux produits
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProductById } = useProductsStore()
const { addToCart: addToCartStore } = useCartStore()

// Récupérer le produit par son ID
const product = computed(() => {
  const id = parseInt(route.params.id as string)
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

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

const addToCart = () => {
  if (product.value && selectedColor.value && selectedSize.value) {
    addToCartStore(product.value, selectedSize.value, selectedColor.value, quantity.value)
    // Vous pourrez ajouter une notification de succès ici
  }
}

// Meta tags dynamiques
useSeoMeta({
  title: () => product.value?.name || 'Produit non trouvé',
  description: () => product.value?.description || 'Produit non trouvé'
})
</script>