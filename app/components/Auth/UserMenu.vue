<template>
  <div class="relative" ref="menuRef">
    <!-- Bouton utilisateur -->
    <button
        @click="toggleMenu"
        :class="[
        'flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200',
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
      ]"
        :aria-expanded="showMenu"
        aria-haspopup="true"
    >
      <!-- Avatar utilisateur -->
      <div class="flex-shrink-0">
        <img
            :src="getAvatarUrl(user)"
            :alt="`Avatar de ${fullName}`"
            class="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
        />
      </div>

      <!-- Nom utilisateur (masqué sur mobile) -->
      <div class="hidden sm:block text-left">
        <p class="text-sm font-medium text-gray-900 dark:text-white truncate max-w-32">
          {{ fullName }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">
          {{ user?.email }}
        </p>
      </div>

      <!-- Icône chevron -->
      <svg
          :class="[
          'w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200',
          showMenu ? 'rotate-180' : ''
        ]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Menu déroulant -->
    <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95 translate-y-1"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
          v-if="showMenu"
          class="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 z-50"
          role="menu"
          aria-orientation="vertical"
      >
        <div class="py-2">
          <!-- En-tête du menu avec informations utilisateur -->
          <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-3">
              <img
                  :src="getAvatarUrl(user)"
                  :alt="`Avatar de ${fullName}`"
                  class="w-10 h-10 rounded-full object-cover"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ fullName }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {{ user?.email }}
                </p>
                <div v-if="!isEmailVerified" class="flex items-center mt-1">
                  <svg class="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-xs text-yellow-600 dark:text-yellow-400">Email non vérifié</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Liens du menu -->
          <div class="py-1">
            <NuxtLink
                to="/profile"
                @click="closeMenu"
                class="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                role="menuitem"
            >
              <svg class="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Mon profil
            </NuxtLink>

            <NuxtLink
                to="/profile/orders"
                @click="closeMenu"
                class="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                role="menuitem"
            >
              <svg class="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Mes commandes
            </NuxtLink>

            <NuxtLink
                to="/profile/addresses"
                @click="closeMenu"
                class="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                role="menuitem"
            >
              <svg class="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Mes adresses
            </NuxtLink>

            <!-- Séparateur -->
            <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>

            <!-- Actions admin (si applicable) -->
            <NuxtLink
                v-if="isAdmin"
                to="/admin"
                @click="closeMenu"
                class="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                role="menuitem"
            >
              <svg class="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Administration
            </NuxtLink>

            <!-- Préférences -->
            <button
                @click="togglePreferences"
                class="group flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                role="menuitem"
            >
              <svg class="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4" />
              </svg>
              Préférences
            </button>

            <!-- Aide et support -->
            <NuxtLink
                to="/help"
                @click="closeMenu"
                class="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                role="menuitem"
            >
              <svg class="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Aide & Support
            </NuxtLink>

            <!-- Séparateur -->
            <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>

            <!-- Déconnexion -->
            <button
                @click="handleLogout"
                :disabled="isLoading"
                class="group flex items-center w-full px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-900 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                role="menuitem"
            >
              <svg
                  v-if="isLoading"
                  class="animate-spin mr-3 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg
                  v-else
                  class="mr-3 h-4 w-4 text-red-400 group-hover:text-red-500 dark:group-hover:text-red-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {{ isLoading ? 'Déconnexion...' : 'Se déconnecter' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Overlay pour fermer le menu -->
    <div
        v-if="showMenu"
        @click="closeMenu"
        class="fixed inset-0 z-40"
        aria-hidden="true"
    ></div>
  </div>
</template>

<script setup lang="ts">
const {
  user,
  fullName,
  isAdmin,
  isEmailVerified,
  getAvatarUrl,
  logout,
  isLoading
} = useAuth()

// État local
const showMenu = ref(false)
const menuRef = ref<HTMLElement>()

// Gestion du menu
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const closeMenu = () => {
  showMenu.value = false
}

// Gestion de la déconnexion
const handleLogout = async () => {
  closeMenu()
  await logout()
}

// Actions diverses
const togglePreferences = () => {
  closeMenu()
  // Ouvrir un modal de préférences ou naviguer vers une page
  console.log('Ouvrir les préférences')
}

// Fermer le menu avec Échap
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

// Gestion du clic extérieur
const handleClickOutside = (event: Event) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', handleClickOutside)
})
</script>