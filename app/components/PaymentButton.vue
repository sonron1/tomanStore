<template>
  <div class="payment-section">
    <!-- Bouton de paiement principal -->
    <button
        @click="handlePayment"
        :disabled="isProcessing || !canPay"
        :class="[
        'w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200',
        isProcessing
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
      ]"
    >
      <div class="flex items-center justify-center space-x-3">
        <!-- Spinner de chargement -->
        <svg
            v-if="isProcessing"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
          <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
          />
          <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>

        <!-- Logo KKiaPay -->
        <div v-else class="flex items-center space-x-2">
          <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span class="text-primary-600 font-bold text-xs">K</span>
          </div>
          <span>{{ formatPrice(amount) }} FCFA</span>
        </div>
      </div>

      <div class="mt-1 text-sm opacity-90">
        {{ isProcessing ? 'Traitement en cours...' : 'Payer avec KKiaPay' }}
      </div>
    </button>

    <!-- Informations sur les méthodes de paiement -->
    <div class="mt-4 text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Paiement sécurisé via KKiaPay</p>
      <div class="flex justify-center items-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
        <div class="flex items-center space-x-1">
          <div class="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Mobile Money</span>
        </div>
        <div class="flex items-center space-x-1">
          <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Carte Bancaire</span>
        </div>
      </div>
    </div>

    <!-- Erreur de paiement -->
    <div
        v-if="error"
        class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <p class="text-red-700 dark:text-red-300 text-sm">{{ error }}</p>
      <button
          @click="clearError"
          class="mt-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm underline"
      >
        Réessayer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  amount: number
  customerInfo?: {
    name?: string
    email?: string
    phone?: string
  }
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const { processPayment, isProcessing, error } = usePayment()
const { isKkiaPayReady } = useKKiaPay()
const paymentStore = usePaymentStore()
const { formatPrice } = useCurrency()

// États réactifs
const canPay = computed(() => {
  return !props.disabled &&
      props.amount > 0 &&
      isKkiaPayReady.value &&
      !isProcessing.value
})

// Gérer le paiement
const handlePayment = async () => {
  if (!canPay.value) return

  try {
    await processPayment(props.amount, props.customerInfo)
  } catch (error) {
    console.error('Erreur lors du paiement:', error)
  }
}

// Effacer l'erreur
const clearError = () => {
  paymentStore.clearCurrentTransaction()
}

// Nettoyer au démontage
onUnmounted(() => {
  const { removePaymentListeners } = useKKiaPay()
  removePaymentListeners()
})
</script>