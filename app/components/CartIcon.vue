<template>
  <NuxtLink to="/cart" class="relative inline-flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors">
    <!-- Icône du panier -->
    <svg
        class="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m0 0h12.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
      />
    </svg>

    <!-- Badge avec le nombre d'articles - Animation sur changement -->
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="scale-0 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-0 opacity-0"
    >
      <span
          v-if="displayItemCount > 0"
          :key="displayItemCount"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
          :class="{ 'animate-bounce': itemCountChanged }"
      >
        {{ displayItemCount > 99 ? '99+' : displayItemCount }}
      </span>
    </Transition>
  </NuxtLink>
</template>

<script setup lang="ts">
import {useCartStore} from "~/stores/cart";

const cartStore = useCartStore()
const { itemCount } = storeToRefs(cartStore)

// Variable réactive pour détecter les changements
const displayItemCount = ref(0)
const itemCountChanged = ref(false)

// Watcher pour détecter les changements et animer
watch(itemCount, (newCount, oldCount) => {
  displayItemCount.value = newCount

  if (newCount !== oldCount && process.client) {
    itemCountChanged.value = true
    // Retirer l'animation après un délai
    setTimeout(() => {
      itemCountChanged.value = false
    }, 600)
  }
}, { immediate: true })

// Initialiser la valeur au montage
onMounted(() => {
  displayItemCount.value = itemCount.value
})
</script>