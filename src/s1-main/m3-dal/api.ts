import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: 'https://',
    withCredentials: true,
    headers: {
        'API-KEY': ''
    }
})

export const fakeAPI = {
    get() {
        return instance.get('fake');
    }
}