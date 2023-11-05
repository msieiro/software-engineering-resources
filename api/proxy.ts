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
        const query: any = {
            database_id: process.env.DATABASE_ID,
            filter: {
                and: [typeFilter, { or: [...titleAndDescription] }]
            },
            sorts: [
                {
                    property: 'lastUpdateTime',
                    direction: 'ascending'
                }
            ]
        }
        const result = await notion.databases.query(query)
        console.log(result)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}

function getTypeFilter(query: VercelRequestQuery) {
    return query.type
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
    return query.search
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
