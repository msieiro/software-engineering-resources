/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Client, LogLevel } from '@notionhq/client'
import { VercelRequest, VercelResponse } from '@vercel/node'

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {
            database_id: process.env.DATABASE_ID
        }
        const response = await notion.databases.query(query)

        const languagesResponsse = response.results.map((page) => {
            const properties = page.properties
            const languagesProperty = properties['languages']
            if (
                languagesProperty &&
                languagesProperty.type === 'multi_select'
            ) {
                return languagesProperty.multi_select.map(
                    (language: { name: string }) => language.name
                )
            }
            return []
        })

        const languages = Array.from(new Set(languagesResponsse.flat())).sort()
        res.status(200).send(languages)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}
