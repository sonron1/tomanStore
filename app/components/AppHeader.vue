
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
              @click.stop="toggleMobileSearch"
              class="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>

          <!-- Bouton changement de thème (empêcher la propagation) -->
          <div @click.stop="">
            <ThemeSwitcher />
          </div>

          <!-- Icône du panier -->
          <CartIcon />

          <!-- Menu mobile (hamburger) avec animation -->
          <button
              @click.stop="toggleMobileMenu"
              class="lg:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              :aria-expanded="showMobileMenu"
              aria-label="Menu de navigation"
          >
            <!-- Icône hamburger animée (3 barres qui se transforment en X) -->
            <div class="w-5 h-5 relative">
              <span
                  :class="[
                  'absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out',
                  showMobileMenu ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                ]"
              ></span>
              <span
                  :class="[
                  'absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out',
                  showMobileMenu ? 'opacity-0' : 'translate-y-0'
                ]"
              ></span>
              <span
                  :class="[
                  'absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out',
                  showMobileMenu ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                ]"
              ></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Barre de recherche mobile avec animation -->
      <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="showMobileSearch" class="md:hidden pb-4 pt-2">
          <SearchBar />
        </div>
      </Transition>

      <!-- Menu mobile avec animation -->
      <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
      >
        <div
            v-if="showMobileMenu"
            class="lg:hidden pb-4 border-t border-gray-200 dark:border-gray-700 pt-4 bg-white dark:bg-gray-800"
            @click.stop=""
        >
          <nav class="flex flex-col space-y-1">
            <NuxtLink
                to="/"
                @click="closeMobileMenu"
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 text-base font-medium transition-colors rounded-md"
                active-class="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
            >
              🏠 Accueil
            </NuxtLink>
            <NuxtLink
                to="/products"
                @click="closeMobileMenu"
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 text-base font-medium transition-colors rounded-md"
                active-class="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
            >
              🛍️ Produits
            </NuxtLink>
            <NuxtLink
                to="/about"
                @click="closeMobileMenu"
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 text-base font-medium transition-colors rounded-md"
                active-class="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
            >
              ℹ️ À propos
            </NuxtLink>
            <NuxtLink
                to="/contact"
                @click="closeMobileMenu"
                class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 text-base font-medium transition-colors rounded-md"
                active-class="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
            >
              📞 Contact
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
// État pour les menus mobiles
const showMobileMenu = ref(false)
const showMobileSearch = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    showMobileSearch.value = false // Fermer la recherche si le menu s'ouvre
  }
}

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
  if (showMobileSearch.value) {
    showMobileMenu.value = false // Fermer le menu si la recherche s'ouvre
  }
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
  showMobileSearch.value = false
}

// Gestion améliorée des clics extérieurs
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as Element
    const header = document.querySelector('header')

    // Ne fermer que si on clique vraiment en dehors du header
    if (header && !header.contains(target)) {
      showMobileMenu.value = false
      showMobileSearch.value = false
    }
  }

  // Attendre un tick pour éviter la fermeture immédiate
  nextTick(() => {
    document.addEventListener('click', handleClickOutside)
  })

  // Fermer avec la touche Échap (accessibilité)
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMobileMenu()
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>