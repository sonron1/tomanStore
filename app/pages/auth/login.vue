<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">T</span>
          </div>
          <span class="text-2xl font-bold text-gray-900 dark:text-white">TomanStore</span>
        </NuxtLink>
      </div>

      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Connexion à votre compte
      </h2>

      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Ou
        <NuxtLink
            to="/auth/register"
            class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          créez un nouveau compte
        </NuxtLink>
      </p>

      <!-- Bouton de retour à l'accueil -->
      <div class="mt-4 text-center">
        <NuxtLink
            to="/"
            class="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Retour à l'accueil
        </NuxtLink>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Affichage des erreurs générales -->
        <div v-if="errors.general" class="mb-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md">
          <p class="text-sm text-red-600 dark:text-red-400">{{ errors.general }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Adresse email
            </label>
            <div class="mt-1">
              <input
                  id="email"
                  v-model="credentials.email"
                  type="email"
                  autocomplete="email"
                  required
                  :class="[
                  'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                  errors.email
                    ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                ]"
                  placeholder="votre@email.com"
              />
              <p v-if="errors.email" class="mt-2 text-sm text-red-600 dark:text-red-400">
                {{ errors.email }}
              </p>
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mot de passe
            </label>
            <div class="mt-1 relative">
              <input
                  id="password"
                  v-model="credentials.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  :class="[
                  'appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                  errors.password
                    ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                ]"
                  placeholder="Votre mot de passe"
              />
              <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                    :class="['h-5 w-5', showPassword ? 'text-gray-400' : 'text-gray-400']"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path
                      v-if="!showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                      v-else
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              </button>
              <p v-if="errors.password" class="mt-2 text-sm text-red-600 dark:text-red-400">
                {{ errors.password }}
              </p>
            </div>
          </div>

          <!-- Se souvenir de moi -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                  id="rememberMe"
                  v-model="credentials.rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="rememberMe" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Se souvenir de moi
              </label>
            </div>

            <div class="text-sm">
              <NuxtLink
                  to="/auth/forgot-password"
                  class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Mot de passe oublié ?
              </NuxtLink>
            </div>
          </div>

          <!-- Bouton de connexion -->
          <div>
            <button
                type="submit"
                :disabled="isLoading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                  v-if="isLoading"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Connexion...' : 'Se connecter' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginCredentials } from '~/types/auth'

// Middleware pour les invités seulement
definePageMeta({
  middleware: 'guest',
  layout: false
})

// Meta tags
useSeoMeta({
  title: 'Connexion - TomanStore',
  description: 'Connectez-vous à votre compte TomanStore pour accéder à vos commandes et préférences.'
})

const { login, validateLoginForm, isLoading, clearError } = useAuth()

// État du formulaire
const credentials = ref<LoginCredentials>({
  email: '',
  password: '',
  rememberMe: false
})

const errors = ref<Record<string, string>>({})
const showPassword = ref(false)

// Gestion de la soumission du formulaire
const handleLogin = async () => {
  console.log('🔑 Tentative de connexion:', { email: credentials.value.email })

  // Nettoyer les erreurs précédentes
  errors.value = {}
  clearError()

  // Validation côté client
  const validationErrors = validateLoginForm(credentials.value)
  if (Object.keys(validationErrors).length > 0) {
    errors.value = validationErrors
    return
  }

  try {
    // Tentative de connexion
    const response = await login(credentials.value)
    console.log('📦 Réponse login:', response)

    if (response.success) {
      console.log('✅ Connexion réussie!')
      await navigateTo('/')
    } else {
      console.log('❌ Échec de la connexion:', response.error)
      if (response.error) {
        errors.value.general = response.error
      }
    }
  } catch (error) {
    console.error('💥 Erreur lors de la connexion:', error)
    errors.value.general = 'Une erreur inattendue s\'est produite'
  }
}

// Nettoyer les erreurs quand l'utilisateur tape
watch(() => credentials.value.email, () => {
  if (errors.value.email) delete errors.value.email
  if (errors.value.general) delete errors.value.general
})

watch(() => credentials.value.password, () => {
  if (errors.value.password) delete errors.value.password
  if (errors.value.general) delete errors.value.general
})
</script>