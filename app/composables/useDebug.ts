
export const useDebug = () => {
    const config = useRuntimeConfig()

    const isDev = computed(() => process.env.NODE_ENV === 'development' || config.public.isKkiapayDev)

    const debugLog = (message: string, data?: any) => {
        if (isDev.value) {
            if (data) {
                console.log(`🔧 DEBUG: ${message}`, data)
            } else {
                console.log(`🔧 DEBUG: ${message}`)
            }
        }
    }

    const debugError = (message: string, error?: any) => {
        if (isDev.value) {
            if (error) {
                console.error(`❌ DEBUG ERROR: ${message}`, error)
            } else {
                console.error(`❌ DEBUG ERROR: ${message}`)
            }
        }
    }

    const debugWarn = (message: string, data?: any) => {
        if (isDev.value) {
            if (data) {
                console.warn(`⚠️ DEBUG WARN: ${message}`, data)
            } else {
                console.warn(`⚠️ DEBUG WARN: ${message}`)
            }
        }
    }

    return {
        isDev: readonly(isDev),
        debugLog,
        debugError,
        debugWarn
    }
}