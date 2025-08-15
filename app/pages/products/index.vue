<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- En-tête -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        <span v-if="searchQuery">
          Résultats pour "{{ searchQuery }}"
        </span>
        <span v-else>Nos produits</span>
      </h1>
      <p class="text-gray-600 dark:text-gray-400 text-lg">
        <span v-if="searchQuery">
          {{ filteredProducts.length }} produit(s) trouvé(s)
        </span>
        <span v-else>
          Découvrez notre collection de t-shirts made in Bénin
        </span>
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar avec filtres -->
      <div class="lg:col-span-1">
        <div class="card sticky top-8">
          <h2 class="text-lg font-semibold mb-6">Filtres</h2>

          <!-- Filtre par catégorie -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Catégories</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                    v-model="selectedCategory"
                    type="radio"
                    value=""
                    class="text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                >
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Toutes ({{ allProducts.length }})
                </span>
              </label>
              <label
                  v-for="category in categories"
                  :key="category"
                  class="flex items-center"
              >
                <input
                    v-model="selectedCategory"
                    type="radio"
                    :value="category"
                    class="text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                >
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {{ category }} ({{ getProductsByCategory(category).length }})
                </span>
              </label>
            </div>
          </div>

          <!-- ✅ Filtre par prix en FCFA -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Prix</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                    v-model="priceRange"
                    type="radio"
                    value="all"
                    class="text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                >
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Tous les prix</span>
              </label>
              <label class="flex items-center">
                <input
                    v-model="priceRange"
                    type="radio"
                    value="0-15000"
                    class="text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                >
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Moins de 15 000 FCFA</span>
              </label>
              <label class="flex items-center">
                <input
                    v-model="priceRange"
                    type="radio"
                    value="15000-20000"
                    class="text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                >
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">15 000 - 20 000 FCFA</span>
              </label>
              <label class="flex items-center">
                <input
                    v-model="priceRange"
                    type="radio"
                    value="20000-999999"
                    class="text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                >
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Plus de 20 000 FCFA</span>
              </label>
            </div>
          </div>

          <!-- Filtre par couleur -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Couleurs</h3>
            <div class="flex flex-wrap gap-2">
              <button
                  v-for="color in availableColors"
                  :key="color.name"
                  @click="toggleColorFilter(color.name)"
                  :class="[
                  'w-8 h-8 rounded-full border-2 transition-all',
                  selectedColors.includes(color.name)
                    ? 'border-primary-600 scale-110 ring-2 ring-primary-200'
                    : 'border-gray-300 hover:border-gray-400'
                ]"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
              ></button>
            </div>
            <div v-if="selectedColors.length > 0" class="mt-2">
              <div class="flex flex-wrap gap-1">
                <span
                    v-for="color in selectedColors"
                    :key="`selected-${color}`"
                    class="inline-flex items-center px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded-full"
                >
                  {{ color }}
                  <button
                      @click="toggleColorFilter(color)"
                      class="ml-1 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Filtre par taille -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Tailles</h3>
            <div class="flex flex-wrap gap-2">
              <button
                  v-for="size in availableSizes"
                  :key="size"
                  @click="toggleSizeFilter(size)"
                  :class="[
                  'px-3 py-1 border text-xs rounded transition-colors',
                  selectedSizes.includes(size)
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Bouton réinitialiser -->
          <button
              v-if="hasActiveFilters"
              @click="clearAllFilters"
              class="w-full btn-secondary text-center"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      <!-- Zone des produits -->
      <div class="lg:col-span-3">
        <!-- Barre de tri -->
        <div class="flex justify-between items-center mb-6">
          <span class="text-sm text-gray-600 dark:text-gray-400">
            {{ filteredProducts.length }} produit(s) affiché(s)
          </span>
          <select
              v-model="sortBy"
              class="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="default">Trier par défaut</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name">Nom A-Z</option>
          </select>
        </div>

        <!-- Grille des produits -->
        <div v-if="sortedProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProductCard
              v-for="product in sortedProducts"
              :key="product.id"
              :product="product"
          />
        </div>

        <!-- Message si aucun produit -->
        <div v-else class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Aucun produit trouvé</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            <span v-if="searchQuery">
              Essayez de modifier votre recherche ou d'ajuster les filtres.
            </span>
            <span v-else>
              Aucun produit ne correspond aux filtres sélectionnés.
            </span>
          </p>
          <button
              v-if="hasActiveFilters"
              @click="clearAllFilters"
              class="btn-primary"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ✅ AJOUT: Import explicite du store et du type
