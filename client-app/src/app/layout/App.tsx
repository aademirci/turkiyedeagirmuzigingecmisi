import React, { useState, useEffect, Fragment } from 'react'
import { IAnecdote } from '../models/anecdote'
import axios from 'axios'
import NavBar from '../../features/nav/NavBar'
import AnecdoteDashboard from '../../features/anecdotes/dashboard/AnecdoteDashboard'

const App = () => {
    const [anecdotes, setAnecdotes] = useState<IAnecdote[]>([])
    const [selectedAnecdote, setSelectedAnecdote] = useState<IAnecdote | null>(null)
    const [editMode, setEditMode] = useState(false)
    const [anecdoteIndex, setAnecdoteIndex] = useState(0)

    const handleSelectAnecdote = (id: number) => {
        setSelectedAnecdote(anecdotes.filter(a => a.id === id)[0])
        setEditMode(false)
    }

    const handleOpenCreateForm = () => {
        setSelectedAnecdote(null)
        setEditMode(true)
    }

    const handleCreateAnecdote = (anecdote: IAnecdote) => {
        setAnecdotes([...anecdotes, anecdote])
        setSelectedAnecdote(anecdote)
        setEditMode(false)
    }

    const handleEditAnecdote = (anecdote: IAnecdote) => {
        setAnecdotes([...anecdotes.filter(a => a.id !== anecdote.id), anecdote])
        setSelectedAnecdote(anecdote)
        setEditMode(false)
    }

    const handleDelete = (id: number) => {
        setAnecdotes([...anecdotes.filter(a => a.id !== id)])
    }

    useEffect(() => {
        axios
        .get<IAnecdote[]>('http://localhost:5000/api/anecdotes')
        .then(response => {
            setAnecdotes(response.data)
            setAnecdoteIndex(response.data[response.data.length - 1].id)
        })
    }, [])

    return (
        <Fragment>
            <NavBar openCreateForm={handleOpenCreateForm} />
            <AnecdoteDashboard anecdotes={anecdotes} selectAnecdote={handleSelectAnecdote} selectedAnecdote={selectedAnecdote} editMode={editMode} setEditMode={setEditMode} setSelectedAnecdote={setSelectedAnecdote} createAnecdote={handleCreateAnecdote} editAnecdote={handleEditAnecdote} anecdoteIndex={anecdoteIndex} deleteAnecdote={handleDelete} />
        </Fragment>
    );
}

export default App
