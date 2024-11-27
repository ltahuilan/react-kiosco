import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept' : 'aplication/json',
        'X-Requested-With' : 'XMLHttpRequest'
    },
    withCredentials: true
});

export default axiosClient;