import type { Product } from '~/types/product'
import { useProductsStore } from '~/stores/products'

const route = useRoute()
const {
  products,
  searchProducts,
  getProductsByCategory,
  getAllCategories,
  getAllColors,
  getAllSizes
} = useProductsStore()

// État réactif pour les filtres
const selectedCategory = ref('')
const priceRange = ref('all')
const selectedColors = ref<string[]>([])
const selectedSizes = ref<string[]>([])
const sortBy = ref('default')

// Terme de recherche depuis l'URL
const searchQuery = computed(() => {
  const search = route.query.search
  if (typeof search === 'string') {
    return search
  } else if (Array.isArray(search)) {
    return search[0] || ''
  }
  return ''
})

// ✅ CORRECTION: Données de base directement depuis le store
const allProducts = computed((): Product[] => {
  return products
})

// Récupérer les données pour les filtres
const categories = computed(() => getAllCategories())
const availableColors = computed(() => {
  const colorMap = new Map<string, string>()

  allProducts.value.forEach(product => {
    product.colors.forEach(color => {
      if (color.available) {
        colorMap.set(color.name, color.hex)
      }
    })
  })

  return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }))
})
const availableSizes = computed(() => getAllSizes())

// Logique de filtrage
const filteredProducts = computed((): Product[] => {
  let result = allProducts.value

  // Filtre par recherche
  if (searchQuery.value) {
    result = searchProducts(searchQuery.value)
  }

  // Filtre par catégorie
  if (selectedCategory.value) {
    result = result.filter(product => product.category === selectedCategory.value)
  }

  // Filtre par prix
  if (priceRange.value !== 'all') {
    const priceParts = priceRange.value.split('-').map(Number)
    const min = priceParts[0]
    const max = priceParts[1]

    // Validation que min et max sont des nombres valides
    if (typeof min === 'number' && !isNaN(min) && typeof max === 'number' && !isNaN(max)) {
      result = result.filter(product => {
        return product.price >= min && product.price < max
      })
    }
  }

  // Filtre par couleurs
  if (selectedColors.value.length > 0) {
    result = result.filter(product =>
        product.colors.some(color =>
            selectedColors.value.includes(color.name) && color.available
        )
    )
  }

  // Filtre par tailles
  if (selectedSizes.value.length > 0) {
    result = result.filter(product =>
        product.sizes.some(size =>
            selectedSizes.value.includes(size.size) && size.available
        )
    )
  }

  return result
})

// Tri des produits
const sortedProducts = computed((): Product[] => {
  const products = [...filteredProducts.value]

  switch (sortBy.value) {
    case 'price-asc':
      return products.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return products.sort((a, b) => b.price - a.price)
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return products
  }
})

// Gestion des filtres
const toggleColorFilter = (colorName: string) => {
  const index = selectedColors.value.indexOf(colorName)
  if (index > -1) {
    selectedColors.value.splice(index, 1)
  } else {
    selectedColors.value.push(colorName)
  }
}

const toggleSizeFilter = (size: string) => {
  const index = selectedSizes.value.indexOf(size)
  if (index > -1) {
    selectedSizes.value.splice(index, 1)
  } else {
    selectedSizes.value.push(size)
  }
}

const hasActiveFilters = computed(() => {
  return selectedCategory.value ||
      priceRange.value !== 'all' ||
      selectedColors.value.length > 0 ||
      selectedSizes.value.length > 0
})

const clearAllFilters = () => {
  selectedCategory.value = ''
  priceRange.value = 'all'
  selectedColors.value = []
  selectedSizes.value = []
}

// Meta tags
useSeoMeta({
  title: searchQuery.value
      ? `Recherche: ${searchQuery.value} - TomanStore`
      : 'Produits - TomanStore',
  description: 'Découvrez notre collection complète de t-shirts fabriqués au Bénin. Prix abordables, qualité premium, livraison gratuite dès 25 000 FCFA.'
})
</script>