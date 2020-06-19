import React, { useContext, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import AnecdoteStore from '../../../app/stores/anecdoteStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps, Link } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'

interface DetailParams {
    id: string
}

const AnecdoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const anecdoteStore = useContext(AnecdoteStore)
    const {anecdote, loadAnecdote, loadingInitial} = anecdoteStore

    useEffect(() => {
        loadAnecdote(parseInt(match.params.id))
    }, [loadAnecdote, match.params.id])

    if(loadingInitial || !anecdote) return <LoadingComponent content='Anekdot yükleniyor...' />

    return (
        <div>
            {anecdote.title}
            {anecdote.description}
            <Button as={Link} to={`/edit/${anecdote.id}`} content='Edit' color='blue' />
        </div>
    )
}

export default observer(AnecdoteDetails)
