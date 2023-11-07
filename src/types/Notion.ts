export interface MultiSelect {
    name: string
}

export interface Select {
    name: string
}

export interface RichText {
    plain_text: string
}

export interface NotionPage {
    properties: NotionPageProperties
}

export interface NotionPageProperties {
    title: {
        title: RichText[]
    }
    slug: {
        rich_text: RichText[]
    }
    tags: {
        multi_select: MultiSelect[]
    }
    languages: {
        multi_select: MultiSelect[]
    }
    type: {
        select: Select
    }
    url: {
        url: string
    }
    description: {
        rich_text: RichText[]
    }
}
