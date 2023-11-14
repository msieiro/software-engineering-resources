import { useEffect, useState } from 'react'
import { getResources } from '../services/notion-service'
import { Resource } from '../types/Resource'

export const useResources = ({
    type,
    search,
    tags,
    languages
}: {
    type: string
    search: string
    tags: string[]
    languages: string[]
}) => {
    const [resources, setResources] = useState<Resource[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true)
            try {
                const resources = await getResources(
                    type,
                    search,
                    tags,
                    languages
                )
                setResources(resources)
            } catch (_error) {
                setError('Could not obtain data from NotionAPI')
            } finally {
                setLoading(false)
            }
        }

        void fetchResources()
    }, [type, search, tags, languages])

    return { resources, loading, error }
}
