import React, { useContext, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps, Link } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore'
import AnecdoteListItemFavee from '../dashboard/AnecdoteListItemFavee'

interface DetailParams {
    id: string
}

const AnecdoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const rootStore = useContext(RootStoreContext)
    const {anecdote, loadAnecdote, loadingInitial, faveAnecdote, cancelFave, loading} = rootStore.anecdoteStore

    useEffect(() => {
        loadAnecdote(parseInt(match.params.id))
    }, [loadAnecdote, match.params.id])

    if(loadingInitial || !anecdote) return <LoadingComponent content='Anekdot yükleniyor...' />

    return (
        <div>
            {anecdote.title}
            {anecdote.description}
            {anecdote.isOwner ? 
                (<Button as={Link} to={`/edit/${anecdote.id}`} content='Edit' color='blue' />) : anecdote.isFaved ?
                    (<Button loading={loading} onClick={cancelFave}>Unfav</Button>) : (<Button loading={loading} onClick={faveAnecdote}>Fav</Button>)}
            
            
            <AnecdoteListItemFavee favees={anecdote.favees} />
        </div>
    )
}

export default observer(AnecdoteDetails)
