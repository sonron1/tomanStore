<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- En-tête -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Une question ? Un problème ? Notre équipe est là pour vous aider !
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Formulaire de contact -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>

        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Nom -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
                v-model="form.name"
                type="text"
                id="name"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Votre nom complet"
            >
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Adresse email *
            </label>
            <input
                v-model="form.email"
                type="email"
                id="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="votre@email.com"
            >
          </div>

          <!-- Sujet -->
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
              Sujet *
            </label>
            <select
                v-model="form.subject"
                id="subject"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">Choisissez un sujet</option>
              <option value="commande">Question sur une commande</option>
              <option value="produit">Question sur un produit</option>
              <option value="livraison">Livraison</option>
              <option value="retour">Retour/Échange</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
                v-model="form.message"
                id="message"
                required
                rows="5"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical"
                placeholder="Décrivez votre demande en détail..."
            ></textarea>
          </div>

          <!-- Bouton d'envoi -->
          <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">Envoi en cours...</span>
            <span v-else>Envoyer le message</span>
          </button>
        </form>
      </div>

      <!-- Informations de contact -->
      <div class="space-y-8">
        <!-- Coordonnées -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-semibold mb-6">Nos coordonnées</h2>

          <div class="space-y-4">
            <div class="flex items-start">
              <svg class="w-6 h-6 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <div>
                <h3 class="font-semibold">Adresse</h3>
                <p class="text-gray-600">123 Rue de la Mode<br>75001 Paris, France</p>
              </div>
            </div>

            <div class="flex items-start">
              <svg class="w-6 h-6 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <div>
                <h3 class="font-semibold">Téléphone</h3>
                <p class="text-gray-600">+33 1 23 45 67 89</p>
              </div>
            </div>

            <div class="flex items-start">
              <svg class="w-6 h-6 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <div>
                <h3 class="font-semibold">Email</h3>
                <p class="text-gray-600">contact@tomanstore.fr</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Horaires -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-semibold mb-6">Horaires d'ouverture</h2>

          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="font-medium">Lundi - Vendredi</span>
              <span class="text-gray-600">9h00 - 18h00</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Samedi</span>
              <span class="text-gray-600">10h00 - 17h00</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Dimanche</span>
              <span class="text-red-600">Fermé</span>
            </div>
          </div>
        </div>

        <!-- FAQ rapide -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-semibold mb-6">Questions fréquentes</h2>

          <div class="space-y-4">
            <div>
              <h3 class="font-semibold text-sm">Délai de livraison ?</h3>
              <p class="text-gray-600 text-sm">2-3 jours ouvrés en France métropolitaine</p>
            </div>
            <div>
              <h3 class="font-semibold text-sm">Retours gratuits ?</h3>
              <p class="text-gray-600 text-sm">Oui, sous 30 jours après réception</p>
            </div>
            <div>
              <h3 class="font-semibold text-sm">Guide des tailles ?</h3>
              <p class="text-gray-600 text-sm">Disponible sur chaque fiche produit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { notifySuccess, notifyError } = useNotificationStore()

// État du formulaire
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simulation d'envoi (vous pourrez connecter une vraie API plus tard)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Réinitialiser le formulaire
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }

    notifySuccess(
        'Message envoyé',
        'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
        5000
    )
  } catch (error) {
    notifyError(
        'Erreur d\'envoi',
        'Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.'
    )
  } finally {
    isSubmitting.value = false
  }
}

// Meta tags
useSeoMeta({
  title: 'Contact',
  description: 'Contactez l\'équipe TomanStore pour toutes vos questions sur nos t-shirts et notre service.'
})
</script>