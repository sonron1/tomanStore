<template>
  <div class="password-strength">
    <!-- Barre de progression -->
    <div class="flex items-center space-x-2 mb-2">
      <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
        <div
            :class="[
            'h-full transition-all duration-300 ease-in-out',
            strengthClasses.bar
          ]"
            :style="{ width: `${strengthPercentage}%` }"
        ></div>
      </div>
      <span :class="['text-xs font-medium', strengthClasses.text]">
        {{ strengthLabel }}
      </span>
    </div>

    <!-- Messages d'aide -->
    <div class="text-xs space-y-1">
      <div
          v-for="(requirement, index) in requirements"
          :key="index"
          :class="[
          'flex items-center space-x-1 transition-colors duration-200',
          requirement.met ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
        ]">
        <svg
            :class="[
            'w-3 h-3 flex-shrink-0',
            requirement.met ? 'text-green-500' : 'text-gray-400'
          ]"
            fill="currentColor"
            viewBox="0 0 20 20"
        >
          <path v-if="requirement.met"
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"/>
          <path
              v-else
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"/>
        </svg>
        <span>{{ requirement.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  password: string
  minLength?: number
  showRequirements?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  minLength: 8,
  showRequirements: true
})

// Calculer la force du mot de passe
const passwordAnalysis = computed(() => {
  const password = props.password
  let score = 0
  const feedback = []

  // Critères de validation
  const checks = {
    length: password.length >= props.minLength,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noSequential: !/(.)\1{2,}/.test(password) && !/123|abc|qwe/i.test(password)
  }

  // Calcul du score
  if (checks.length) score += 1
  if (checks.lowercase) score += 1
  if (checks.uppercase) score += 1
  if (checks.numbers) score += 1
  if (checks.special) score += 1
  if (checks.noSequential) score += 0.5

  // Bonus pour les mots de passe longs
  if (password.length >= 12) score += 0.5
  if (password.length >= 16) score += 0.5

  // Déterminer la force
  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
  if (score >= 5) strength = 'strong'
  else if (score >= 3.5) strength = 'good'
  else if (score >= 2) strength = 'fair'

  return {
    score,
    strength,
    checks
  }
})

// Exigences du mot de passe
const requirements = computed(() => [
  {
    text: `Au moins ${props.minLength} caractères`,
    met: passwordAnalysis.value.checks.length
  },
  {
    text: 'Au moins une lettre minuscule (a-z)',
    met: passwordAnalysis.value.checks.lowercase
  },
  {
    text: 'Au moins une lettre majuscule (A-Z)',
    met: passwordAnalysis.value.checks.uppercase
  },
  {
    text: 'Au moins un chiffre (0-9)',
    met: passwordAnalysis.value.checks.numbers
  },
  {
    text: 'Au moins un caractère spécial (!@#$%^&*)',
    met: passwordAnalysis.value.checks.special
  }
])

// Classes CSS selon la force
const strengthClasses = computed(() => {
  const strength = passwordAnalysis.value.strength

  const classes = {
    weak: {
      bar: 'bg-red-500',
      text: 'text-red-500'
    },
    fair: {
      bar: 'bg-yellow-500',
      text: 'text-yellow-500'
    },
    good: {
      bar: 'bg-blue-500',
      text: 'text-blue-500'
    },
    strong: {
      bar: 'bg-green-500',
      text: 'text-green-500'
    }
  }

  return classes[strength]
})

// Pourcentage de la barre de progression
const strengthPercentage = computed(() => {
  const maxScore = 6
  return Math.min((passwordAnalysis.value.score / maxScore) * 100, 100)
})

// Label de force
const strengthLabel = computed(() => {
  const labels = {
    weak: 'Faible',
    fair: 'Moyen',
    good: 'Bon',
    strong: 'Excellent'
  }

  return labels[passwordAnalysis.value.strength]
})

// Exposer l'analyse pour les composants parents
const isValid = computed(() => {
  return passwordAnalysis.value.strength === 'good' || passwordAnalysis.value.strength === 'strong'
})

const getStrength = () => passwordAnalysis.value.strength
const getScore = () => passwordAnalysis.value.score
const isPasswordValid = () => isValid.value

defineExpose({
  isValid,
  getStrength,
  getScore,
  isPasswordValid,
  strength: computed(() => passwordAnalysis.value.strength)
})
</script>

<style scoped>
.password-strength {
  @apply select-none;
}

/* Animation pour la barre de progression */
.password-strength .h-full {
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

/* Animation pour les icônes de validation */
.password-strength svg {
  transition: color 0.2s ease-in-out;
}
</style>