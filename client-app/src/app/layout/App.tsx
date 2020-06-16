import React, { useEffect, Fragment, useContext } from 'react'
import NavBar from '../../features/nav/NavBar'
import AnecdoteDashboard from '../../features/anecdotes/dashboard/AnecdoteDashboard'
import LoadingComponent from './LoadingComponent'
import AnecdoteStore from '../stores/anecdoteStore'
import { observer } from 'mobx-react-lite'

const App = () => {
    const anecdoteStore = useContext(AnecdoteStore)

    useEffect(() => {
        anecdoteStore.loadAnecdotes()
    }, [anecdoteStore])

    if(anecdoteStore.loadingInitial) return <LoadingComponent content='Anekdotlar yükleniyor...' />

    return (
        <Fragment>
            <NavBar />
            <AnecdoteDashboard />
        </Fragment>
    );
}

export default observer(App)
