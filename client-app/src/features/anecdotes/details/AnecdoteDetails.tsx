import React, { useContext, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps, Link } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore'

interface DetailParams {
    id: string
}

const AnecdoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const rootStore = useContext(RootStoreContext)
    const {anecdote, loadAnecdote, loadingInitial} = rootStore.anecdoteStore

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
