
<template>
  <div class="relative max-w-lg w-full">
    <div class="relative">
      <!-- Input de recherche -->
      <input
          v-model="searchQuery"
          @input="handleSearch"
          @focus="isSearchFocused = true"
          @blur="handleBlur"
          type="text"
          placeholder="Rechercher des t-shirts..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
      >

      <!-- Icône de recherche -->
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
            class="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <!-- Bouton effacer -->
      <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <svg
            class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Suggestions de recherche -->
    <div
        v-if="isSearchFocused && searchQuery && searchSuggestions.length > 0"
        class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <div
          v-for="(suggestion, index) in searchSuggestions"
          :key="`suggestion-${index}`"
          @mousedown="selectSuggestion(suggestion)"
          class="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
      >
        <div class="flex items-center">
          <img
              :src="suggestion.image"
              :alt="suggestion.name"
              class="w-10 h-10 object-cover rounded mr-3"
          >
          <div class="flex-1">
            <h4 class="text-sm font-medium text-gray-900">{{ suggestion.name }}</h4>
            <p class="text-xs text-gray-500">{{ suggestion.category }} - {{ formatPrice(suggestion.price) }}€</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message "Aucun résultat" -->
    <div
        v-if="isSearchFocused && searchQuery && searchSuggestions.length === 0"
        class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500 text-sm"
    >
      Aucun produit trouvé pour "{{ searchQuery }}"
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const router = useRouter()
const { searchProducts } = useProductsStore()

// État réactif
const searchQuery = ref('')
const isSearchFocused = ref(false)
const searchTimeout = ref<NodeJS.Timeout | null>(null)

// Suggestions de recherche (limitées à 5 résultats)
const searchSuggestions = ref<Product[]>([])

// Gérer la recherche avec debouncing
const handleSearch = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }

  searchTimeout.value = setTimeout(() => {
    if (searchQuery.value.trim()) {
      const results = searchProducts(searchQuery.value)
      searchSuggestions.value = results.slice(0, 5) // Limiter à 5 suggestions
    } else {
      searchSuggestions.value = []
    }
  }, 300) // Attendre 300ms après l'arrêt de la saisie
}

// Gérer la perte de focus avec délai pour permettre les clics
const handleBlur = () => {
  setTimeout(() => {
    isSearchFocused.value = false
  }, 200)
}

// Sélectionner une suggestion
const selectSuggestion = (product: Product) => {
  searchQuery.value = product.name
  isSearchFocused.value = false
  searchSuggestions.value = []

  // Rediriger vers la page du produit
  router.push(`/products/${product.id}`)
}

// Effacer la recherche
const clearSearch = () => {
  searchQuery.value = ''
  searchSuggestions.value = []
  isSearchFocused.value = false
}

// Formater le prix
const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

// Recherche en appuyant sur Entrée
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && searchQuery.value.trim()) {
    isSearchFocused.value = false
    // Rediriger vers la page des produits avec le terme de recherche
    router.push({
      path: '/products',
      query: { search: searchQuery.value.trim() }
    })
  }
}

// Écouter les événements clavier
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
})
</script>