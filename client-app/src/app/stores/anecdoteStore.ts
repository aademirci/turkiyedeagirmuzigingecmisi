import { observable, action, computed, configure, runInAction } from 'mobx'
import { createContext, SyntheticEvent } from 'react'
import { IAnecdote } from '../models/anecdote'
import agent from '../api/agent'

configure({ enforceActions: 'always' })

export class AnecdoteStore {
    @observable anecdoteRegistry = new Map()
    @observable anecdotes: IAnecdote[] = []
    @observable selectedAnecdote: IAnecdote | undefined
    @observable loadingInitial = false
    @observable editMode = false
    @observable submitting = false
    @observable target = ''
    @observable anecdoteIndex = 0

    @computed get anecdotesByDate() {
        return Array.from(this.anecdoteRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    @action loadAnecdotes = async () => {
        this.loadingInitial = true
        try {
            const anecdotes = await agent.Anecdotes.list()
            runInAction('loading anecdotes', () => {
                anecdotes.forEach((anecdote) => {
                    this.anecdoteRegistry.set(anecdote.id, anecdote)
                })
                this.anecdoteIndex = anecdotes[anecdotes.length - 1].id
                this.loadingInitial = false
            })
        } catch (error) {
            runInAction('load anecdotes error ', () => {
                this.loadingInitial = false
            })
            console.log(error)
        }
    }

    @action createAnecdote = async (anecdote: IAnecdote) => {
        this.submitting = true
        try {
            await agent.Anecdotes.create(anecdote)
            runInAction('creating an anecdote', () => {
                this.anecdoteRegistry.set(anecdote.id, anecdote)
                this.editMode = false
                this.submitting = false
            })
        } catch (error) {
            runInAction('create anecdote error', () => {
                this.submitting = false
            })
            console.log(error)
        }
    }

    @action editAnecdote = async (anecdote: IAnecdote) => {
        this.submitting = true
        try {
            await agent.Anecdotes.update(anecdote)
            runInAction('editing an anecdote', () => {
                this.anecdoteRegistry.set(anecdote.id, anecdote)
                this.selectedAnecdote = anecdote
                this.editMode = false
                this.submitting = false
            })
        } catch (error) {
            runInAction('edit anecdote error', () => {
                this.submitting = false
            })
            console.log(error)
        }
    }

    @action deleteAnecdote = async (event: SyntheticEvent<HTMLButtonElement>, id: number) => {
        this.submitting = true
        this.target = event.currentTarget.name
        try {
            await agent.Anecdotes.delete(id)
            runInAction('deleting an anecdote', () => {
                this.anecdoteRegistry.delete(id)
                this.submitting = false
                this.target = ''
            })
        } catch (error) {
            runInAction('delete anecdote error', () => {
                this.submitting = false
                this.target = ''
            })
            console.log(error)
        }
    }

    @action openCreateForm = () => {
        this.editMode = true
        this.selectedAnecdote = undefined
    }

    @action openEditForm = (id: number) => {
        this.selectedAnecdote = this.anecdoteRegistry.get(id)
        this.editMode = true
    }

    @action cancelSelectedAnecdote = () => {
        this.selectedAnecdote = undefined
    }

    @action cancelFormOpen = () => {
        this.editMode = false
    }

    @action selectAnecdote = (id: number) => {
        this.selectedAnecdote = this.anecdoteRegistry.get(id)
        this.editMode = false
    }
}

export default createContext(new AnecdoteStore())