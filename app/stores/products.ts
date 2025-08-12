import { defineStore } from 'pinia'
import type { Product } from '~/types/product'

export const useProductsStore = defineStore('products', () => {
    // ✅ Seulement les 5 produits avec les images disponibles
    const products: Product[] = [
        {
            id: 1,
            name: 'T-shirt Classique Bleu',
            description: 'T-shirt en coton 100% de haute qualité couleur bleu, parfait pour toutes les occasions.',
            price: 12000, // FCFA
            image: '/images/products/tshirt-bleu.jpg',
            category: 'Classique',
            inStock: true,
            sizes: [
                { size: 'S', available: true },
                { size: 'M', available: true },
                { size: 'L', available: true },
                { size: 'XL', available: true }
            ],
            colors: [
                { name: 'Bleu', hex: '#1e3a8a', available: true }
            ]
        },
        {
            id: 2,
            name: 'T-shirt Moderne Gris',
            description: 'Design moderne en coton gris, idéal pour un style décontracté et élégant.',
            price: 15000, // FCFA
            image: '/images/products/tshirt-gris.jpg',
            category: 'Moderne',
            inStock: true,
            sizes: [
                { size: 'S', available: true },
                { size: 'M', available: true },
                { size: 'L', available: true },
                { size: 'XL', available: true }
            ],
            colors: [
                { name: 'Gris', hex: '#6b7280', available: true }
            ]
        },
        {
            id: 3,
            name: 'T-shirt Premium Noir',
            description: 'T-shirt noir premium en coton de qualité supérieure, intemporel et versatile.',
            price: 18000, // FCFA
            image: '/images/products/tshirt-noir.jpg',
            category: 'Premium',
            inStock: true,
            sizes: [
                { size: 'S', available: true },
                { size: 'M', available: true },
                { size: 'L', available: true },
                { size: 'XL', available: false }
            ],
            colors: [
                { name: 'Noir', hex: '#000000', available: true }
            ]
        },
        {
            id: 4,
            name: 'T-shirt Dynamique Rouge',
            description: 'T-shirt rouge éclatant en coton respirant, parfait pour affirmer votre style.',
            price: 16000, // FCFA
            image: '/images/products/tshirt-rouge.jpg',
            category: 'Dynamique',
            inStock: true,
            sizes: [
                { size: 'S', available: true },
                { size: 'M', available: true },
                { size: 'L', available: true },
                { size: 'XL', available: true }
            ],
            colors: [
                { name: 'Rouge', hex: '#dc2626', available: true }
            ]
        },
        {
            id: 5,
            name: 'T-shirt Nature Vert',
            description: 'T-shirt vert nature en coton bio, inspiré des couleurs du Bénin et respectueux de l\'environnement.',
            price: 14000, // FCFA
            image: '/images/products/tshirt-vert.jpg',
            category: 'Nature',
            inStock: true,
            sizes: [
                { size: 'S', available: true },
                { size: 'M', available: true },
                { size: 'L', available: false },
                { size: 'XL', available: true }
            ],
            colors: [
                { name: 'Vert', hex: '#16a34a', available: true }
            ]
        }
    ]

    // ✅ Fonction pour récupérer un produit par ID
    const getProductById = (id: number): Product | undefined => {
        return products.find(product => product.id === id)
    }

    // Fonctions de recherche et filtrage
    const searchProducts = (query: string): Product[] => {
        if (!query.trim()) return products

        const lowercaseQuery = query.toLowerCase()
        return products.filter(product =>
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.category.toLowerCase().includes(lowercaseQuery)
        )
    }

    const getProductsByCategory = (category: string): Product[] => {
        return products.filter(product => product.category === category)
    }

    const getAllCategories = (): string[] => {
        return [...new Set(products.map(product => product.category))]
    }

    const getAllColors = (): string[] => {
        const colors = new Set<string>()
        products.forEach(product => {
            product.colors.forEach(color => {
                if (color.available) colors.add(color.name)
            })
        })
        return Array.from(colors)
    }

    const getAllSizes = (): string[] => {
        const sizes = new Set<string>()
        products.forEach(product => {
            product.sizes.forEach(size => {
                if (size.available) sizes.add(size.size)
            })
        })
        return Array.from(sizes).sort()
    }

    return {
        products,
        getProductById,
        searchProducts,
        getProductsByCategory,
        getAllCategories,
        getAllColors,
        getAllSizes
    }
})