<template>
  <header class="header-nav">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo et nom de la boutique -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <span class="text-xl font-bold text-gray-900">TomanStore</span>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink
              to="/"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-primary-600"
          >
            Accueil
          </NuxtLink>
          <NuxtLink
              to="/products"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-primary-600"
          >
            Produits
          </NuxtLink>
          <NuxtLink
              to="/about"
              class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-primary-600"
          >
            À propos
          </NuxtLink>
        </nav>

        <!-- Actions (panier) -->
        <div class="flex items-center space-x-4">
          <CartIcon />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Pas de logique supplémentaire nécessaire pour l'instant
</script>