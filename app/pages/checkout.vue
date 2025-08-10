<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Finaliser ma commande</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Complétez vos informations pour valider votre achat
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulaire de checkout -->
        <div class="lg:col-span-2">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Informations personnelles -->
            <div class="card">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                👤 Informations personnelles
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prénom *
                  </label>
                  <input
                      v-model="formData.firstName"
                      type="text"
                      :class="[
                      'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                      errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    ]"
                      placeholder="Votre prénom"
                  >
                  <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">
                    {{ errors.firstName }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom *
                  </label>
                  <input
                      v-model="formData.lastName"
                      type="text"
                      :class="[
                      'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                      errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    ]"
                      placeholder="Votre nom"
                  >
                  <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">
                    {{ errors.lastName }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                      v-model="formData.email"
                      type="email"
                      :class="[
                      'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    ]"
                      placeholder="votre@email.com"
                  >
                  <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                    {{ errors.email }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Téléphone *
                  </label>
                  <input
                      v-model="formData.phone"
                      type="tel"
                      :class="[
                      'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                      errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    ]"
                      placeholder="06 12 34 56 78"
                  >
                  <p v-if="errors.phone" class="text-red-500 text-xs mt-1">
                    {{ errors.phone }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Adresse de livraison -->
            <div class="card">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                🏠 Adresse de livraison
              </h2>

              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Adresse *
                  </label>
                  <input
                      v-model="formData.address"
                      type="text"
                      :class="[
                      'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                      errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    ]"
                      placeholder="123 rue de la Paix"
                  >
                  <p v-if="errors.address" class="text-red-500 text-xs mt-1">
                    {{ errors.address }}
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ville *
                    </label>
                    <input
                        v-model="formData.city"
                        type="text"
                        :class="[
                        'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                        errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      ]"
                        placeholder="Paris"
                    >
                    <p v-if="errors.city" class="text-red-500 text-xs mt-1">
                      {{ errors.city }}
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Code postal *
                    </label>
                    <input
                        v-model="formData.postalCode"
                        type="text"
                        :class="[
                        'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                        errors.postalCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      ]"
                        placeholder="75000"
                    >
                    <p v-if="errors.postalCode" class="text-red-500 text-xs mt-1">
                      {{ errors.postalCode }}
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pays
                    </label>
                    <select
                        v-model="formData.country"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Méthodes de livraison -->
            <div class="card">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                🚚 Mode de livraison
              </h2>

              <div class="space-y-4">
                <div
                    v-for="option in shippingOptions"
                    :key="option.id"
                    class="relative"
                >
                  <label class="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div class="flex items-center">
                      <input
                          v-model="formData.shippingMethod"
                          :value="option.id"
                          type="radio"
                          class="mr-3 text-blue-600 focus:ring-blue-500"
                      >
                      <div>
                        <div class="font-medium text-gray-900 dark:text-white">
                          {{ option.name }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                          {{ option.description }}
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-medium text-gray-900 dark:text-white">
                        {{ option.price === 0 ? 'Gratuit' : `${option.price}€` }}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Méthodes de paiement -->
            <div class="card">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                💳 Mode de paiement
              </h2>

              <div class="space-y-4 mb-6">
                <div
                    v-for="method in paymentMethods"
                    :key="method.id"
                    class="relative"
                >
                  <label class="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <input
                        v-model="formData.paymentMethod"
                        :value="method.id"
                        type="radio"
                        class="mr-3 text-blue-600 focus:ring-blue-500"
                    >
                    <span class="text-2xl mr-3">{{ method.icon }}</span>
                    <div>
                      <div class="font-medium text-gray-900 dark:text-white">
                        {{ method.name }}
                      </div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ method.description }}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Informations de carte (si paiement par carte) -->
              <div v-if="formData.paymentMethod === 'card'" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Numéro de carte *
                    </label>
                    <input
                        v-model="formData.cardNumber"
                        type="text"
                        :class="[
                        'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      ]"
                        placeholder="1234 5678 9012 3456"
                    >
                    <p v-if="errors.cardNumber" class="text-red-500 text-xs mt-1">
                      {{ errors.cardNumber }}
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date d'expiration *
                    </label>
                    <input
                        v-model="formData.cardExpiry"
                        type="text"
                        :class="[
                        'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                        errors.cardExpiry ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      ]"
                        placeholder="MM/AA"
                    >
                    <p v-if="errors.cardExpiry" class="text-red-500 text-xs mt-1">
                      {{ errors.cardExpiry }}
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      CVC *
                    </label>
                    <input
                        v-model="formData.cardCVC"
                        type="text"
                        :class="[
                        'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                        errors.cardCVC ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      ]"
                        placeholder="123"
                    >
                    <p v-if="errors.cardCVC" class="text-red-500 text-xs mt-1">
                      {{ errors.cardCVC }}
                    </p>
                  </div>

                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom sur la carte *
                    </label>
                    <input
                        v-model="formData.cardName"
                        type="text"
                        :class="[
                        'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
                        errors.cardName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      ]"
                        placeholder="John Doe"
                    >
                    <p v-if="errors.cardName" class="text-red-500 text-xs mt-1">
                      {{ errors.cardName }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Commentaires -->
            <div class="card">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                💬 Commentaires (optionnel)
              </h2>
              <textarea
                  v-model="formData.notes"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ajouter un commentaire pour votre commande..."
              ></textarea>
            </div>

            <!-- Bouton de soumission -->
            <div class="flex justify-between items-center">
              <NuxtLink
                  to="/cart"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ← Retour au panier
              </NuxtLink>

              <button
                  type="submit"
                  :disabled="isSubmitting"
                  :class="[
                  'px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-colors',
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
                ]"
              >
                <span v-if="isSubmitting" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Traitement...
                </span>
                <span v-else>Finaliser ma commande</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Récapitulatif de commande -->
        <div class="lg:col-span-1">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { formData, errors, isSubmitting, shippingOptions, paymentMethods, submitOrder } = useCheckoutStore()
const { notifySuccess, notifyError } = useNotificationStore()

// Gestion de la soumission du formulaire
const handleSubmit = async () => {
  const { success, orderInfo } = await submitOrder()

  if (success && orderInfo) {
    notifySuccess(
        'Commande confirmée !',
        'Votre commande a été enregistrée avec succès.'
    )

    // Rediriger vers la page de confirmation
    await navigateTo({
      path: '/order-confirmation',
      query: { orderNumber: orderInfo.orderNumber }
    })
  } else {
    notifyError(
        'Erreur lors de la commande',
        'Une erreur est survenue. Veuillez vérifier vos informations.'
    )
  }
}

// Meta tags pour SEO
useSeoMeta({
  title: 'Checkout - Finaliser ma commande',
  description: 'Finalisez votre commande sur TomanStore avec un processus de checkout sécurisé et simple.'
})
</script>