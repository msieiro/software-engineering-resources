import { useEffect, useState } from 'react'

export const useThemeSelector = () => {
    const [theme, setTheme] = useState<string>("light")

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return { theme, setTheme }
}
