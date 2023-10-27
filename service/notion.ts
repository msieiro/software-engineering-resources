import { Client } from '@notionhq/client'
import { DATABASE_ID, NOTION_TOKEN } from '../config'

const notion = new Client({
    auth: NOTION_TOKEN
})

export const getResources = async () => {
    const query: any = { database_id: DATABASE_ID }

    const { results } = await notion.databases.query(query)

    return results.map((page: any) => {
        const { properties } = page
        const {
            title,
            slug,
            tags,
            languages,
            url,
            description,
            lastUpdateTime
        } = properties

        return {
            id: slug.rich_text[0].plain_text,
            title: title.title[0].plain_text,
            languages: languages.multi_select
                .map((el: any) => el.name)
                .toString()
                .split(','),
            tags: tags.multi_select
                .map((el: any) => el.name)
                .toString()
                .split(','),
            description: description.rich_text[0].plain_text,
            url: url.url,
            lastUpdateTime: new Date(lastUpdateTime.last_edited_time)
        }
    })
}
