import { useEffect, useState } from 'react'
import { getTags } from '../services/notion-service'

export const useTags = () => {
    const [tags, setTags] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>()
    const [error, setError] = useState<string>()

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true)
            try {
                const tags = await getTags()
                setTags(tags)
            } catch (_error) {
                setError('Could not obtain data from NotionAPI')
            } finally {
                setLoading(false)
            }
        }

        void fetchTags()
    }, [])

    return { tags, loading, error }
}
