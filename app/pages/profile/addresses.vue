<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- En-tête -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Mes Adresses</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Gérez vos adresses de livraison et de facturation au Bénin
      </p>
    </div>

    <!-- Navigation breadcrumb -->
    <nav class="flex mb-8" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-4">
        <li>
          <NuxtLink to="/" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <svg class="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span class="sr-only">Accueil</span>
          </NuxtLink>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <NuxtLink to="/profile" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Mon Profil
            </NuxtLink>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="ml-4 text-sm font-medium text-gray-900 dark:text-white" aria-current="page">
              Mes Adresses
            </span>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Contenu principal -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <!-- En-tête avec bouton d'ajout -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
              Adresses de livraison
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ addresses.length }} adresse{{ addresses.length > 1 ? 's' : '' }} enregistrée{{ addresses.length > 1 ? 's' : '' }}
            </p>
          </div>

          <button
              @click="openAddressModal()"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une adresse
          </button>
        </div>
      </div>

      <!-- État de chargement -->
      <div v-if="isLoading" class="px-6 py-8">
        <div class="flex items-center justify-center">
          <svg class="animate-spin h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="ml-3 text-gray-600 dark:text-gray-400">Chargement des adresses...</span>
        </div>
      </div>

      <!-- Liste des adresses ou message vide -->
      <div v-else-if="addresses.length === 0" class="px-6 py-8 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucune adresse</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ajoutez votre première adresse de livraison au Bénin.
        </p>
        <div class="mt-6">
          <button
              @click="openAddressModal()"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            Ajouter une adresse
          </button>
        </div>
      </div>

      <!-- Grille des adresses -->
      <div v-else class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
              v-for="address in addresses"
              :key="address.id"
              class="relative bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <!-- Badge adresse par défaut -->
            <div v-if="address.isDefault" class="absolute top-2 right-2">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Défaut
              </span>
            </div>

            <!-- Contenu de l'adresse -->
            <div class="space-y-2">
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                {{ address.title }}
              </h3>

              <div class="text-sm text-gray-600 dark:text-gray-300">
                <p class="font-medium">{{ address.firstName }} {{ address.lastName }}</p>
                <p>{{ address.address }}</p>
                <p>{{ address.postalCode ? address.postalCode + ' ' : '' }}{{ address.city }}</p>
                <p>{{ address.country }}</p>
                <p v-if="address.phone" class="mt-1">📞 {{ address.phone }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <button
                    @click="openAddressModal(address)"
                    class="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  Modifier
                </button>

                <span class="text-gray-300 dark:text-gray-600">|</span>

                <button
                    v-if="!address.isDefault"
                    @click="setDefaultAddress(address)"
                    class="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 font-medium transition-colors"
                >
                  Définir par défaut
                </button>

                <button
                    v-if="!address.isDefault"
                    @click="deleteAddress(address)"
                    class="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal d'ajout/modification d'adresse -->
    <AddressModal
        v-if="showModal"
        :address="editingAddress"
        @close="closeAddressModal"
        @save="handleSaveAddress"
    />
  </div>
</template>

<script setup lang="ts">
import type { Address } from '~/types/auth'

// Protection de la page
definePageMeta({
  middleware: 'auth'
})

// Meta tags
useSeoMeta({
  title: 'Mes Adresses - TomanStore',
  description: 'Gérez vos adresses de livraison et de facturation au Bénin sur TomanStore.'
})

const authStore = useAuthStore()

// État local
const addresses = ref<Address[]>([])
const isLoading = ref(true)
const showModal = ref(false)
const editingAddress = ref<Address | null>(null)

// Récupérer les adresses
const fetchAddresses = async () => {
  isLoading.value = true
  try {
    addresses.value = await authStore.getUserAddresses()
  } catch (error) {
    console.error('Erreur lors de la récupération des adresses:', error)
    const { notifyError } = useNotificationStore()
    notifyError('Erreur', 'Impossible de charger vos adresses')
  } finally {
    isLoading.value = false
  }
}

// Ouvrir le modal d'adresse
const openAddressModal = (address?: Address) => {
  editingAddress.value = address || null
  showModal.value = true
}

// Fermer le modal d'adresse
const closeAddressModal = () => {
  showModal.value = false
  editingAddress.value = null
}

// Gérer la sauvegarde d'une adresse
const handleSaveAddress = async (addressData: Address) => {
  try {
    let success = false

    if (editingAddress.value) {
      // Modification
      success = await authStore.updateAddress(editingAddress.value.id, addressData)
    } else {
      // Ajout
      const { id, userId, createdAt, updatedAt, ...dataToSend } = addressData
      success = await authStore.saveAddress(dataToSend)
    }

    if (success) {
      closeAddressModal()
      await fetchAddresses()
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
  }
}

// Définir une adresse par défaut
const setDefaultAddress = async (address: Address) => {
  const success = await authStore.updateAddress(address.id, { isDefault: true })
  if (success) {
    await fetchAddresses()
  }
}

// Supprimer une adresse
const deleteAddress = async (address: Address) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
    return
  }

  const success = await authStore.deleteAddress(address.id)
  if (success) {
    await fetchAddresses()
  }
}

// Charger les adresses au montage
onMounted(() => {
  fetchAddresses()
})
</script>