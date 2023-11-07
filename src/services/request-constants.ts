export const BASE_URL: string = '/api/proxy'
export const REQUEST_CONFIG: RequestInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
}
