<template>
  <div class="min-h-screen flex flex-col theme-transition"
       :class="{ 'dark': isDark }">
    <!-- Header -->
    <AppHeader />

    <!-- Contenu principal -->
    <main class="flex-1 flex flex-col">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Informations de la boutique -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">T</span>
              </div>
              <span class="text-xl font-bold">TomanStore</span>
            </div>
            <p class="text-gray-300 dark:text-gray-400 mb-4">
              Votre boutique de t-shirts de qualité. Nous proposons une large sélection
              de t-shirts confortables et stylés pour tous les goûts.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">Facebook</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                <span class="sr-only">Instagram</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297L6.391 14.5c.555.555 1.236.852 1.945.852c1.516 0 2.75-1.234 2.75-2.75s-1.234-2.75-2.75-2.75s-2.75 1.234-2.75 2.75c0 .709.297 1.39.852 1.945l-1.191 1.266c-.807-.876-1.297-2.027-1.297-3.324c0-2.75 2.234-4.984 4.984-4.984s4.984 2.234 4.984 4.984S11.199 16.988 8.449 16.988z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Liens utiles -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-white">Liens utiles</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Accueil</NuxtLink></li>
              <li><NuxtLink to="/products" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Produits</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">À propos</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Contact</NuxtLink></li>
            </ul>
          </div>

          <!-- Support client -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Livraison</a></li>
              <li><a href="#" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Retours</a></li>
              <li><a href="#" class="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">Guide des tailles</a></li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-700 dark:border-gray-600 pt-8 mt-8">
          <p class="text-center text-gray-300 dark:text-gray-400">
            © {{ new Date().getFullYear() }} TomanStore. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>

    <!-- Conteneur de notifications -->
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
const { currentTheme, isDark } = useThemeStore()
</script>