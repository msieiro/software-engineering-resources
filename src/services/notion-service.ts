import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { Resource } from '../types/Resource'

export const getResources = async (): Promise<Resource[]> => {
    try {
        const response: Promise<QueryDatabaseResponse> = await fetch(
            '/api/proxy',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((data) => {
                console.log(data)
                return data
            })

        return (await response).results.map((page: any) => mapToResource(page))
    } catch (error) {
        console.error('!Error:', error)
        return []
    }
}

const mapToResource = (page: any): Resource => {
    const { properties } = page
    const {
        title,
        slug,
        tags,
        languages,
        type,
        url,
        description,
        lastUpdateTime
    } = properties
    return {
        id: slug.rich_text[0].plain_text,
        title: title.title[0].plain_text,
        languages: formatMultiSelect(languages.multi_select),
        tags: formatMultiSelect(tags.multi_select),
        type: type.select.name,
        description: description.rich_text[0].plain_text,
        url: url.url,
        lastUpdateTime: new Date(lastUpdateTime.last_edited_time)
    }
}

const formatMultiSelect = (arr: any[]) => {
    if (arr && arr.length > 0) {
        const badges = arr
            .map((el: any) => el.name)
            .toString()
            .split(',')

        if (badges && badges[0] === '') return []

        return badges
    }

    return []
}
