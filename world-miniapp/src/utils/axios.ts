import axios from 'axios'

const axiosInstance = axios.create({
    url: process.env.NEXT_PUBLIC_BACKEND_URL
})

export default axiosInstance;