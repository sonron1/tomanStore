export const useCurrency = () => {
    // ✅ Formatage des prix en FCFA avec séparateurs de milliers
    const formatPrice = (price: number | string): string => {
        const numericPrice = typeof price === 'string' ? parseFloat(price) : price

        // Vérifier si c'est un nombre valide
        if (isNaN(numericPrice)) {
            console.warn('⚠️ Prix invalide passé à formatPrice:', price)
            return '0'
        }

        // Formater avec séparateurs de milliers français
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Math.round(numericPrice))
    }

    // ✅ Formatage pour les calculs internes
    const parsePrice = (priceString: string): number => {
        const cleaned = priceString.replace(/[^\d.-]/g, '')
        const parsed = parseFloat(cleaned)
        return isNaN(parsed) ? 0 : parsed
    }

    return {
        formatPrice,
        parsePrice
    }
}