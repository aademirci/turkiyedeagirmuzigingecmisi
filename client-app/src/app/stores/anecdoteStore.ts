import { observable, action, computed, runInAction } from 'mobx'
import { SyntheticEvent } from 'react'
import { IAnecdote } from '../models/anecdote'
import agent from '../api/agent'
import 'mobx-react-lite/batchingForReactDom'
import { history } from '../..'
import { toast } from 'react-toastify'
import { RootStore } from './rootStore'
import { createFavee, setAnecdoteProps } from '../common/util/util'

export default class AnecdoteStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable anecdoteRegistry = new Map()
    @observable anecdote: IAnecdote | null = null
    @observable loadingInitial = false
    @observable submitting = false
    @observable target = ''
    @observable loading = false

    @computed get anecdotesByDate() {
        return Array.from(this.anecdoteRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    @action getAnecdoteIndex = async () => {
        const anecdotes = await agent.Anecdotes.list()
        runInAction('loading anecdotes', () => {
            anecdotes.forEach((anecdote) => {
                anecdote.date = new Date(anecdote.date);
                this.anecdoteRegistry.set(anecdote.id, anecdote)
            })
        })

        return Array.from(this.anecdoteRegistry.keys())[this.anecdoteRegistry.size - 1]
    }

    @action loadAnecdotes = async () => {
        this.loadingInitial = true
        try {
            const anecdotes = await agent.Anecdotes.list()
            runInAction('loading anecdotes', () => {
                anecdotes.forEach((anecdote) => {
                    setAnecdoteProps(anecdote, this.rootStore.userStore.user!)
                    this.anecdoteRegistry.set(anecdote.id, anecdote)
                })
                this.loadingInitial = false
            })
        } catch (error) {
            runInAction('load anecdotes error ', () => {
                this.loadingInitial = false
            })
            console.log(error)
        }
    }

    @action loadAnecdote = async (id: number) => {
        let anecdote = this.getAnecdote(id)
        if (anecdote) {
            this.anecdote = anecdote
            return anecdote
        } else {
            this.loadingInitial = true
            try {
                anecdote = await agent.Anecdotes.details(id)
                runInAction('getting an anecdote', () => {
                    setAnecdoteProps(anecdote, this.rootStore.userStore.user!)
                    this.anecdote = anecdote
                    this.anecdoteRegistry.set(anecdote.id, anecdote);
                    this.loadingInitial = false
                })
                return anecdote
            } catch (error) {
                runInAction('get anecdote error', () => {
                    this.loadingInitial = false
                })
                console.log(error)
            }
        }
    }

    @action clearAnecdote = () => {
        this.anecdote = null
    }

    getAnecdote = (id: number) => {
        return this.anecdoteRegistry.get(id)
    }

    @action createAnecdote = async (anecdote: IAnecdote) => {
        this.submitting = true
        try {
            await agent.Anecdotes.create(anecdote)
            runInAction('creating an anecdote', () => {
                this.anecdoteRegistry.set(anecdote.id, anecdote)
                this.submitting = false
            })
            history.push(`/anecdote/${anecdote.id}`)
        } catch (error) {
            runInAction('create anecdote error', () => {
                this.submitting = false
            })
            toast.error('Problem submitting data')
            console.log(error)
        }
    }

    @action editAnecdote = async (anecdote: IAnecdote) => {
        this.submitting = true
        try {
            await agent.Anecdotes.update(anecdote)
            runInAction('editing an anecdote', () => {
                this.anecdoteRegistry.set(anecdote.id, anecdote)
                this.anecdote = anecdote
                this.submitting = false
            })
            history.push(`/anecdote/${anecdote.id}`)
        } catch (error) {
            runInAction('edit anecdote error', () => {
                this.submitting = false
            })
            toast.error('Problem submitting data')
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

    @action faveAnecdote = async () => {
        const favee = createFavee(this.rootStore.userStore.user!)
        this.loading = true
        try {
            await agent.Anecdotes.fave(this.anecdote!.id)
            runInAction(() => {
                if (this.anecdote) {
                    this.anecdote.favees.push(favee)
                    this.anecdote.isFaved = true
                    this.anecdoteRegistry.set(this.anecdote.id, this.anecdote)
                    this.loading = false
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false
            })
            toast.error('Problem signing up to activity')
        }
    }

    @action cancelFave = async () => {
        this.loading = true
        try {
            await agent.Anecdotes.unfave(this.anecdote!.id)
            runInAction(() => {
                if (this.anecdote) {
                    this.anecdote.favees = this.anecdote.favees.filter(
                        a => a.username !== this.rootStore.userStore.user!.username
                    )
                    this.anecdote.isFaved = false
                    this.anecdoteRegistry.set(this.anecdote.id, this.anecdote)
                    this.loading = false
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false
            })
            toast.error('Problem cancelling attendance')
        }
    }
}