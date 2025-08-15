
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <NuxtLink to="/public" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">T</span>
          </div>
          <span class="text-2xl font-bold text-gray-900 dark:text-white">TomanStore</span>
        </NuxtLink>
      </div>

      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Mot de passe oublié
      </h2>

      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Entrez votre adresse email pour recevoir un lien de réinitialisation
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">

        <!-- Formulaire ou message de succès -->
        <div v-if="!emailSent">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Adresse email
              </label>
              <div class="mt-1">
                <input
                    id="email"
                    v-model="email"
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

            <!-- Message d'erreur général -->
            <div v-if="errors.general" class="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
                    {{ errors.general }}
                  </h3>
                </div>
              </div>
            </div>

            <!-- Bouton d'envoi -->
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
                {{ isLoading ? 'Envoi en cours...' : 'Envoyer le lien' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Message de succès -->
        <div v-else class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20">
            <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <div class="mt-3">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Email envoyé !
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Si un compte avec cette adresse email existe, vous recevrez un lien de réinitialisation dans quelques minutes.
              </p>
            </div>
          </div>
        </div>

        <!-- Liens de navigation -->
        <div class="mt-6 text-center space-y-2">
          <NuxtLink
              to="/auth/login"
              class="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 block"
          >
            ← Retour à la connexion
          </NuxtLink>

          <div class="text-sm text-gray-500 dark:text-gray-400">
            Pas encore de compte ?
            <NuxtLink
                to="/auth/register"
                class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              Créer un compte
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Middleware pour les invités seulement
definePageMeta({
  middleware: 'guest',
  layout: false
})

// Meta tags
useSeoMeta({
  title: 'Mot de passe oublié - TomanStore',
  description: 'Réinitialisez votre mot de passe TomanStore en quelques clics.'
})

// Interface pour typer la réponse de l'API
interface ForgotPasswordResponse {
  success: boolean
  message?: string
}

const { isValidEmail } = useAuth()

// État du composant
const email = ref('')
const isLoading = ref(false)
const emailSent = ref(false)
const errors = ref<Record<string, string>>({})

// Gestion de la soumission
const handleSubmit = async () => {
  // Nettoyer les erreurs
  errors.value = {}

  // Validation de l'email
  if (!email.value) {
    errors.value.email = 'L\'adresse email est requise'
    return
  }

  if (!isValidEmail(email.value)) {
    errors.value.email = 'Format d\'email invalide'
    return
  }

  isLoading.value = true

  try {
    // Typer explicitement la réponse
    const response = await $fetch<ForgotPasswordResponse>('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value }
    })

    if (response.success) {
      emailSent.value = true

      // Notification de succès
      const { notifySuccess } = useNotificationStore()
      notifySuccess('Email envoyé', 'Vérifiez votre boîte de réception')
    } else {
      errors.value.general = response.message || 'Une erreur est survenue'
    }
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi:', error)

    // Pour des raisons de sécurité, on affiche toujours le même message
    emailSent.value = true
  } finally {
    isLoading.value = false
  }
}

// Nettoyer les erreurs lors de la saisie
watch(() => email.value, () => {
  if (errors.value.email) delete errors.value.email
  if (errors.value.general) delete errors.value.general
})
</script>