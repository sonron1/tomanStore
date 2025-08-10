<template>
  <header class="header-nav theme-transition">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo et nom de la boutique -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center transition-colors">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-gray-100">TomanStore</span>
          </NuxtLink>
        </div>

        <!-- Barre de recherche (masquée sur mobile) -->
        <div class="hidden md:flex flex-1 max-w-lg mx-8">
          <SearchBar />
        </div>

        <!-- Navigation et actions -->
        <div class="flex items-center space-x-4">
          <!-- Navigation desktop -->
          <nav class="hidden lg:flex space-x-8">
            <NuxtLink
                to="/"
                class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium transition-colors"
                active-class="text-primary-600 dark:text-primary-400"
            >
              Accueil
            </NuxtLink>
            <NuxtLink
                to="/products"
                class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium transition-colors"
                active-class="text-primary-600 dark:text-primary-400"
            >
              Produits
            </NuxtLink>
            <NuxtLink
                to="/about"
                class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium transition-colors"
                active-class="text-primary-600 dark:text-primary-400"
            >
              À propos
            </NuxtLink>
          </nav>

          <!-- Bouton recherche mobile -->
          <button
              @click="toggleMobileSearch"
              class="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>

          <div class="flex items-center space-x-4">
            <!-- Bouton changement de thème -->
            <ThemeSwitcher />
          </div>

          <!-- Icône du panier -->
          <CartIcon />

          <!-- Menu mobile -->
          <button
              @click="toggleMobileMenu"
              class="lg:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Barre de recherche mobile -->
      <div v-if="showMobileSearch" class="md:hidden pb-4">
        <SearchBar />
      </div>

      <!-- Menu mobile -->
      <div v-if="showMobileMenu" class="lg:hidden pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <nav class="flex flex-col space-y-2">
          <NuxtLink
              to="/"
              @click="closeMobileMenu"
              class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-primary-600 dark:text-primary-400"
          >
            Accueil
          </NuxtLink>
          <NuxtLink
              to="/products"
              @click="closeMobileMenu"
              class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-primary-600 dark:text-primary-400"
          >
            Produits
          </NuxtLink>
          <NuxtLink
              to="/about"
              @click="closeMobileMenu"
              class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-primary-600 dark:text-primary-400"
          >
            À propos
          </NuxtLink>
          <NuxtLink
              to="/contact"
              @click="closeMobileMenu"
              class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-primary-600 dark:text-primary-400"
          >
            Contact
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// État pour les menus mobiles
const showMobileMenu = ref(false)
const showMobileSearch = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  showMobileSearch.value = false // Fermer la recherche si ouverte
}

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
  showMobileMenu.value = false // Fermer le menu si ouvert
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
  showMobileSearch.value = false
}

// Fermer les menus en cliquant ailleurs
onMounted(() => {
  const handleClickOutside = () => {
    showMobileMenu.value = false
    showMobileSearch.value = false
  }

  document.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>