<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- En-tête de la page -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Nos produits</h1>
      <p class="text-gray-600 text-lg">Découvrez notre collection complète de t-shirts</p>
    </div>

    <!-- Filtres -->
    <div class="mb-8">
      <div class="flex flex-wrap gap-4">
        <button
            @click="selectedCategory = ''"
            :class="[
            'px-4 py-2 rounded-lg transition-colors',
            selectedCategory === ''
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          Tous
        </button>
        <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
            'px-4 py-2 rounded-lg transition-colors',
            selectedCategory === category
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Grille des produits -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
      />
    </div>

    <!-- Message si aucun produit -->
    <div v-if="filteredProducts.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Aucun produit trouvé pour cette catégorie.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { products } = useProductsStore()

const selectedCategory = ref('')

// Récupérer toutes les catégories disponibles
const categories = computed(() => {
  const cats = products.map(product => product.category)
  return [...new Set(cats)]
})

// Filtrer les produits selon la catégorie sélectionnée
const filteredProducts = computed(() => {
  if (selectedCategory.value === '') {
    return products
  }
  return products.filter(product => product.category === selectedCategory.value)
})

// Meta tags pour la page
useSeoMeta({
  title: 'Produits',
  description: 'Découvrez notre collection complète de t-shirts de qualité.'
})
</script>