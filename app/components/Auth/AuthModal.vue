<template>
  <Teleport to="body">
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
      <!-- Overlay -->
      <div
          class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <Transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <div
              v-if="isOpen"
              @click="closeModal"
              class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity"
              aria-hidden="true"
          ></div>
        </Transition>

        <!-- Centrage vertical -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <!-- Contenu du modal -->
        <Transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
              v-if="isOpen"
              class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              @click.stop
          >
            <!-- En-tête avec bouton de fermeture -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold text-lg">T</span>
                </div>
                <span class="text-xl font-bold text-gray-900 dark:text-white">TomanStore</span>
              </div>

              <button
                  @click="closeModal"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2 -m-2"
                  aria-label="Fermer le modal"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Titre dynamique -->
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ currentMode === 'login' ? 'Connexion' : 'Inscription' }}
              </h2>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {{ currentMode === 'login'
                  ? 'Connectez-vous à votre compte TomanStore'
                  : 'Créez votre compte TomanStore'
                }}
              </p>
            </div>

            <!-- Onglets -->
            <div class="flex mb-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              <button
                  @click="currentMode = 'login'"
                  :class="[
                  'flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200',
                  currentMode === 'login'
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                ]"
              >
                Connexion
              </button>
              <button
                  @click="currentMode = 'register'"
                  :class="[
                  'flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200',
                  currentMode === 'register'
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                ]"
              >
                Inscription
              </button>
            </div>

            <!-- Contenu des formulaires avec transition -->
            <div class="min-h-[400px]">
              <Transition
                  name="form-slide"
                  mode="out-in"
              >
                <!-- Formulaire de connexion -->
                <div v-if="currentMode === 'login'" key="login">
                  <LoginForm
                      @success="handleLoginSuccess"
                      @error="handleError"
                  />
                </div>

                <!-- Formulaire d'inscription -->
                <div v-else key="register">
                  <RegisterForm
                      @success="handleRegisterSuccess"
                      @error="handleError"
                  />
                </div>
              </Transition>
            </div>

            <!-- Liens utiles -->
            <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex flex-col space-y-2 text-center text-sm">
                <NuxtLink
                    v-if="currentMode === 'login'"
                    to="/auth/forgot-password"
                    @click="closeModal"
                    class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  Mot de passe oublié ?
                </NuxtLink>

                <div class="text-gray-500 dark:text-gray-400">
                  <span>Besoin d'aide ? </span>
                  <NuxtLink
                      to="/support"
                      @click="closeModal"
                      class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                  >
                    Contactez-nous
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Conditions d'utilisation (pour inscription) -->
            <div v-if="currentMode === 'register'" class="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
              En créant un compte, vous acceptez nos
              <NuxtLink to="/terms" @click="closeModal" class="text-primary-600 dark:text-primary-400 hover:underline">
                conditions d'utilisation
              </NuxtLink>
              et notre
              <NuxtLink to="/privacy" @click="closeModal" class="text-primary-600 dark:text-primary-400 hover:underline">
                politique de confidentialité
              </NuxtLink>.
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  initialMode?: 'login' | 'register'
}

const props = withDefaults(defineProps<Props>(), {
  initialMode: 'login'
})

const emit = defineEmits<{
  close: []
  success: [type: 'login' | 'register', response: any]
  error: [message: string]
}>()

// État local
const currentMode = ref<'login' | 'register'>(props.initialMode)

// Fermer le modal
const closeModal = () => {
  emit('close')
}

// Gérer les succès de connexion/inscription
const handleLoginSuccess = (response: any) => {
  emit('success', 'login', response)
  closeModal()
}

const handleRegisterSuccess = (response: any) => {
  emit('success', 'register', response)
  closeModal()
}

// Gérer les erreurs
const handleError = (message: string) => {
  emit('error', message)
}

// Fermer avec la touche Échap
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Réinitialiser le mode quand le modal s'ouvre
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    currentMode.value = props.initialMode
  }
})

// Réinitialiser le mode quand initialMode change
watch(() => props.initialMode, (newValue) => {
  currentMode.value = newValue
})

// Gestion des événements clavier
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Empêcher le défilement du body quand le modal est ouvert
watch(() => props.isOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Nettoyer au démontage
onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Transitions pour les formulaires */
.form-slide-enter-active,
.form-slide-leave-active {
  transition: all 0.3s ease;
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Améliorer l'accessibilité */
.modal-content:focus {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}
</style>