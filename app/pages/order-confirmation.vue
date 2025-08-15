<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <!-- Icône de succès -->
        <div class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎉 Akpe ! Commande confirmée !
        </h1>

        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Votre paiement via KKiaPay a été traité avec succès.
        </p>

        <!-- Détails de la transaction -->
        <div v-if="transactionId" class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📄 Détails de la transaction
          </h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">ID Transaction :</span>
              <span class="font-mono font-semibold text-gray-900 dark:text-white">
                {{ transactionId }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Date :</span>
              <span class="text-gray-900 dark:text-white">
                {{ formatDate(new Date()) }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Mode de paiement :</span>
              <span class="text-gray-900 dark:text-white flex items-center">
                <div class="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                KKiaPay
              </span>
            </div>

            <!-- ✅ Statut de vérification -->
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Statut :</span>
              <span class="flex items-center">
                <div v-if="verificationStatus === 'loading'" class="flex items-center">
                  <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span class="text-blue-600 text-sm">Vérification...</span>
                </div>
                <div v-else-if="verificationStatus === 'verified'" class="flex items-center text-green-600">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-sm">Vérifié</span>
                </div>
                <div v-else-if="verificationStatus === 'error'" class="flex items-center text-yellow-600">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-sm">En attente</span>
                </div>
              </span>
            </div>
          </div>
        </div>

        <!-- Informations sur la suite -->
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📧 Et maintenant ?
          </h3>
          <p class="text-sm text-blue-700 dark:text-blue-300 mb-3">
            Un SMS de confirmation vous sera envoyé avec les détails de livraison.
          </p>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Notre équipe vous contactera sous 24h pour organiser la livraison.
          </p>
        </div>

        <!-- Livraison au Bénin -->
        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
          <h3 class="font-semibold text-green-900 dark:text-green-100 mb-2">
            🇧🇯 Livraison au Bénin
          </h3>
          <div class="text-sm text-green-700 dark:text-green-300 space-y-1">
            <p>• Cotonou & Porto-Novo : 24-48h</p>
            <p>• Autres villes : 3-5 jours ouvrés</p>
            <p>• Paiement à la livraison disponible</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <NuxtLink to="/products" class="btn-primary">
            Continuer mes achats
          </NuxtLink>
          <NuxtLink to="/" class="btn-secondary">
            Retour à l'accueil
          </NuxtLink>
        </div>

        <!-- Contact support -->
        <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Une question sur votre commande ?
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="tel:+22997123456" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center">
              📞 +229 97 12 34 56
            </a>
            <a href="mailto:support@tomanstore.bj" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center">
              ✉️ support@tomanstore.bj
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePaymentStore} from "~/stores/payment";

const route = useRoute()
const paymentStore = usePaymentStore()

// États réactifs
const verificationStatus = ref<'loading' | 'verified' | 'error'>('loading')

// Récupérer l'ID de transaction depuis l'URL
const transactionId = computed(() => route.query.transaction as string)

// Formater la date en français
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// ✅ CORRECTION : Vérification de transaction avec gestion d'état
onMounted(async () => {
  if (transactionId.value) {
    try {
      verificationStatus.value = 'loading'

      // Attendre la vérification
      const isVerified = await paymentStore.verifyTransaction(transactionId.value)

      if (isVerified) {
        verificationStatus.value = 'verified'
        console.log('✅ Transaction vérifiée avec succès')
      } else {
        verificationStatus.value = 'error'
        console.warn('⚠️ Transaction non vérifiée')
      }
    } catch (error) {
      verificationStatus.value = 'error'
      console.error('❌ Erreur lors de la vérification:', error)
    }
  } else {
    // Pas d'ID de transaction
    verificationStatus.value = 'error'
  }
})

// Meta tags
useSeoMeta({
  title: 'Commande confirmée - Akpe !',
  description: 'Votre commande a été confirmée et votre paiement traité avec succès via KKiaPay.'
})
</script>