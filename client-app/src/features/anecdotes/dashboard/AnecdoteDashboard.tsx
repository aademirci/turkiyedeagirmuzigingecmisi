import React, { Fragment, useContext } from 'react'
import AnecdoteList from './AnecdoteList'
import ScrollContainer from 'react-indiana-drag-scroll'
import AnecdoteNav from '../../nav/AnecdoteNav'
import AnecdoteDetails from '../details/AnecdoteDetails'
import AnecdoteForm from '../form/AnecdoteForm'
import { observer } from 'mobx-react-lite'
import AnecdoteStore from '../../../app/stores/anecdoteStore'

const AnecdoteDashboard: React.FC = () => {
    const anecdoteStore = useContext(AnecdoteStore)
    const {editMode, selectedAnecdote} = anecdoteStore

    return (
        <Fragment>
            <AnecdoteNav />
            <ScrollContainer className='main-section scroll-container'>
                <AnecdoteList />
            </ScrollContainer>
            {selectedAnecdote && !editMode && <AnecdoteDetails />}
            {editMode && <AnecdoteForm key={(selectedAnecdote && selectedAnecdote.id) || 0} anecdote={selectedAnecdote!} />}
        </Fragment>

    )
}

export default observer(AnecdoteDashboard)
