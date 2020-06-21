import React, { Fragment, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import AnecdoteListItem from './AnecdoteListItem'
import { RootStoreContext } from '../../../app/stores/rootStore'



const AnecdoteList: React.FC = () => {
    const rootStore = useContext(RootStoreContext)
    const {anecdotesByDate} = rootStore.anecdoteStore

    return (
        <Fragment>
            {anecdotesByDate.map(anecdote => (
                <AnecdoteListItem key={anecdote.id} anecdote={anecdote} />
            ))}
        </Fragment>
    )
}

export default observer(AnecdoteList)
