export interface IAnecdote {
    id: number
    title: string
    description: string
    category: string
    date: Date
    city: string
    venue: string
    isFaved: boolean
    isOwner: boolean
    favees: IFavee[]
}

export class AnecdoteFormValues implements Partial<IAnecdote> {
    id?: number = undefined
    title: string = ''
    category: string = ''
    description: string = ''
    date?: Date = undefined
    city: string = ''
    venue: string = ''

    constructor(init?: IAnecdote) {
        Object.assign(this, init)
    }
}

export interface IFavee {
    username: string
    displayName: string
    image: string
    isOwner: boolean
}