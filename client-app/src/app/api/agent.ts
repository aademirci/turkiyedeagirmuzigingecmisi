import axios, { AxiosResponse } from 'axios'
import { IAnecdote } from '../models/anecdote'
import { history } from '../..'
import { toast } from 'react-toastify'
import { IUser, IUserFormValues } from '../models/user'

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response)
        toast.error('Network error - make sure API is running!')
    const { status, data, config } = error.response
    if (status === 404)
        history.push('/notfound')
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id'))
        history.push('/notfound')
    if (status === 500)
        toast.error('Server error - check the terminal for more info')
    throw error.response
})

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Anecdotes = {
    list: (): Promise<IAnecdote[]> => requests.get('/anecdotes'),
    details: (id: number) => requests.get(`/anecdotes/${id}`),
    create: (anecdote: IAnecdote) => requests.post('/anecdotes', anecdote),
    update: (anecdote: IAnecdote) => requests.put(`/anecdotes/${anecdote.id}`, anecdote),
    delete: (id: number) => requests.del(`/anecdotes/${id}`),
    fave: (id: number) => requests.post(`/anecdotes/${id}/fave`, {}),
    unfave: (id: number) => requests.del(`/anecdotes/${id}/fave`)
}

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user)
}

export default {
    Anecdotes, User
}