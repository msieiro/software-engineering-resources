import { Client, LogLevel } from '@notionhq/client'
import { VercelRequest, VercelResponse } from '@vercel/node'

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
    logLevel: LogLevel.DEBUG,
    notionVersion: '2022-06-28'
})

export default async (_req: VercelRequest, res: VercelResponse) => {
    try {
        const query: any = { database_id: process.env.DATABASE_ID }
        const result = await notion.databases.query(query)
        res.status(200).send(result)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}
