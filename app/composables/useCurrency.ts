export const useCurrency = () => {
    // Configuration pour le Bénin (Franc CFA)
    const currency = {
        code: 'XOF',
        symbol: 'FCFA',
        locale: 'fr-BJ'
    }

    // Formater un prix en FCFA
    const formatPrice = (amount: number): string => {
        return new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    // Formater avec devise
    const formatPriceWithCurrency = (amount: number): string => {
        return `${formatPrice(amount)} FCFA`
    }

    // Conversion Euro vers FCFA (taux approximatif)
    const euroToFcfa = (euroAmount: number): number => {
        const exchangeRate = 656 // 1 EUR ≈ 656 FCFA
        return Math.round(euroAmount * exchangeRate)
    }

    return {
        currency,
        formatPrice,
        formatPriceWithCurrency,
        euroToFcfa
    }
}