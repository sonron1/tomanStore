<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- En-tête avec breadcrumbs -->
    <div class="mb-8">
      <nav class="flex mb-4" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <NuxtLink to="/" class="text-gray-500 hover:text-primary-600 dark:text-gray-400">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <NuxtLink to="/profile" class="ml-1 text-gray-500 hover:text-primary-600 dark:text-gray-400">
                Mon Profil
              </NuxtLink>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 text-gray-500 dark:text-gray-400">Mes commandes</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Mes commandes
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Suivez vos commandes et consultez votre historique d'achats
          </p>
        </div>
        <NuxtLink
            to="/"
            class="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
        >
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          Continuer mes achats
        </NuxtLink>
      </div>
    </div>

    <!-- Filtres et recherche -->
    <div class="mb-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <select
              v-model="selectedStatus"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-sm"
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="processing">En traitement</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="cancelled">Annulée</option>
          </select>

          <select
              v-model="selectedPeriod"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-sm"
          >
            <option value="">Toutes les périodes</option>
            <option value="30">30 derniers jours</option>
            <option value="90">3 derniers mois</option>
            <option value="365">Dernière année</option>
          </select>
        </div>

        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ filteredOrders.length }} commande{{ filteredOrders.length !== 1 ? 's' : '' }}
          </span>
          <button
              @click="refreshOrders"
              class="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Liste des commandes -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- État vide -->
    <div v-else-if="filteredOrders.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 shadow rounded-lg">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        Aucune commande trouvée
      </h3>
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        {{ selectedStatus || selectedPeriod ? 'Aucune commande ne correspond aux filtres sélectionnés.' : 'Vous n\'avez pas encore passé de commande.' }}
      </p>
      <div class="mt-6">
        <NuxtLink
            to="/"
            class="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
        >
          Découvrir nos produits
        </NuxtLink>
      </div>
    </div>

    <!-- Commandes -->
    <div v-else class="space-y-6">
      <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
      >
        <!-- En-tête de commande -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  Commande #{{ order.orderNumber }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Passée le {{ formatDate(order.createdAt) }}
                </p>
              </div>
              <div :class="getStatusClasses(order.status)">
                {{ getStatusLabel(order.status) }}
              </div>
            </div>
            <div class="text-right">
              <p class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ order.total.toLocaleString('fr-FR') }} F CFA
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ order.items.length }} article{{ order.items.length !== 1 ? 's' : '' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Articles de la commande -->
        <div class="px-6 py-4">
          <div class="space-y-4">
            <div
                v-for="item in order.items"
                :key="item.id"
                class="flex items-center space-x-4"
            >
              <img
                  :src="item.image || '/placeholder-product.jpg'"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
              />
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ item.name }}
                </h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Quantité : {{ item.quantity }}
                  <span v-if="item.size" class="ml-2">• Taille : {{ item.size }}</span>
                  <span v-if="item.color" class="ml-2">• Couleur : {{ item.color }}</span>
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ (item.price * item.quantity).toLocaleString('fr-FR') }} F CFA
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ item.price.toLocaleString('fr-FR') }} F CFA l'unité
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
          <div class="flex space-x-3">
            <button
                @click="viewOrderDetails(order)"
                class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              Voir les détails
            </button>
            <button
                v-if="order.status === 'delivered'"
                @click="downloadInvoice(order)"
                class="text-sm font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400"
            >
              Télécharger la facture
            </button>
            <button
                v-if="canReorder(order)"
                @click="reorderItems(order)"
                class="text-sm font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400"
            >
              Commander à nouveau
            </button>
          </div>
          <div class="text-right">
            <p v-if="order.trackingNumber" class="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Suivi : {{ order.trackingNumber }}
            </p>
            <p v-if="order.estimatedDelivery" class="text-xs text-gray-500 dark:text-gray-400">
              Livraison prévue : {{ formatDate(order.estimatedDelivery) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="filteredOrders.length > 0" class="mt-8 flex items-center justify-between">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        Affichage de {{ ((currentPage - 1) * itemsPerPage) + 1 }} à
        {{ Math.min(currentPage * itemsPerPage, filteredOrders.length) }}
        sur {{ filteredOrders.length }} commandes
      </div>
      <div class="flex space-x-2">
        <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Précédent
        </button>
        <button
            @click="currentPage++"
            :disabled="currentPage * itemsPerPage >= filteredOrders.length"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Protection de la page
definePageMeta({
  middleware: 'auth'
})

// Meta tags
useSeoMeta({
  title: 'Mes commandes - TomanStore',
  description: 'Consultez et suivez toutes vos commandes TomanStore.'
})

// État local
const isLoading = ref(false)
const selectedStatus = ref('')
const selectedPeriod = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

// Données des commandes (à charger depuis l'API)
const orders = ref([])

// Commandes filtrées
const filteredOrders = computed(() => {
  let filtered = [...orders.value]

  if (selectedStatus.value) {
    filtered = filtered.filter(order => order.status === selectedStatus.value)
  }

  if (selectedPeriod.value) {
    const days = parseInt(selectedPeriod.value)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    filtered = filtered.filter(order => new Date(order.createdAt) >= cutoffDate)
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

// Fonctions utilitaires
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'En attente',
    processing: 'En traitement',
    shipped: 'Expédiée',
    delivered: 'Livrée',
    cancelled: 'Annulée'
  }
  return labels[status] || status
}

const getStatusClasses = (status: string) => {
  const classes = 'px-3 py-1 text-xs font-medium rounded-full'
  const statusClasses: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return `${classes} ${statusClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}`
}

const canReorder = (order: any) => {
  return ['delivered', 'cancelled'].includes(order.status)
}

// Actions
const refreshOrders = async () => {
  isLoading.value = true
  try {
    // TODO: Charger les commandes depuis l'API
    // const response = await $fetch('/api/orders')
    // orders.value = response.orders
    console.log('Chargement des commandes depuis l\'API...')
  } catch (error) {
    console.error('Erreur lors du chargement des commandes:', error)
    const { notifyError } = useNotificationStore()
    notifyError('Erreur', 'Impossible de charger vos commandes')
  } finally {
    isLoading.value = false
  }
}

const viewOrderDetails = (order: any) => {
  // Rediriger vers une page de détails ou ouvrir un modal
  console.log('Voir détails de la commande:', order.id)
}

const downloadInvoice = (order: any) => {
  // Télécharger la facture
  console.log('Télécharger facture pour commande:', order.id)
}

const reorderItems = (order: any) => {
  // Ajouter les articles au panier
  console.log('Recommander les articles de la commande:', order.id)
  const { notifySuccess } = useNotificationStore()
  notifySuccess('Articles ajoutés', 'Les articles ont été ajoutés à votre panier')
}

// Charger les commandes au montage
onMounted(() => {
  refreshOrders()
})
</script>