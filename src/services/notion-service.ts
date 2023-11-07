/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { NotionPage } from '../types/Notion'
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
        .then((data) => data)

    return (await response).results.map((page) =>
        mapResponseToResource(page as unknown as NotionPage)
    )
}
