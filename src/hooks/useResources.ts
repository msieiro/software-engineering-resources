import { useEffect, useState } from 'react'
import { getResources } from '../services/notion-service'
import { Resource } from '../types/Resource'

export const useResources = () => {
    const [resources, setResources] = useState<Resource[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true)
            const resources = await getResources()
            setResources(resources)
            setLoading(false)
        }

        fetchResources()
    }, [])

    return { resources, loading }
}
