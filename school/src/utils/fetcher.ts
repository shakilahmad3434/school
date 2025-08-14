import HttpInterceptor from "./HttpInterceptor"

const fetcher = async (url: string) => {
    try {
        const {data} = await HttpInterceptor.get(url)
        return data
    } catch (err: any) {
        throw new Error(err)
    }
}

export default fetcher