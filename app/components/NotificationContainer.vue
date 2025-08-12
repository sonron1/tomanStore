<template>
  <Teleport to="body">
    <!-- Conteneur principal des notifications -->
    <div class="fixed inset-0 z-50 pointer-events-none">
      <!-- Positionnement en haut à droite avec marges appropriées -->
      <div class="absolute top-6 right-6 max-w-sm w-full space-y-3">
        <TransitionGroup
            name="notification"
            tag="div"
            class="space-y-3"
        >
          <div
              v-for="notification in notifications"
              :key="notification.id"
              class="pointer-events-auto transform transition-all duration-300 ease-in-out"
          >
            <!-- Carte de notification -->
            <div
                :class="[
                'bg-white rounded-xl shadow-lg ring-1 ring-black/5 border-l-4 overflow-hidden',
                'backdrop-blur-sm bg-white/95',
                {
                  'border-l-green-500': notification.type === 'success',
                  'border-l-red-500': notification.type === 'error',
                  'border-l-yellow-500': notification.type === 'warning',
                  'border-l-blue-500': notification.type === 'info'
                }
              ]"
            >
              <div class="p-4">
                <div class="flex items-start">
                  <!-- Icône selon le type -->
                  <div class="flex-shrink-0 mr-3">
                    <!-- Icône Success -->
                    <div
                        v-if="notification.type === 'success'"
                        class="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full"
                    >
                      <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <!-- Icône Error -->
                    <div
                        v-else-if="notification.type === 'error'"
                        class="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full"
                    >
                      <svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>

                    <!-- Icône Warning -->
                    <div
                        v-else-if="notification.type === 'warning'"
                        class="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full"
                    >
                      <svg class="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>

                    <!-- Icône Info -->
                    <div
                        v-else
                        class="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full"
                    >
                      <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  <!-- Contenu de la notification -->
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-semibold text-gray-900 mb-1">
                      {{ notification.title }}
                    </h4>
                    <p class="text-sm text-gray-600 leading-relaxed">
                      {{ notification.message }}
                    </p>
                  </div>

                  <!-- Bouton fermer -->
                  <div class="ml-3 flex-shrink-0">
                    <button
                        @click="removeNotification(notification.id)"
                        class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      <span class="sr-only">Fermer la notification</span>
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Barre de progression (optionnelle) -->
                <div
                    v-if="notification.duration && notification.duration > 0"
                    class="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden"
                >
                  <div
                      :class="[
                      'h-full transition-all ease-linear rounded-full',
                      {
                        'bg-green-500': notification.type === 'success',
                        'bg-red-500': notification.type === 'error',
                        'bg-yellow-500': notification.type === 'warning',
                        'bg-blue-500': notification.type === 'info'
                      }
                    ]"
                      :style="{
                      width: '100%',
                      animation: `shrink ${notification.duration}ms linear`
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {useNotificationStore} from "~/stores/notifications";

const { notifications, removeNotification } = useNotificationStore()
</script>

<style scoped>
/* Animations pour les notifications */
.notification-enter-active {
  transition: all 0.4s ease-out;
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.notification-move {
  transition: transform 0.3s ease;
}

/* Animation pour la barre de progression */
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* Responsive pour mobile */
@media (max-width: 640px) {
  .fixed .absolute {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}
</style>