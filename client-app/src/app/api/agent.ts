import axios, { AxiosResponse } from 'axios'
import { IAnecdote } from '../models/anecdote'

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Anecdotes = {
    list: ():Promise<IAnecdote[]> => requests.get('/anecdotes'),
    details: (id: number) => requests.get(`/anecdotes/${id}`),
    create: (anecdote: IAnecdote) => requests.post('/anecdotes', anecdote),
    update: (anecdote: IAnecdote) => requests.put(`/anecdotes/${anecdote.id}`, anecdote),
    delete: (id: number) => requests.del(`/anecdotes/${id}`)
}

export default {
    Anecdotes
}