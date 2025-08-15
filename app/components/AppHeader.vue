
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

          <!-- Menu utilisateur (desktop) -->
          <div v-if="isLoggedIn" class="hidden lg:block relative" ref="userMenuRef">
            <button
                @click.stop="toggleUserMenu"
                class="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <img
                  v-if="user?.avatar"
                  :src="user.avatar"
                  :alt="fullName"
                  class="w-8 h-8 rounded-full object-cover"
              />
              <div v-else class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ userInitials }}</span>
              </div>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown menu utilisateur -->
            <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
              <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
              >
                <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ fullName }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ user?.email }}</p>
                </div>
                <div class="py-1">
                  <NuxtLink
                      to="/profile"
                      @click="closeUserMenu"
                      class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Mon Profil
                  </NuxtLink>
                  <NuxtLink
                      to="/profile/orders"
                      @click="closeUserMenu"
                      class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    Mes Commandes
                  </NuxtLink>
                  <NuxtLink
                      to="/profile/addresses"
                      @click="closeUserMenu"
                      class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    </svg>
                    Mes Adresses
                  </NuxtLink>
                  <button
                      @click="handleLogout"
                      class="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Déconnexion
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Boutons auth pour utilisateurs non connectés (desktop) -->
          <div v-else class="hidden lg:flex items-center space-x-3">
            <NuxtLink
                to="/auth/login"
                class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-3 py-2 text-sm font-medium transition-colors"
            >
              Connexion
            </NuxtLink>
            <NuxtLink
                to="/auth/register"
                class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inscription
            </NuxtLink>
          </div>

          <!-- Bouton changement de thème -->
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
            <!-- Icône hamburger animée -->
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

      <!-- Barre de recherche mobile -->
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

      <!-- Menu mobile -->
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
            <!-- Navigation principale -->
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

            <!-- Séparateur -->
            <hr class="my-2 border-gray-200 dark:border-gray-700">

            <!-- Menu utilisateur mobile -->
            <template v-if="isLoggedIn">
              <div class="px-3 py-2">
                <div class="flex items-center space-x-3">
                  <img
                      v-if="user?.avatar"
                      :src="user.avatar"
                      :alt="fullName"
                      class="w-10 h-10 rounded-full object-cover"
                  />
                  <div v-else class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-medium">{{ userInitials }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ fullName }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ user?.email }}</p>
                  </div>
                </div>
              </div>

              <NuxtLink
                  to="/profile"
                  @click="closeMobileMenu"
                  class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 text-base font-medium transition-colors rounded-md flex items-center"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                👤 Mon Profil
              </NuxtLink>
              <NuxtLink
                  to="/profile/orders"
                  @click="closeMobileMenu"
                  class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 text-base font-medium transition-colors rounded-md flex items-center"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                📦 Mes Commandes
              </NuxtLink>
              <NuxtLink
                  to="/profile/addresses"
                  @click="closeMobileMenu"
                  class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 text-base font-medium transition-colors rounded-md flex items-center"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                🏠 Mes Adresses
              </NuxtLink>
              <button
                  @click="handleLogout"
                  class="text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 text-base font-medium transition-colors rounded-md flex items-center w-full text-left"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                🚪 Déconnexion
              </button>
            </template>

            <!-- Boutons auth mobile pour utilisateurs non connectés -->
            <template v-else>
              <NuxtLink
                  to="/auth/login"
                  @click="closeMobileMenu"
                  class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 text-base font-medium transition-colors rounded-md"
              >
                🔑 Connexion
              </NuxtLink>
              <NuxtLink
                  to="/auth/register"
                  @click="closeMobileMenu"
                  class="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 text-base font-medium transition-colors rounded-md"
              >
                ✨ Inscription
              </NuxtLink>
            </template>
          </nav>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
// Composables d'authentification
const { user, isLoggedIn, fullName, userInitials, logout } = useAuth()

// État pour les menus
const showMobileMenu = ref(false)
const showMobileSearch = ref(false)
const showUserMenu = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)

// Gestion des menus mobiles
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    showMobileSearch.value = false
    showUserMenu.value = false
  }
}

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
  if (showMobileSearch.value) {
    showMobileMenu.value = false
    showUserMenu.value = false
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) {
    showMobileMenu.value = false
    showMobileSearch.value = false
  }
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
  showMobileSearch.value = false
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

// Gestion de la déconnexion
const handleLogout = async () => {
  await logout()
  closeUserMenu()
  closeMobileMenu()
}

// Gestion des clics extérieurs
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as Element
    const header = document.querySelector('header')

    // Fermer les menus si on clique en dehors du header
    if (header && !header.contains(target)) {
      showMobileMenu.value = false
      showMobileSearch.value = false
      showUserMenu.value = false
    }
  }

  // Attendre un tick pour éviter la fermeture immédiate
  nextTick(() => {
    document.addEventListener('click', handleClickOutside)
  })

  // Fermer avec la touche Échap
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMobileMenu()
      closeUserMenu()
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>