<template>
  <div class="relative">
    <!-- Bouton principal -->
    <button
        @click="toggleDropdown"
        class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        :title="getButtonTitle()"
    >
      <!-- Icône selon le thème actuel -->
      <Transition name="theme-icon" mode="out-in">
        <component
            :is="getCurrentIcon()"
            :key="currentTheme"
            class="w-5 h-5 text-gray-600 dark:text-gray-300"
        />
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
                : 'text-gray-700 dark:text-gray-300'
            ]"
          >
            <component :is="option.icon" class="w-4 h-4" />
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
import type { Theme } from '~/stores/theme'

const { currentTheme, setTheme } = useThemeStore()

// État local
const showDropdown = ref(false)

// Options du thème (seulement light et dark)
const themeOptions = [
  {
    value: 'light' as Theme,
    label: 'Clair',
    icon: 'IconSun'
  },
  {
    value: 'dark' as Theme,
    label: 'Sombre',
    icon: 'IconMoon'
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

// Helpers
const getCurrentIcon = () => {
  switch (currentTheme.value) {
    case 'dark':
      return 'IconMoon'
    case 'light':
      return 'IconSun'
    default:
      return 'IconSun'  // ← Par défaut sun (thème clair)
  }
}

const getButtonTitle = () => {
  switch (currentTheme.value) {
    case 'dark':
      return 'Mode sombre actif'
    case 'light':
      return 'Mode clair actif'
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