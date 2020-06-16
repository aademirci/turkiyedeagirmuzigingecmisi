import React, { Fragment, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import AnecdoteStore from '../../../app/stores/anecdoteStore'
import AnecdoteListItem from './AnecdoteListItem'



const AnecdoteList: React.FC = () => {
    const anecdoteStore = useContext(AnecdoteStore)
    const {anecdotesByDate} = anecdoteStore

    return (
        <Fragment>
            {anecdotesByDate.map(anecdote => (
                <AnecdoteListItem key={anecdote.id} anecdote={anecdote} />
            ))}
        </Fragment>
    )
}

export default observer(AnecdoteList)
