import { Client, LogLevel } from '@notionhq/client'
import { VercelRequest, VercelRequestQuery, VercelResponse } from '@vercel/node'

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
    logLevel: LogLevel.DEBUG,
    notionVersion: '2022-06-28'
})

export default async (req: VercelRequest, res: VercelResponse) => {
    if (req.method !== 'GET') {
        res.status(400).send('The request is not valid')
    }
    try {
        const typeFilter = getTypeFilter(req.query)
        const titleAndDescription = getTitleAndDescriptionFilter(req.query)
        const tags = getTagsFilter(req.query)
        const languages = getLanguagesFilter(req.query)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {
            database_id: process.env.DATABASE_ID,
            filter: {
                and: [
                    typeFilter,
                    ...tags,
                    ...languages,
                    { or: [...titleAndDescription] }
                ]
            },
            sorts: [
                {
                    property: 'lastUpdateTime',
                    direction: 'ascending'
                }
            ]
        }
        console.log(JSON.stringify(query))
        const result = await notion.databases.query(query)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

function getLanguagesFilter(query: VercelRequestQuery) {
    if (query.languages !== undefined && query.languages !== '') {
        const languagesArr = query.languages.toString().split(',')
        const mappedLanguages = languagesArr.map((lang: string) => ({
            property: 'languages',
            multi_select: {
                contains: lang
            }
        }))
        console.log(mappedLanguages)
        if (mappedLanguages.length > 0) return mappedLanguages
    }
    return [
        {
            property: 'languages',
            multi_select: {
                is_not_empty: true
            }
        }
    ]
}

function getTagsFilter(query: VercelRequestQuery) {
    if (query.tags !== undefined && query.tags !== '') {
        const tagsArr = query.tags.toString().split(',')
        const mappedTags = tagsArr.map((tag: string) => ({
            property: 'tags',
            multi_select: {
                contains: tag
            }
        }))
        console.log(mappedTags)
        if (mappedTags.length > 0) return mappedTags
    }
    return [
        {
            property: 'tags',
            multi_select: {
                is_not_empty: true
            }
        }
    ]
}

function getTypeFilter(query: VercelRequestQuery) {
    return query.type !== undefined && query.type !== ''
        ? {
              property: 'type',
              select: {
                  equals: query.type
              }
          }
        : {
              property: 'type',
              select: {
                  is_not_empty: true
              }
          }
}

function getTitleAndDescriptionFilter(query: VercelRequestQuery) {
    return query.search !== undefined && query.search !== ''
        ? [
              {
                  property: 'description',
                  rich_text: {
                      contains: query.search
                  }
              },
              {
                  property: 'title',
                  rich_text: {
                      contains: query.search
                  }
              }
          ]
        : [
              {
                  property: 'description',
                  rich_text: {
                      is_not_empty: true
                  }
              },
              {
                  property: 'title',
                  rich_text: {
                      is_not_empty: true
                  }
              }
          ]
}
