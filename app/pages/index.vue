
<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Bienvenue chez TomanStore
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-primary-100">
            Découvrez notre collection de t-shirts de qualité supérieure
          </p>
          <NuxtLink
              to="/products"
              class="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg"
          >
            Explorer nos produits
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Section des produits populaires -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Produits populaires</h2>
          <p class="text-gray-600 text-lg">Découvrez nos t-shirts les plus appréciés</p>
        </div>

        <!-- Grille des produits -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard
              v-for="product in featuredProducts"
              :key="product.id"
              :product="product"
          />
        </div>

        <!-- Bouton voir plus -->
        <div class="text-center mt-12">
          <NuxtLink
              to="/products"
              class="btn-primary inline-block"
          >
            Voir tous les produits
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Section des avantages -->
    <section class="bg-gray-100 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir TomanStore ?</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Qualité premium</h3>
            <p class="text-gray-600">Nos t-shirts sont fabriqués avec des matériaux de haute qualité pour un confort optimal.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Prix compétitifs</h3>
            <p class="text-gray-600">Des tarifs attractifs sans compromettre la qualité de nos produits.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Livraison rapide</h3>
            <p class="text-gray-600">Recevez vos commandes rapidement grâce à notre service de livraison efficace.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { products } = useProductsStore()

// Afficher seulement les 3 premiers produits sur la page d'accueil
const featuredProducts = computed(() => products.slice(0, 3))

// Meta tags pour la page d'accueil
useSeoMeta({
  title: 'Accueil - TomanStore',
  description: 'Découvrez notre collection de t-shirts de qualité supérieure chez TomanStore.'
})
</script>