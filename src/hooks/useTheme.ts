import { useEffect, useState } from 'react'

export const useTheme = () => {
    const [theme, setTheme] = useState<boolean>(false)

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            theme === true ? 'night' : 'corporate'
        )
    }, [theme])

    return { theme, setTheme }
}
