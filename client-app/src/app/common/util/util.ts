import { IAnecdote, IFavee } from "../../models/anecdote"
import { IUser } from "../../models/user"

export const combineDateAndTime = (date: Date) => {

    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return new Date(year, month, day)
}

export const setAnecdoteProps = (anecdote: IAnecdote, user: IUser) => {
    anecdote.date = new Date(anecdote.date);
    anecdote.isFaved = anecdote.favees.some(a => a.username === user.username)
    anecdote.isOwner = anecdote.favees.some(a => a.username === user.username && a.isOwner)

    return anecdote
}

export const createFavee = (user: IUser): IFavee => {
    return {
        displayName: user.displayName,
        isOwner: false,
        username: user.username,
        image: user.image!
    }
}