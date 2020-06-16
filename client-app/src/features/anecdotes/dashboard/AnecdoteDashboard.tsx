import React, { Fragment } from 'react'
import { IAnecdote } from '../../../app/models/anecdote'
import AnecdoteList from './AnecdoteList'
import ScrollContainer from 'react-indiana-drag-scroll'
import AnecdoteNav from '../../nav/AnecdoteNav'
import AnecdoteDetails from '../details/AnecdoteDetails'
import AnecdoteForm from '../form/AnecdoteForm'

interface IProps {
    anecdotes: IAnecdote[]
    selectAnecdote: (id: number) => void
    selectedAnecdote: IAnecdote | null
    editMode: boolean
    setEditMode: (editMode: boolean) => void
    setSelectedAnecdote: (anecdote: IAnecdote | null) => void
    createAnecdote: (anecdote: IAnecdote) => void
    editAnecdote: (anecdote: IAnecdote) => void
    anecdoteIndex: number
    deleteAnecdote: (id: number) => void
}

const AnecdoteDashboard: React.FC<IProps> = ({ anecdotes, selectAnecdote, selectedAnecdote, editMode, setEditMode, setSelectedAnecdote, createAnecdote, editAnecdote, anecdoteIndex, deleteAnecdote }) => {
    

    return (
        <Fragment>
            <AnecdoteNav />
            <ScrollContainer className='main-section scroll-container'>
                <AnecdoteList anecdotes={anecdotes} selectAnecdote={selectAnecdote} deleteAnecdote={deleteAnecdote} />
            </ScrollContainer>
            {selectedAnecdote && !editMode && <AnecdoteDetails anecdote={selectedAnecdote} setEditMode={setEditMode} setSelectedAnecdote={setSelectedAnecdote} />}
            {editMode && <AnecdoteForm key={(selectedAnecdote && selectedAnecdote.id) || 0} setEditMode={setEditMode} anecdote={selectedAnecdote!} createAnecdote={createAnecdote} editAnecdote={editAnecdote} anecdoteIndex={anecdoteIndex} />}
        </Fragment>

    )
}

export default AnecdoteDashboard
