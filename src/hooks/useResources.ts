import { useEffect, useState } from 'react'
import { getResources } from '../services/notion-service'
import { Resource } from '../types/Resource'

export const useResources = ({
    type,
    search
}: {
    type: string
    search: string
}) => {
    const [resources, setResources] = useState<Resource[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true)
            try {
                const resources = await getResources(type, search)
                setResources(resources)
            } catch (error: any) {
                setError('Could not obtain data from NotionAPI')
            } finally {
                setLoading(false)
            }
        }

        fetchResources()
    }, [type, search])

    return { resources, loading, error }
}
