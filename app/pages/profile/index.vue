
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
              <span class="ml-1 text-gray-500 dark:text-gray-400">Mon Profil</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="flex items-center space-x-4">
        <img
            :src="getAvatarUrl(user)"
            :alt="`Avatar de ${fullName}`"
            class="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Bienvenue {{ user?.firstName }}
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Gérez vos informations personnelles et vos préférences
          </p>
        </div>
      </div>
    </div>

    <!-- Statistiques utilisateur -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Commandes totales
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ userStats.totalOrders }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Adresses enregistrées
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ userStats.totalAddresses }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 12a4 4 0 110-8 4 4 0 010 8z"/>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Membre depuis
                </dt>
                <dd class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ userStats.memberSince }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Navigation sidebar avec badges -->
      <div class="lg:col-span-1">
        <nav class="space-y-2">
          <a
              href="#profile"
              :class="[
              activeSection === 'profile'
                ? 'bg-primary-50 border-primary-500 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
              'group border-l-4 px-3 py-3 flex items-center justify-between text-sm font-medium transition-colors rounded-r-md'
            ]"
              @click="activeSection = 'profile'"
          >
            <div class="flex items-center">
              <svg class="text-gray-400 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Informations personnelles
            </div>
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>

          <NuxtLink
              to="/profile/orders"
              class="border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white group border-l-4 px-3 py-3 flex items-center justify-between text-sm font-medium transition-colors rounded-r-md"
          >
            <div class="flex items-center">
              <svg class="text-gray-400 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              Mes commandes
            </div>
            <div class="flex items-center">
              <span v-if="userStats.totalOrders > 0" class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
                {{ userStats.totalOrders }}
              </span>
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </NuxtLink>

          <NuxtLink
              to="/profile/addresses"
              class="border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white group border-l-4 px-3 py-3 flex items-center justify-between text-sm font-medium transition-colors rounded-r-md"
          >
            <div class="flex items-center">
              <svg class="text-gray-400 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Mes adresses
            </div>
            <div class="flex items-center">
              <span v-if="userStats.totalAddresses > 0" class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
                {{ userStats.totalAddresses }}
              </span>
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </NuxtLink>
        </nav>

        <!-- Actions rapides -->
        <div class="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Actions rapides</h3>
          <div class="space-y-3">
            <button
                @click="activeSection = 'security'"
                class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Changer le mot de passe
            </button>
            <NuxtLink
                to="/profile/orders"
                class="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Voir mes commandes
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="lg:col-span-2">
        <!-- Section Informations personnelles -->
        <div v-if="activeSection === 'profile'" class="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Informations personnelles
            </h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Mettez à jour vos informations de profil et préférences de communication
            </p>
          </div>

          <!-- Message de succès -->
          <div v-if="showSuccessMessage" class="px-6 py-4 bg-green-50 dark:bg-green-900/20 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <p class="ml-2 text-sm text-green-700 dark:text-green-400">
                Profil mis à jour avec succès !
              </p>
            </div>
          </div>

          <form @submit.prevent="handleUpdateProfile" class="px-6 py-6 space-y-6">
            <!-- Avatar avec upload -->
            <div class="flex items-center space-x-6">
              <div class="relative">
                <img
                    :src="getAvatarUrl(user)"
                    :alt="`Avatar de ${fullName}`"
                    class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                />
                <button
                    type="button"
                    class="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </button>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Photo de profil</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  JPG, GIF ou PNG. Taille recommandée : 400x400px, max. 2MB
                </p>
                <div class="mt-2 flex space-x-2">
                  <button
                      type="button"
                      class="text-sm bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Changer
                  </button>
                  <button
                      type="button"
                      class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>

            <!-- Informations de base -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prénom *
                </label>
                <input
                    id="firstName"
                    v-model="profileForm.firstName"
                    type="text"
                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Votre prénom"
                />
                <p v-if="errors.firstName" class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {{ errors.firstName }}
                </p>
              </div>

              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom *
                </label>
                <input
                    id="lastName"
                    v-model="profileForm.lastName"
                    type="text"
                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Votre nom"
                />
                <p v-if="errors.lastName" class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {{ errors.lastName }}
                </p>
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Adresse email
              </label>
              <div class="relative">
                <input
                    id="email"
                    :value="user?.email"
                    type="email"
                    readonly
                    class="block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 sm:text-sm cursor-not-allowed"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
              </div>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                <svg class="inline h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Contactez le support pour modifier votre adresse email
              </p>
            </div>

            <!-- Téléphone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Téléphone
              </label>
              <input
                  id="phone"
                  v-model="profileForm.phone"
                  type="tel"
                  class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="+229 XX XX XX XX"
              />
              <p v-if="errors.phone" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ errors.phone }}
              </p>
            </div>

            <!-- Boutons d'action -->
            <div class="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                  type="button"
                  @click="resetForm"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Annuler
              </button>

              <button
                  type="submit"
                  :disabled="isLoading"
                  class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                    v-if="isLoading"
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Enregistrement...' : 'Enregistrer les modifications' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Section Sécurité -->
        <div v-if="activeSection === 'security'" class="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Sécurité du compte
            </h2>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Gérez votre mot de passe et la sécurité de votre compte
            </p>
          </div>

          <div class="px-6 py-6">
            <div class="space-y-6">
              <!-- Changement de mot de passe -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Changer le mot de passe
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Pour votre sécurité, utilisez un mot de passe fort et unique
                </p>
                <button class="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors">
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  Changer le mot de passe
                </button>
              </div>

              <!-- Sessions actives -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Sessions actives
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Gérez vos sessions de connexion actives
                </p>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <div class="flex items-center">
                      <svg class="h-6 w-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <div>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                          Session actuelle - Windows Chrome
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          Dernière activité : maintenant
                        </p>
                      </div>
                    </div>
                    <span class="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                      Actuelle
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UpdateProfileRequest } from '~/types/auth'

