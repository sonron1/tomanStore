import { defineStore } from 'pinia'
import type { Product } from '~/types/product'

export const useProductsStore = defineStore('products', () => {
    const products = ref<Product[]>([
        {
            id: 1,
            name: 'T-shirt Classique Noir',
            description: 'T-shirt en coton bio de qualité supérieure, coupe classique et confortable.',
            price: 24.99,
            image: '/images/products/tshirt-noir.jpg',
            category: 'Classique',
            sizes: [
                { size: 'S', available: true },
                { size: 'M', available: true },
                { size: 'L', available: true },
                { size: 'XL', available: false }
            ],
            colors: [
                { name: 'Noir', hex: '#000000', available: true },
                { name: 'Blanc', hex: '#FFFFFF', available: true }
            ],
            inStock: true
        },
        {
            id: 2,
            name: 'T-shirt Vintage Gris',
            description: 'T-shirt avec un look vintage, parfait pour un style décontracté.',
            price: 29.99,
            image: '/images/products/tshirt-gris.jpg',
            category: 'Vintage',
            sizes: [
                { size: 'S', available: true },
                { size: 'M', available: true },
                { size: 'L', available: true },
                { size: 'XL', available: true }
            ],
            colors: [
                { name: 'Gris', hex: '#808080', available: true }
            ],
            inStock: true
        },
        {
            id: 3,
            name: 'T-shirt Moderne Bleu',
            description: 'Coupe moderne et ajustée, idéal pour un look contemporain.',
            price: 27.99,
            image: '/images/products/tshirt-bleu.png',
            category: 'Moderne',
            sizes: [
                { size: 'S', available: false },
                { size: 'M', available: true },
                { size: 'L', available: true },
                { size: 'XL', available: true }
            ],
            colors: [
                { name: 'Bleu', hex: '#0000FF', available: true }
            ],
            inStock: true
        }
    ])

    const getProductById = (id: number): Product | undefined => {
        return products.value.find(product => product.id === id)
    }

    const getProductsByCategory = (category: string): Product[] => {
        return products.value.filter(product => product.category === category)
    }

    const getAvailableProducts = (): Product[] => {
        return products.value.filter(product => product.inStock)
    }

    return {
        products: readonly(products),
        getProductById,
        getProductsByCategory,
        getAvailableProducts
    }
})