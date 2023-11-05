export const buildQueryURL = (type: string, search: string): string => {
    let finalURL = ''
    if (type) {
        finalURL += `?type=${type}`
    }
    if (search) {
        if (finalURL === '') {
            finalURL += `?search=${search}`
        } else {
            finalURL += `&search=${search}`
        }
    }
    return finalURL
}
