<template>
  <div class="relative">
    <!-- Bouton principal -->
    <button
        @click="toggleDropdown"
        class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        :title="getButtonTitle()"
    >
      <!-- Icône directement intégrée selon le thème actuel -->
      <Transition name="theme-icon" mode="out-in">
        <!-- Icône Soleil (mode clair) -->
        <svg
            v-if="currentTheme === 'light'"
            key="sun"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-gray-600 dark:text-gray-300"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>

        <!-- Icône Lune (mode sombre) -->
        <svg
            v-else
            key="moon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-gray-600 dark:text-gray-300"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      </Transition>
    </button>

    <!-- Dropdown menu -->
    <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95 translate-y-1"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 z-50"
      >
        <div class="py-2">
          <button
              v-for="option in themeOptions"
              :key="option.value"
              @click="selectTheme(option.value)"
              :class="[
              'w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150',
              currentTheme === option.value
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-white'
            ]"
          >
            <!-- Icône dans le dropdown -->
            <svg
                v-if="option.value === 'light'"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            <svg
                v-else
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>

            <span class="text-sm font-medium">{{ option.label }}</span>
            <svg
                v-if="currentTheme === option.value"
                class="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Overlay pour fermer le dropdown -->
    <div
        v-if="showDropdown"
        @click="closeDropdown"
        class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {type Theme, useThemeStore} from '~/stores/theme'

const { currentTheme, setTheme } = useThemeStore()

// État local
const showDropdown = ref(false)

// Options du thème (seulement light et dark)
const themeOptions = [
  {
    value: 'light' as Theme,
    label: 'Clair'
  },
  {
    value: 'dark' as Theme,
    label: 'Sombre'
  }
]

// Gestion du dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

// Sélection du thème
const selectTheme = (theme: Theme) => {
  setTheme(theme)
  closeDropdown()
}

const getButtonTitle = () => {
  // CORRECTION: Accéder directement à currentTheme sans .value
  switch (currentTheme) {
    case 'dark':
      return 'Mode sombre actif - Cliquer pour changer'
    case 'light':
      return 'Mode clair actif - Cliquer pour changer'
    default:
      return 'Changer le thème'
  }
}

// Fermer le dropdown en appuyant sur Échap
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeDropdown()
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.2s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: scale(0.8) rotate(-180deg);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(180deg);
}
</style>