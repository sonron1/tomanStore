export const useCurrency = () => {
    /**
     * Formate un nombre en prix avec la devise FCFA
     * @param amount - Le montant à formater
     * @param showDecimals - Afficher les décimales (par défaut: false)
     */
    const formatPrice = (amount: number, showDecimals: boolean = false): string => {
        if (isNaN(amount)) return '0'
        
        const formatter = new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: showDecimals ? 2 : 0,
            maximumFractionDigits: showDecimals ? 2 : 0
        })
        
        return formatter.format(amount)
    }

    /**
     * Formate un prix avec la devise
     * @param amount - Le montant à formater
     * @param currency - La devise (par défaut: FCFA)
     * @param showDecimals - Afficher les décimales
     */
    const formatCurrency = (
        amount: number, 
        currency: string = 'FCFA', 
        showDecimals: boolean = false
    ): string => {
        return `${formatPrice(amount, showDecimals)} ${currency}`
    }

    /**
     * Convertit une chaîne en nombre pour les calculs
     * @param value - La valeur à convertir
     */
    const parsePrice = (value: string | number): number => {
        if (typeof value === 'number') return value
        const parsed = parseFloat(value.replace(/[^\d.-]/g, ''))
        return isNaN(parsed) ? 0 : parsed
    }

    /**
     * Calcule le total d'un tableau de prix
     * @param prices - Tableau des prix
     */
    const calculateTotal = (prices: number[]): number => {
        return prices.reduce((sum, price) => sum + (parsePrice(price) || 0), 0)
    }

    /**
     * Calcule une remise
     * @param originalPrice - Prix original
     * @param discountPercent - Pourcentage de remise
     */
    const calculateDiscount = (originalPrice: number, discountPercent: number): number => {
        return originalPrice * (discountPercent / 100)
    }

    /**
     * Calcule le prix après remise
     * @param originalPrice - Prix original
     * @param discountPercent - Pourcentage de remise
     */
    const calculateDiscountedPrice = (originalPrice: number, discountPercent: number): number => {
        return originalPrice - calculateDiscount(originalPrice, discountPercent)
    }

    return {
        formatPrice,
        formatCurrency,
        parsePrice,
        calculateTotal,
        calculateDiscount,
        calculateDiscountedPrice
    }
}