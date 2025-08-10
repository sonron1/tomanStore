<template>
  <div>
    <!-- Section héro -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">À propos de TomanStore</h1>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto">
            Découvrez l'histoire de notre boutique et notre passion pour la qualité et le style
          </p>
        </div>
      </div>
    </section>

    <!-- Notre histoire -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Notre histoire</h2>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                TomanStore a été fondée en 2020 avec une mission simple : proposer des t-shirts
                de qualité supérieure qui allient confort, style et durabilité. Notre aventure
                a commencé avec la conviction que les vêtements de base méritent autant d'attention
                que les pièces de haute couture.
              </p>
              <p>
                Depuis nos débuts, nous nous sommes engagés à utiliser uniquement des matières
                premières de la plus haute qualité, notamment le coton biologique certifié.
                Chaque t-shirt est conçu avec soin pour offrir une coupe parfaite et un confort
                exceptionnel qui dure dans le temps.
              </p>
              <p>
                Aujourd'hui, TomanStore est devenue une référence pour les amateurs de t-shirts
                de qualité, avec des milliers de clients satisfaits qui nous font confiance
                pour leurs essentiels de garde-robe.
              </p>
            </div>
          </div>
          <div class="order-first lg:order-last">
            <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span class="text-gray-500">Image de l'équipe</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos valeurs -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Nos valeurs</h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Les principes qui guident notre travail au quotidien
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">Qualité avant tout</h3>
            <p class="text-gray-600">
              Nous sélectionnons rigoureusement nos matériaux et surveillons chaque étape
              de production pour garantir une qualité exceptionnelle.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">Responsabilité environnementale</h3>
            <p class="text-gray-600">
              Nous nous engageons pour un mode de production respectueux de l'environnement
              avec des matières biologiques et des processus durables.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">Service client exceptionnel</h3>
            <p class="text-gray-600">
              Notre équipe est là pour vous accompagner dans votre expérience d'achat
              et répondre à toutes vos questions avec professionnalisme et bienveillance.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Engagement qualité -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Notre engagement qualité</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">100%</div>
            <div class="text-gray-600">Coton biologique certifié</div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">30 jours</div>
            <div class="text-gray-600">Retours gratuits</div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">24h</div>
            <div class="text-gray-600">Expédition rapide</div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">5000+</div>
            <div class="text-gray-600">Clients satisfaits</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Meta tags
useSeoMeta({
  title: 'À propos',
  description: 'Découvrez l\'histoire de TomanStore, nos valeurs et notre engagement pour la qualité.'
})
</script>