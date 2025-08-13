<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ✅ Animation de succès -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎉 Commande confirmée !
        </h1>

        <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">
          Votre paiement a été traité avec succès
        </p>

        <p v-if="transactionId" class="text-sm text-gray-500 dark:text-gray-400">
          Transaction ID: <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{ transactionId }}</code>
        </p>
      </div>

      <!-- ✅ Détails de la commande -->
      <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            📋 Récapitulatif
          </h2>
        </div>

        <div class="p-6 space-y-4">
          <div class="flex justify-between items-center" v-if="amount">
            <span class="text-gray-600 dark:text-gray-400">Montant payé:</span>
            <span class="text-2xl font-bold text-green-600">{{ formatPrice(amount) }} FCFA</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Mode de paiement:</span>
            <span class="text-gray-900 dark:text-white font-medium">KKiaPay</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Date:</span>
            <span class="text-gray-900 dark:text-white font-medium">{{ formatDate(new Date()) }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Statut:</span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ✅ Confirmé
            </span>
          </div>
        </div>
      </div>

      <!-- ✅ Prochaines étapes -->
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          📋 Prochaines étapes
        </h3>

        <ul class="space-y-3 text-blue-800 dark:text-blue-200">
          <li class="flex items-start">
            <span class="font-semibold mr-3">1.</span>
            <span>Un email de confirmation a été envoyé à votre adresse</span>
          </li>
          <li class="flex items-start">
            <span class="font-semibold mr-3">2.</span>
            <span>Votre commande sera préparée dans les prochaines 24h</span>
          </li>
          <li class="flex items-start">
            <span class="font-semibold mr-3">3.</span>
            <span>Vous recevrez un SMS lorsque votre commande sera expédiée</span>
          </li>
          <li class="flex items-start">
            <span class="font-semibold mr-3">4.</span>
            <span>Livraison sous 2-5 jours ouvrés selon votre ville</span>
          </li>
        </ul>
      </div>

      <!-- ✅ Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
            to="/products"
            class="btn-primary text-center"
        >
          🛍️ Continuer mes achats
        </NuxtLink>

        <button
            @click="downloadReceipt"
            class="btn-secondary"
        >
          📄 Télécharger le reçu
        </button>
      </div>

      <!-- ✅ Support -->
      <div class="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Besoin d'aide ?
        </h4>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Notre équipe support est là pour vous aider
        </p>
        <div class="flex justify-center space-x-6">
          <a
              href="mailto:support@tomanstore.com"
              class="text-blue-600 dark:text-blue-400 hover:underline"
          >
            📧 support@tomanstore.com
          </a>
          <a
              href="tel:+229xxxxxxxx"
              class="text-blue-600 dark:text-blue-400 hover:underline"
          >
            📞 +229 XX XX XX XX
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrency } from '~/composables/useCurrency'

// ✅ Configuration de la page
definePageMeta({
  title: 'Commande confirmée - TomanStore',
  description: 'Votre commande a été confirmée avec succès'
})

const route = useRoute()
const { formatPrice } = useCurrency()

// ✅ Données de la transaction depuis l'URL
const transactionId = computed(() => route.query.transactionId as string)
const amount = computed(() => {
  const amt = route.query.amount as string
  return amt ? parseInt(amt) : null
})

// ✅ Formatage de date
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// ✅ Téléchargement du reçu (simulation)
const downloadReceipt = () => {
  // Ici vous pouvez générer un PDF ou rediriger vers une API
  console.log('📄 Génération du reçu...')

  // Simulation d'un téléchargement
  const receiptData = {
    transactionId: transactionId.value,
    amount: amount.value,
    date: new Date().toISOString(),
    store: 'TomanStore'
  }

  const blob = new Blob([JSON.stringify(receiptData, null, 2)], {
    type: 'application/json'
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `recu-${transactionId.value || 'commande'}.json`
  a.click()

  URL.revokeObjectURL(url)
}

// ✅ Vérifications au montage
onMounted(() => {
  if (!transactionId.value) {
    console.warn('⚠️ Pas d\'ID de transaction - redirection possible')
    // Optionnel: rediriger vers l'accueil si pas de transaction
  }
})
</script>

<style scoped>
.btn-primary {
  @apply px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors;
}

.btn-secondary {
  @apply px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors;
}
</style>