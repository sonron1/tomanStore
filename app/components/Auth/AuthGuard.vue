<template>
  <div>
    <!-- Affichage si l'utilisateur est authentifié -->
    <slot v-if="shouldShow" />

    <!-- Affichage pour les utilisateurs non connectés -->
    <div v-else-if="showFallback" class="auth-guard-fallback">
      <slot name="fallback">
        <!-- Contenu par défaut si pas de slot fallback -->
        <div class="text-center py-8">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800">
            <svg class="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-1a2 2 0 00-2-2H6a2 2 0 00-2 2v1a2 2 0 002 2zM12 7c2.21 0 4 1.79 4 4v.5a1.5 1.5 0 01-3 0V11c0-.55-.45-1-1-1s-1 .45-1 1v.5a1.5 1.5 0 01-3 0V11c0-2.21 1.79-4 4-4z" />
            </svg>
          </div>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            {{ fallbackTitle }}
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ fallbackMessage }}
          </p>
          <div class="mt-6 flex justify-center space-x-3">
            <button
                @click="openAuthModal('login')"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Se connecter
            </button>
            <button
                @click="openAuthModal('register')"
                class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Créer un compte
            </button>
          </div>
        </div>
      </slot>
    </div>

    <!-- État de chargement -->
    <div v-else-if="isLoading" class="flex items-center justify-center py-8">
      <svg class="animate-spin h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="ml-3 text-gray-600 dark:text-gray-400">{{ loadingMessage }}</span>
    </div>

    <!-- Modal d'authentification -->
    <AuthModal
        :is-open="showAuthModal"
        :initial-mode="authModalMode"
        @close="closeAuthModal"
        @success="handleAuthSuccess"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  // Type de guard
  requireAuth?: boolean
  requireAdmin?: boolean
  requireEmailVerified?: boolean

  // Comportement
  redirect?: boolean
  redirectTo?: string
  showFallback?: boolean
  autoRedirect?: boolean

  // Messages personnalisés
  fallbackTitle?: string
  fallbackMessage?: string
  loadingMessage?: string

  // Délai avant redirection automatique (en ms)
  autoRedirectDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  requireAuth: true,
  requireAdmin: false,
  requireEmailVerified: false,
  redirect: true,
  redirectTo: '/auth/login',
  showFallback: true,
  autoRedirect: false,
  fallbackTitle: 'Connexion requise',
  fallbackMessage: 'Vous devez être connecté pour accéder à ce contenu.',
  loadingMessage: 'Vérification de l\'authentification...',
  autoRedirectDelay: 3000
})

const emit = defineEmits<{
  authRequired: []
  adminRequired: []
  emailVerificationRequired: []
  accessGranted: []
}>()

const {
  user,
  isLoggedIn,
  isLoading,
  isAdmin,
  isEmailVerified
} = useAuth()

// État du modal d'authentification
const showAuthModal = ref(false)
const authModalMode = ref<'login' | 'register'>('login')

// Logique de vérification des permissions
const shouldShow = computed(() => {
  // Toujours masquer pendant le chargement
  if (isLoading.value) return false

  // Vérifier l'authentification de base
  if (props.requireAuth && !isLoggedIn.value) {
    emit('authRequired')
    return false
  }

  // Vérifier les droits admin
  if (props.requireAdmin && !isAdmin.value) {
    emit('adminRequired')
    return false
  }

  // Vérifier la vérification de l'email
  if (props.requireEmailVerified && !isEmailVerified.value) {
    emit('emailVerificationRequired')
    return false
  }

  // Toutes les conditions sont remplies
  emit('accessGranted')
  return true
})

// Messages contextuels
const contextualFallbackTitle = computed(() => {
  if (props.requireAdmin) return 'Droits d\'administration requis'
  if (props.requireEmailVerified) return 'Vérification de l\'email requise'
  return props.fallbackTitle
})

const contextualFallbackMessage = computed(() => {
  if (props.requireAdmin) return 'Vous devez avoir des droits d\'administration pour accéder à ce contenu.'
  if (props.requireEmailVerified) return 'Vous devez vérifier votre adresse email pour accéder à ce contenu.'
  return props.fallbackMessage
})

// Gestion du modal d'authentification
const openAuthModal = (mode: 'login' | 'register' = 'login') => {
  authModalMode.value = mode
  showAuthModal.value = true
}

const closeAuthModal = () => {
  showAuthModal.value = false
}

const handleAuthSuccess = () => {
  closeAuthModal()
  // Le contenu sera automatiquement affiché grâce à la réactivité
}

// Redirection automatique
let redirectTimer: NodeJS.Timeout | null = null

const handleAutoRedirect = () => {
  if (props.autoRedirect && props.redirectTo) {
    redirectTimer = setTimeout(() => {
      navigateTo(props.redirectTo!)
    }, props.autoRedirectDelay)
  }
}

// Redirection immédiate
const handleImmediateRedirect = () => {
  if (props.redirect && props.redirectTo && !props.showFallback) {
    const { notifyWarning } = useNotificationStore()

    if (props.requireAdmin) {
      notifyWarning('Accès refusé', 'Droits d\'administration requis')
    } else if (props.requireEmailVerified) {
      notifyWarning('Vérification requise', 'Veuillez vérifier votre adresse email')
    } else {
      notifyWarning('Connexion requise', 'Vous devez être connecté pour accéder à cette page')
    }

    navigateTo(props.redirectTo)
  }
}

// Surveiller les changements d'état
watch(() => shouldShow.value, (newValue, oldValue) => {
  // Si l'accès était accordé et ne l'est plus
  if (oldValue === true && newValue === false) {
    if (props.autoRedirect) {
      handleAutoRedirect()
    } else if (props.redirect && !props.showFallback) {
      handleImmediateRedirect()
    }
  }

  // Si l'accès est maintenant accordé, nettoyer le timer
  if (newValue === true && redirectTimer) {
    clearTimeout(redirectTimer)
    redirectTimer = null
  }
}, { immediate: true })

// Nettoyer les timers au démontage
onUnmounted(() => {
  if (redirectTimer) {
    clearTimeout(redirectTimer)
  }
})

// Fonctions utilitaires exposées
const checkAccess = () => shouldShow.value
const forceRedirect = () => {
  if (props.redirectTo) {
    navigateTo(props.redirectTo)
  }
}

defineExpose({
  checkAccess,
  forceRedirect,
  openAuthModal
})
</script>

<style scoped>
.auth-guard-fallback {
  @apply min-h-[200px] flex items-center justify-center;
}
</style>