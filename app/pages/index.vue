<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white dark:from-primary-700 dark:to-primary-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Bienvenue chez TomanStore 🇧🇯
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-primary-100">
            Découvrez notre collection de t-shirts Made in Bénin
          </p>
          <NuxtLink
              to="/products"
              class="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg shadow-lg"
          >
            Explorer nos produits
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Section des produits populaires -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Produits populaires</h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">Découvrez nos t-shirts les plus appréciés</p>
        </div>

        <!-- Grille des produits -->
        <div v-if="featuredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard
              v-for="product in featuredProducts"
              :key="product.id"
              :product="product"
          />
        </div>

        <!-- Message si pas de produits -->
        <div v-else class="text-center py-8">
          <p class="text-gray-600 dark:text-gray-400">Aucun produit disponible pour le moment.</p>
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

    <!-- ✅ SECTION MODIFIÉE : Avantages adaptés au Bénin et FCFA -->
    <section class="bg-gray-100 dark:bg-gray-800 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Pourquoi choisir TomanStore ?
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            La boutique de référence pour les t-shirts de qualité au Bénin
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Qualité premium</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Nos t-shirts sont fabriqués avec du coton de haute qualité pour un confort optimal au climat béninois.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Prix abordables</h3>
            <!-- ✅ CHANGEMENT : Mention FCFA -->
            <p class="text-gray-600 dark:text-gray-400">
              Des tarifs attractifs de 12 000 à 20 000 FCFA sans compromettre la qualité de nos produits.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Livraison rapide</h3>
            <!-- ✅ CHANGEMENT : Seuil livraison gratuite en FCFA -->
            <p class="text-gray-600 dark:text-gray-400">
              Livraison gratuite dès 25 000 FCFA. Cotonou et Porto-Novo en 24-48h, autres villes 3-5 jours.
            </p>
          </div>
        </div>

        <!-- ✅ NOUVELLE SECTION : Paiement local -->
        <div class="mt-12 bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md">
          <div class="text-center">
            <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              🏦 Paiement sécurisé avec KKiaPay
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Payez en toute sécurité avec Mobile Money, Orange Money ou votre carte bancaire
            </p>
            <div class="flex justify-center items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center">
                <div class="w-6 h-6 bg-green-500 rounded-full mr-2"></div>
                <span>Mobile Money</span>
              </div>
              <div class="flex items-center">
                <div class="w-6 h-6 bg-orange-500 rounded-full mr-2"></div>
                <span>Orange Money</span>
              </div>
              <div class="flex items-center">
                <div class="w-6 h-6 bg-blue-500 rounded-full mr-2"></div>
                <span>Carte Bancaire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {useProductsStore} from "~/stores/products";

const { products } = useProductsStore()

// Afficher seulement les 3 premiers produits sur la page d'accueil
const featuredProducts = computed(() => products.slice(0, 3))

// Meta tags pour la page d'accueil
useSeoMeta({
  title: 'Accueil - TomanStore',
  description: 'Découvrez notre collection de t-shirts de qualité supérieure fabriqués au Bénin. Livraison gratuite dès 25 000 FCFA.',
  keywords: 'tshirt, bénin, mode, vêtements, coton, qualité, livraison gratuite'
})
</script>