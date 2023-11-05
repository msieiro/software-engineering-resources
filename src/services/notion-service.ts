import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { Resource } from '../types/Resource'
import { buildQueryURL } from './query-constructor'
import { BASE_URL, REQUEST_CONFIG } from './request-constants'
import { mapResponseToResource } from './response-mapper'

export const getResources = async (
    type: string,
    search: string
): Promise<Resource[]> => {
    const finalURL = BASE_URL + buildQueryURL(type, search)
    const response: Promise<QueryDatabaseResponse> = await fetch(
        finalURL,
        REQUEST_CONFIG
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            return data
        })

    return (await response).results.map((page: any) =>
        mapResponseToResource(page)
    )
}
