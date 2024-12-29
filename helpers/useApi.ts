export const useApi = async (url: string, options: { [key: string]: any }) => {
    try {
        const response = await fetch(`${url}?${Object.entries(options).map(([key, value]) => `${key}=${value}`).join("&")}`)

        return response.json()
    } catch (error) {
        console.error(error)
    }
}