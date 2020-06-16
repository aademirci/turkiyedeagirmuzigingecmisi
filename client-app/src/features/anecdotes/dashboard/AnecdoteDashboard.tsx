import React, { Fragment, useContext, useEffect } from 'react'
import AnecdoteList from './AnecdoteList'
import ScrollContainer from 'react-indiana-drag-scroll'
import AnecdoteNav from '../../nav/AnecdoteNav'
import { observer } from 'mobx-react-lite'
import AnecdoteStore from '../../../app/stores/anecdoteStore'
import LoadingComponent from '../../../app/layout/LoadingComponent'

const AnecdoteDashboard: React.FC = () => {
    const anecdoteStore = useContext(AnecdoteStore)

    useEffect(() => {
        anecdoteStore.loadAnecdotes()
    }, [anecdoteStore])

    if (anecdoteStore.loadingInitial) return <LoadingComponent content='Anekdotlar yükleniyor...' />

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
