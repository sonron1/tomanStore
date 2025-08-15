<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <!-- En-tête -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ isEditing ? 'Modifier l\'adresse' : 'Ajouter une adresse' }}
          </h3>
          <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <!-- Titre de l'adresse -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nom de l'adresse *
          </label>
          <input
              id="title"
              v-model="form.title"
              type="text"
              required
              placeholder="Ex: Maison, Bureau, Chez mes parents"
              :class="[
                'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                errors.title ? 'border-red-300' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              ]"
          />
          <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
        </div>

        <!-- Type d'adresse -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type d'adresse *
          </label>
          <div class="mt-2 flex space-x-4">
            <label class="flex items-center">
              <input
                  v-model="form.type"
                  type="radio"
                  value="home"
                  class="text-primary-600 focus:ring-primary-500"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">🏠 Domicile</span>
            </label>
            <label class="flex items-center">
              <input
                  v-model="form.type"
                  type="radio"
                  value="work"
                  class="text-primary-600 focus:ring-primary-500"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">🏢 Bureau</span>
            </label>
            <label class="flex items-center">
              <input
                  v-model="form.type"
                  type="radio"
                  value="other"
                  class="text-primary-600 focus:ring-primary-500"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">📍 Autre</span>
            </label>
          </div>
        </div>

        <!-- Prénom et Nom -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Prénom *
            </label>
            <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                :class="[
                  'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                  errors.firstName ? 'border-red-300' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                ]"
            />
            <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nom *
            </label>
            <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                :class="[
                  'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                  errors.lastName ? 'border-red-300' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                ]"
            />
            <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
          </div>
        </div>

        <!-- Adresse -->
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Adresse complète *
          </label>
          <textarea
              id="address"
              v-model="form.address"
              rows="3"
              required
              placeholder="Numéro, rue, quartier..."
              :class="[
                'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                errors.address ? 'border-red-300' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              ]"
          ></textarea>
          <p v-if="errors.address" class="mt-1 text-sm text-red-600">{{ errors.address }}</p>
        </div>

        <!-- Ville et Code postal -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Ville *
            </label>
            <select
                id="city"
                v-model="form.city"
                required
                :class="[
                  'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                  errors.city ? 'border-red-300' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                ]"
            >
              <option value="">Sélectionner une ville</option>
              <option value="Cotonou">Cotonou</option>
              <option value="Porto-Novo">Porto-Novo</option>
              <option value="Parakou">Parakou</option>
              <option value="Djougou">Djougou</option>
              <option value="Bohicon">Bohicon</option>
              <option value="Kandi">Kandi</option>
              <option value="Lokossa">Lokossa</option>
              <option value="Ouidah">Ouidah</option>
              <option value="Abomey">Abomey</option>
              <option value="Natitingou">Natitingou</option>
              <option value="Malanville">Malanville</option>
              <option value="Savalou">Savalou</option>
            </select>
            <p v-if="errors.city" class="mt-1 text-sm text-red-600">{{ errors.city }}</p>
          </div>

          <div>
            <label for="postalCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Code postal
            </label>
            <input
                id="postalCode"
                v-model="form.postalCode"
                type="text"
                placeholder="Ex: 01 BP 123"
                :class="[
                  'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                  'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                ]"
            />
          </div>
        </div>

        <!-- Pays -->
        <div>
          <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Pays *
          </label>
          <select
              id="country"
              v-model="form.country"
              required
              :class="[
                'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                errors.country ? 'border-red-300' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              ]"
          >
            <option value="">Sélectionner un pays</option>
            <option value="Bénin">Bénin</option>
            <option value="Togo">Togo</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Niger">Niger</option>
          </select>
          <p v-if="errors.country" class="mt-1 text-sm text-red-600">{{ errors.country }}</p>
        </div>

        <!-- Téléphone -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Téléphone
          </label>
          <input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="+229 XX XX XX XX"
              :class="[
                'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                errors.phone ? 'border-red-300' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              ]"
          />
          <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
        </div>

        <!-- Adresse par défaut -->
        <div class="flex items-center">
          <input
              id="isDefault"
              v-model="form.isDefault"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label for="isDefault" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Définir comme adresse par défaut
          </label>
        </div>

        <!-- Boutons d'action -->
        <div class="flex justify-end space-x-3 pt-4">
          <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Annuler
          </button>
          <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 bg-primary-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ isSubmitting ? 'Enregistrement...' : (isEditing ? 'Modifier' : 'Ajouter') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '~/types/auth'

interface Props {
  address?: Address | null
}

const props = withDefaults(defineProps<Props>(), {
  address: null
})

const emit = defineEmits<{
  close: []
  save: [address: Address]
}>()

// État local
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const isEditing = computed(() => !!props.address)

// Formulaire
const form = ref({
  title: '',
  type: 'home',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'Bénin',
  phone: '',
  isDefault: false
})

// Initialiser le formulaire avec les données existantes
watch(() => props.address, (address) => {
  if (address) {
    form.value = {
      title: address.title,
      type: address.type,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      city: address.city,
      postalCode: address.postalCode || '',
      country: address.country,
      phone: address.phone || '',
      isDefault: address.isDefault
    }
  } else {
    // Réinitialiser le formulaire pour un nouvel ajout
    form.value = {
      title: '',
      type: 'home',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Bénin',
      phone: '',
      isDefault: false
    }
  }
}, { immediate: true })

// Validation
const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.title.trim()) {
    errors.value.title = 'Le nom de l\'adresse est requis'
    isValid = false
  }

  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'Le prénom est requis'
    isValid = false
  }

  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Le nom est requis'
    isValid = false
  }

  if (!form.value.address.trim()) {
    errors.value.address = 'L\'adresse est requise'
    isValid = false
  }

  if (!form.value.city) {
    errors.value.city = 'La ville est requise'
    isValid = false
  }

  if (!form.value.country) {
    errors.value.country = 'Le pays est requis'
    isValid = false
  }

  if (form.value.phone && !/^\+229\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/.test(form.value.phone)) {
    errors.value.phone = 'Format de téléphone invalide (ex: +229 XX XX XX XX)'
    isValid = false
  }

  return isValid
}

// Soumission du formulaire
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    const addressData = {
      ...form.value,
      id: props.address?.id || '',
      userId: props.address?.userId || '',
      createdAt: props.address?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Address

    emit('save', addressData)
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>