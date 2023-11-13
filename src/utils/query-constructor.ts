export const buildQueryURL = (
    type: string,
    search: string,
    tags: string[],
    languages: string[]
): string => {
    let finalURL = ''
    if (type !== undefined && type !== '') {
        finalURL += `?type=${type}`
    }
    if (search !== undefined && type !== '') {
        if (finalURL === '') {
            finalURL += `?search=${search}`
        } else {
            finalURL += `&search=${search}`
        }
    }
    if (tags !== undefined && tags.length > 0) {
        if (finalURL === '') {
            finalURL += `?tags=${tags.toString()}`
        } else {
            finalURL += `&tags=${tags.toString()}`
        }
    }
    if (languages !== undefined && languages.length > 0) {
        if (finalURL === '') {
            finalURL += `?languages=${languages.toString()}`
        } else {
            finalURL += `&languages=${languages.toString()}`
        }
    }
    return finalURL
}
