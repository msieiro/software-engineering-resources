/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { BASE_URL, REQUEST_CONFIG } from '../constants/request-constants'
import { NotionPage } from '../types/Notion'
import { Resource } from '../types/Resource'
import { buildQueryURL } from '../utils/query-constructor'
import { mapResponseToResource } from '../utils/response-mapper'

export const getResources = async (
    type: string,
    search: string,
    tags: string[],
    languages: string[]
): Promise<Resource[]> => {
    const finalURL = BASE_URL + buildQueryURL(type, search, tags, languages)
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

export const getTags = async (): Promise<string[]> => {
    const finalURL = 'api/tags'
    const response: Promise<string[]> = await fetch(finalURL, REQUEST_CONFIG)
        .then((response) => response.json())
        .then((data) => data)

    return response
}

export const getLanguages = async (): Promise<string[]> => {
    const finalURL = 'api/languages'
    const response: Promise<string[]> = await fetch(finalURL, REQUEST_CONFIG)
        .then((response) => response.json())
        .then((data) => data)

    return response
}
