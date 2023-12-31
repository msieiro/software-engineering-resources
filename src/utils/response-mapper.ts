import { MultiSelect, NotionPage } from '../types/Notion'
import { Resource } from '../types/Resource'

export const mapResponseToResource = (page: NotionPage): Resource => {
    const { properties } = page
    const { title, slug, tags, languages, type, url, description } = properties
    return {
        id: slug.rich_text[0].plain_text ?? '',
        title: title.title[0].plain_text ?? '',
        languages: formatMultiSelect(languages.multi_select) ?? [],
        tags: formatMultiSelect(tags.multi_select) ?? [],
        type: type.select.name ?? '',
        description: description.rich_text[0].plain_text ?? '',
        url: url.url ?? ''
    }
}

const formatMultiSelect = (arr: MultiSelect[]): string[] => {
    if (arr !== undefined && arr.length > 0) {
        const badges: string[] = arr
            .map((el: MultiSelect) => el.name)
            .toString()
            .split(',')

        if (badges.length > 0 && badges[0] === '') return []

        return badges
    }

    return []
}
