import { useEffect, useState } from 'react'
import { getLanguages } from '../services/notion-service'

export const useLanguages = () => {
    const [languages, setLanguages] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>()
    const [error, setError] = useState<string>()

    useEffect(() => {
        const fetchLanguages = async () => {
            setLoading(true)
            try {
                const languages = await getLanguages()
                setLanguages(languages)
            } catch (_error) {
                setError('Could not obtain data from NotionAPI')
            } finally {
                setLoading(false)
            }
        }

        void fetchLanguages()
    }, [])

    return { languages, loading, error }
}
