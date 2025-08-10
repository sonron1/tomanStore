import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin(() => {
    // Injecter les styles Tailwind directement
    const style = document.createElement('style')
    style.innerHTML = `
    @import 'tailwindcss/base';
    @import 'tailwindcss/components';
    @import 'tailwindcss/utilities';
    
    @layer base {
      body {
        @apply bg-gray-50 text-gray-900;
      }
    }
    
    @layer components {
      .btn-primary {
        @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200;
      }
      
      .btn-secondary {
        @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200;
      }
      
      .card {
        @apply bg-white rounded-lg shadow-md p-6 border border-gray-200;
      }
      
      .product-card {
        @apply bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300;
      }
      
      .header-nav {
        @apply bg-white shadow-sm border-b border-gray-200;
      }
    }
  `
    document.head.appendChild(style)
})