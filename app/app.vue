<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Configuration globale de l'application
useHead({
  titleTemplate: '%s - TomanStore',
  meta: [
    { name: 'charset', content: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Transitions fluides pour le changement de thème */
  *,
  *::before,
  *::after {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }

  body {
    @apply bg-gray-50 text-gray-900 font-sans;
    @apply dark:bg-gray-900 dark:text-gray-100;
  }

  html {
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  }

  /* Scrollbar personnalisée pour le mode sombre */
  ::-webkit-scrollbar {
    @apply w-2;
  }

  ::-webkit-scrollbar-track {
    @apply bg-gray-100 dark:bg-gray-800;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gray-300 dark:bg-gray-600 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-400 dark:bg-gray-500;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200;
    @apply dark:bg-blue-500 dark:hover:bg-blue-600;
  }

  .btn-secondary {
    @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200;
    @apply dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200;
  }

  .card {
    @apply bg-white rounded-lg shadow-md p-6 border border-gray-200;
    @apply dark:bg-gray-800 dark:border-gray-700 dark:shadow-lg;
  }

  .product-card {
    @apply bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300;
    @apply dark:bg-gray-800 dark:shadow-lg dark:hover:shadow-xl dark:border dark:border-gray-700;
  }

  .header-nav {
    @apply bg-white shadow-sm border-b border-gray-200;
    @apply dark:bg-gray-800 dark:border-gray-700;
  }

  /* Styles pour les inputs en mode sombre */
  input[type="text"],
  input[type="email"],
  input[type="search"],
  select,
  textarea {
    @apply dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400;
    @apply dark:focus:ring-primary-500 dark:focus:border-primary-500;
  }

  /* Styles pour les radios et checkboxes en mode sombre */
  input[type="radio"],
  input[type="checkbox"] {
    @apply dark:bg-gray-700 dark:border-gray-600;
    @apply dark:checked:bg-primary-500 dark:checked:border-primary-500;
  }

  /* Amélioration des notifications pour le mode sombre */
  .notification-card {
    @apply dark:bg-gray-800 dark:ring-gray-700;
  }

  .notification-card .notification-content {
    @apply dark:text-gray-100;
  }

  .notification-card .notification-description {
    @apply dark:text-gray-300;
  }
}

/* Classes utilitaires personnalisées pour les transitions de thème */
@layer utilities {
  .theme-transition {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  }

  .glass-effect {
    @apply bg-white/80 backdrop-blur-sm dark:bg-gray-800/80;
  }

  .text-primary-theme {
    @apply text-primary-600 dark:text-primary-400;
  }

  .bg-primary-theme {
    @apply bg-primary-600 dark:bg-primary-500;
  }
}
</style>