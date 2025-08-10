<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- En-tête avec résultats de recherche -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        <span v-if="searchQuery">
          Résultats pour "{{ searchQuery }}"
        </span>
        <span v-else>Nos produits</span>
      </h1>
      <p class="text-gray-600 text-lg">
        <span v-if="searchQuery">
          {{ filteredProducts.length }} produit(s) trouvé(s)
        </span>
        <span v-else>
          Découvrez notre collection complète de t-shirts
        </span>
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar avec filtres -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
          <h2 class="text-lg font-semibold mb-6">Filtres</h2>

          <!-- Filtre par catégorie -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Catégories</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                    v-model="selectedCategory"
                    type="radio"
                    value=""
                    class="text-primary-600 focus:ring-primary-500 border-gray-300"
                >
                <span class="ml-2 text-sm text-gray-600">Toutes ({{ allProducts.length }})</span>
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
                    class="text-primary-600 focus:ring-primary-500 border-gray-300"
                >
                <span class="ml-2 text-sm text-gray-600">
                  {{ category }} ({{ getProductsByCategory(category).length }})
                </span>
              </label>
            </div>
          </div>

          <!-- Filtre par prix -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Prix</h3>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                    v-model="priceRange"
                    type="radio"
                    value="all"
                    class="text-primary-600 focus:ring-primary-500 border-gray-300"
                >
                <span class="ml-2 text-sm text-gray-600">Tous les prix</span>
              </label>
              <label class="flex items-center">
                <input
                    v-model="priceRange"
                    type="radio"
                    value="0-25"
                    class="text-primary-600 focus:ring-primary-500 border-gray-300"
                >
                <span class="ml-2 text-sm text-gray-600">Moins de 25€</span>
              </label>
              <label class="flex items-center">
                <input
                    v-model="priceRange"
                    type="radio"
                    value="25-30"
                    class="text-primary-600 focus:ring-primary-500 border-gray-300"
                >
                <span class="ml-2 text-sm text-gray-600">25€ - 30€</span>
              </label>
              <label class="flex items-center">
                <input
                    v-model="priceRange"
                    type="radio"
                    value="30-50"
                    class="text-primary-600 focus:ring-primary-500 border-gray-300"
                >
                <span class="ml-2 text-sm text-gray-600">Plus de 30€</span>
              </label>
            </div>
          </div>

          <!-- Filtre par couleur -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Couleurs</h3>
            <div class="flex flex-wrap gap-2">
              <button
                  v-for="color in availableColors"
                  :key="color.name"
                  @click="toggleColorFilter(color.name)"
                  :class="[
                  'w-8 h-8 rounded-full border-2 transition-all',
                  selectedColors.includes(color.name)
                    ? 'border-primary-600 scale-110'
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
                    class="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                >
                  {{ color }}
                  <button
                      @click="toggleColorFilter(color)"
                      class="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Filtre par taille -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Tailles</h3>
            <div class="flex flex-wrap gap-2">
              <button
                  v-for="size in availableSizes"
                  :key="size"
                  @click="toggleSizeFilter(size)"
                  :class="[
                  'px-3 py-1 border text-xs rounded transition-colors',
                  selectedSizes.includes(size)
                    ? 'border-primary-600 bg-primary-600 text-white'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Bouton réinitialiser les filtres -->
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
          <span class="text-sm text-gray-600">
            {{ filteredProducts.length }} produit(s) affiché(s)
          </span>
          <select
              v-model="sortBy"
              class="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Aucun produit trouvé</h2>
          <p class="text-gray-600 mb-8">
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
import {computed, ref} from "vue";
import {useProductsStore} from "../../stores/products";
import {useRoute, useSeoMeta} from "nuxt/app";

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
const searchQuery = computed(() => route.query.search as string || '')

// Données de base
const allProducts = computed(() => products)
const categories = computed(() => getAllCategories())

// Couleurs et tailles disponibles avec hex
const availableColors = computed(() => {
  const colorsSet = new Set()
  const colorsWithHex: Array<{name: string, hex: string}> = []

  products.forEach(product => {
    product.colors.forEach(color => {
      if (color.available && !colorsSet.has(color.name)) {
        colorsSet.add(color.name)
        colorsWithHex.push({ name: color.name, hex: color.hex })
      }
    })
  })

  return colorsWithHex
})

const availableSizes = computed(() => getAllSizes())

// Produits filtrés
const filteredProducts = computed(() => {
  let filtered = searchQuery.value
      ? searchProducts(searchQuery.value)
      : products

  // Filtre par catégorie
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Filtre par prix
  if (priceRange.value !== 'all') {
    const [min, max] = priceRange.value.split('-').map(Number)
    filtered = filtered.filter(product => {
      if (max) {
        return product.price >= min && product.price <= max
      } else {
        return product.price >= min
      }
    })
  }

  // Filtre par couleurs
  if (selectedColors.value.length > 0) {
    filtered = filtered.filter(product =>
        product.colors.some(color =>
            selectedColors.value.includes(color.name) && color.available
        )
    )
  }

  // Filtre par tailles
  if (selectedSizes.value.length > 0) {
    filtered = filtered.filter(product =>
        product.sizes.some(size =>
            selectedSizes.value.includes(size.size) && size.available
        )
    )
  }

  return filtered
})

// Produits triés
const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]

  switch (sortBy.value) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
})

// Vérifier s'il y a des filtres actifs
const hasActiveFilters = computed(() => {
  return selectedCategory.value !== '' ||
      priceRange.value !== 'all' ||
      selectedColors.value.length > 0 ||
      selectedSizes.value.length > 0
})

// Actions pour les filtres
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

const clearAllFilters = () => {
  selectedCategory.value = ''
  priceRange.value = 'all'
  selectedColors.value = []
  selectedSizes.value = []
  sortBy.value = 'default'
}

// Meta tags dynamiques
useSeoMeta({
  title: () => searchQuery.value
      ? `Recherche: ${searchQuery.value}`
      : 'Produits',
  description: () => searchQuery.value
      ? `Résultats de recherche pour "${searchQuery.value}" - ${filteredProducts.value.length} produits trouvés`
      : 'Découvrez notre collection complète de t-shirts de qualité.'
})
</script>