// Protection de la page
definePageMeta({
  middleware: 'auth'
})

// Meta tags
useSeoMeta({
  title: 'Mon Profil - TomanStore',
  description: 'Gérez vos informations personnelles et vos préférences sur TomanStore.'
})

const { user, fullName, updateProfile, getAvatarUrl, isLoading } = useAuth()

// État local
const activeSection = ref('profile')
const errors = ref<Record<string, string>>({})
const showSuccessMessage = ref(false)

// Statistiques utilisateur (simulées pour le moment)
const userStats = computed(() => ({
  totalOrders: 3,
  totalAddresses: 2,
  memberSince: user.value?.createdAt ?
      new Date(user.value.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short'
      }) : '2024'
}))

// Formulaire de profil
const profileForm = ref<UpdateProfileRequest>({
  firstName: '',
  lastName: '',
  phone: ''
})

// Initialiser le formulaire avec les données utilisateur
const initializeForm = () => {
  if (user.value) {
    profileForm.value = {
      firstName: user.value.firstName || '',
      lastName: user.value.lastName || '',
      phone: user.value.phone || ''
    }
  }
}

// Réinitialiser le formulaire
const resetForm = () => {
  initializeForm()
  errors.value = {}
  showSuccessMessage.value = false
}

// Gestion de la mise à jour du profil
const handleUpdateProfile = async () => {
  errors.value = {}
  showSuccessMessage.value = false

  // Validation simple côté client
  if (!profileForm.value.firstName?.trim()) {
    errors.value.firstName = 'Le prénom est requis'
  }

  if (!profileForm.value.lastName?.trim()) {
    errors.value.lastName = 'Le nom est requis'
  }

  if (Object.keys(errors.value).length > 0) {
    return
  }

  // Mettre à jour le profil
  const success = await updateProfile(profileForm.value)

  if (success) {
    showSuccessMessage.value = true
    // Masquer le message après 3 secondes
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  }
}

// Initialiser le formulaire au montage
onMounted(() => {
  initializeForm()
})

// Réinitialiser le formulaire si l'utilisateur change
watch(() => user.value, () => {
  initializeForm()
}, { deep: true })
</script>