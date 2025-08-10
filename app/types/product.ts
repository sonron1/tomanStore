export interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
    category: string
    sizes: ProductSize[]
    colors: ProductColor[]
    inStock: boolean
}

export interface ProductSize {
    size: string
    available: boolean
}

export interface ProductColor {
    name: string
    hex: string
    available: boolean
}

export interface CartItem {
    product: Product
    quantity: number
    size: string
    color: string
}

export interface Cart {
    items: CartItem[]
    total: number
}