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
            image: '/images/products/tshirt-bleu.jpg',
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
        },
        {
            id: 4,
            name: 'T-shirt Sport Rouge',
            description: 'T-shirt technique pour le sport, tissu respirant et séchage rapide.',
            price: 32.99,
            image: '/images/products/tshirt-rouge.jpg',
            category: 'Sport',
            sizes: [
                { size: 'S', available: true },
                { size: 'M', available: true },
                { size: 'L', available: true },
                { size: 'XL', available: true }
            ],
            colors: [
                { name: 'Rouge', hex: '#FF0000', available: true }
            ],
            inStock: true
        },
        {
            id: 5,
            name: 'T-shirt Casual Vert',
            description: 'T-shirt décontracté avec coupe ample, parfait pour le weekend.',
            price: 26.99,
            image: '/images/products/tshirt-vert.jpg',
            category: 'Casual',
            sizes: [
                { size: 'S', available: true },
                { size: 'M', available: false },
                { size: 'L', available: true },
                { size: 'XL', available: true }
            ],
            colors: [
                { name: 'Vert', hex: '#008000', available: true }
            ],
            inStock: true
        }
    ])

    // Fonctions de recherche et filtrage
    const searchProducts = (query: string): Product[] => {
        if (!query.trim()) return products.value

        const searchTerm = query.toLowerCase().trim()
        return products.value.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.colors.some(color => color.name.toLowerCase().includes(searchTerm))
        )
    }

    const getProductById = (id: number): Product | undefined => {
        return products.value.find(product => product.id === id)
    }

    const getProductsByCategory = (category: string): Product[] => {
        return products.value.filter(product => product.category === category)
    }

    const getAvailableProducts = (): Product[] => {
        return products.value.filter(product => product.inStock)
    }

    const getProductsByPriceRange = (minPrice: number, maxPrice: number): Product[] => {
        return products.value.filter(product =>
            product.price >= minPrice && product.price <= maxPrice
        )
    }

    const getAllCategories = (): string[] => {
        const categories = products.value.map(product => product.category)
        return [...new Set(categories)]
    }

    const getAllColors = (): string[] => {
        const colors = products.value.flatMap(product =>
            product.colors.filter(c => c.available).map(c => c.name)
        )
        return [...new Set(colors)]
    }

    const getAllSizes = (): string[] => {
        const sizes = products.value.flatMap(product =>
            product.sizes.filter(s => s.available).map(s => s.size)
        )
        return [...new Set(sizes)]
    }

    return {
        products: readonly(products),
        searchProducts,
        getProductById,
        getProductsByCategory,
        getAvailableProducts,
        getProductsByPriceRange,
        getAllCategories,
        getAllColors,
        getAllSizes
    }
})