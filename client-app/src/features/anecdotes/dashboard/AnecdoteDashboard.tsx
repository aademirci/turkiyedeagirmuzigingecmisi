import React, { Fragment, useContext, useEffect } from 'react'
import AnecdoteList from './AnecdoteList'
import ScrollContainer from 'react-indiana-drag-scroll'
import AnecdoteNav from '../../nav/AnecdoteNav'
import { observer } from 'mobx-react-lite'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore'

const AnecdoteDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext)
    const {loadAnecdotes, loadingInitial} = rootStore.anecdoteStore

    useEffect(() => {
        loadAnecdotes()
    }, [loadAnecdotes])

    if (loadingInitial) return <LoadingComponent content='Anekdotlar yükleniyor...' />

    return (
        <Fragment>
            <AnecdoteNav />
            <ScrollContainer className='main-section scroll-container'>
                <AnecdoteList />
            </ScrollContainer>
        </Fragment>

    )
}

export default observer(AnecdoteDashboard)
