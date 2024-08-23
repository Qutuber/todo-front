import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http:localhost:4173/api', //기본 url
    headers: {
        'Content-Type': 'application/json'
    }
})

export default apiClient;