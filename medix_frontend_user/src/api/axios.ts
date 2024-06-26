import axios from "axios";
const BASE_URL = 'https://medix-ne3c.onrender.com/api'

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL, 
    headers: {'Content-Type': 'multipart/form-data'},
    withCredentials: true
})