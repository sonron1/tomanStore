<template>
  <div class="w-full max-w-md">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Prénom et Nom -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Prénom
          </label>
          <div class="mt-1">
            <input
                id="firstName"
                v-model="credentials.firstName"
                type="text"
                autocomplete="given-name"
                required
                :class="[
                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
                errors.firstName
                  ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              ]"
                placeholder="John"
            />
            <p v-if="errors.firstName" class="mt-1 text-xs text-red-600 dark:text-red-400">
              {{ errors.firstName }}
            </p>
          </div>
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nom
          </label>
          <div class="mt-1">
            <input
                id="lastName"
                v-model="credentials.lastName"
                type="text"
                autocomplete="family-name"
                required
                :class="[
                'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
                errors.lastName
                  ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              ]"
                placeholder="Doe"
            />
            <p v-if="errors.lastName" class="mt-1 text-xs text-red-600 dark:text-red-400">
              {{ errors.lastName }}
            </p>
          </div>
        </div>
      </div>

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
              'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.email
                ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            ]"
              placeholder="john.doe@example.com"
          />
          <p v-if="errors.email" class="mt-2 text-sm text-red-600 dark:text-red-400">
            {{ errors.email }}
          </p>
        </div>
      </div>

      <!-- Téléphone (optionnel) -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Téléphone <span class="text-gray-400">(optionnel)</span>
        </label>
        <div class="mt-1">
          <input
              id="phone"
              v-model="credentials.phone"
              type="tel"
              autocomplete="tel"
              :class="[
              'appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.phone
                ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            ]"
              placeholder="+229 XX XX XX XX"
          />
          <p v-if="errors.phone" class="mt-2 text-sm text-red-600 dark:text-red-400">
            {{ errors.phone }}
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
              autocomplete="new-password"
              required
              :class="[
              'appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.password
                ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            ]"
              placeholder="Votre mot de passe"
          />
          <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              :title="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
          >
            <svg
                :class="['h-5 w-5', showPassword ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500']"
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
        </div>

        <!-- Indicateur de force du mot de passe -->
        <PasswordStrength
            v-if="credentials.password"
            :password="credentials.password"
            class="mt-2"
        />

        <p v-if="errors.password" class="mt-2 text-sm text-red-600 dark:text-red-400">
          {{ errors.password }}
        </p>
      </div>

      <!-- Confirmation mot de passe -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirmer le mot de passe
        </label>
        <div class="mt-1 relative">
          <input
              id="confirmPassword"
              v-model="credentials.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              required
              :class="[
              'appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors',
              errors.confirmPassword
                ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            ]"
              placeholder="Confirmez votre mot de passe"
          />

          <!-- Indicateur de correspondance -->
          <div v-if="credentials.confirmPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg
                v-if="credentials.password === credentials.confirmPassword && credentials.confirmPassword.length > 0"
                class="h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <svg
                v-else-if="credentials.confirmPassword.length > 0"
                class="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>

          <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-600 dark:text-red-400">
            {{ errors.confirmPassword }}
          </p>
        </div>
      </div>

      <!-- Accepter les conditions -->
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
              id="acceptTerms"
              v-model="credentials.acceptTerms"
              type="checkbox"
              class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded transition-colors"
              required
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="acceptTerms" class="text-gray-700 dark:text-gray-300">
            J'accepte les
            <NuxtLink to="/terms" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 underline transition-colors">
              conditions d'utilisation
            </NuxtLink>
            et la
            <NuxtLink to="/privacy" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 underline transition-colors">
              politique de confidentialité
            </NuxtLink>
          </label>
          <p v-if="errors.acceptTerms" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ errors.acceptTerms }}
          </p>
        </div>
      </div>

      <!-- Message d'erreur général -->
      <div v-if="errors.general" class="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400 dark:text-red-300" viewBox="0 0 20 20" fill="currentColor">
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

      <!-- Bouton d'inscription -->
      <div>
        <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
          {{ isLoading ? 'Création...' : 'Créer mon compte' }}
        </button>
      </div>
    </form>

    <!-- Lien de connexion -->
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Déjà un compte ?
        <NuxtLink
            to="/auth/login"
            class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          Se connecter
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RegisterCredentials } from '~/types/auth'

// Événements émis
const emit = defineEmits<{
  success: [response: any]
  error: [error: string]
}>()

const { register, validateRegisterForm, isLoading, clearError } = useAuth()

// État du formulaire
const credentials = ref<RegisterCredentials>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const errors = ref<Record<string, string>>({})
const showPassword = ref(false)

// Validation en temps réel
const isFormValid = computed(() => {
  return credentials.value.firstName.length > 0 &&
      credentials.value.lastName.length > 0 &&
      credentials.value.email.length > 0 &&
      credentials.value.password.length > 0 &&
      credentials.value.confirmPassword.length > 0 &&
      credentials.value.acceptTerms &&
      Object.keys(errors.value).filter(key => key !== 'general').length === 0
})

// Gestion de la soumission
const handleSubmit = async () => {
  // Nettoyer les erreurs
  errors.value = {}
  clearError()

  // Validation côté client
  const validationErrors = validateRegisterForm(credentials.value)
  if (Object.keys(validationErrors).length > 0) {
    errors.value = validationErrors
    return
  }

  try {
    const response = await register(credentials.value)

    if (response.success) {
      emit('success', response)
    } else {
      errors.value.general = response.error || 'Erreur lors de l\'inscription'
      emit('error', response.error || 'Erreur lors de l\'inscription')
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Une erreur inattendue s\'est produite'
    errors.value.general = errorMessage
    emit('error', errorMessage)
  }
}

// Nettoyer les erreurs lors de la saisie
const watchFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword']
watchFields.forEach(field => {
  watch(() => credentials.value[field as keyof RegisterCredentials], () => {
    if (errors.value[field]) delete errors.value[field]
    if (errors.value.general) delete errors.value.general
  })
})

watch(() => credentials.value.acceptTerms, () => {
  if (errors.value.acceptTerms) delete errors.value.acceptTerms
})

// Auto-focus sur le champ prénom
onMounted(() => {
  nextTick(() => {
    const firstNameInput = document.getElementById('firstName')
    if (firstNameInput) {
      firstNameInput.focus()
    }
  })
})

// Réinitialiser le formulaire
const resetForm = () => {
  credentials.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  }
  errors.value = {}
  showPassword.value = false
}

// Exposer les méthodes publiques
defineExpose({
  resetForm
})
</script>