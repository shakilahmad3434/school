import axios from "axios";

const HttpInterceptor = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    withCredentials: true
})

export default HttpInterceptor