import React from 'react'
import { IAnecdote } from '../../../app/models/anecdote'
import { Button } from 'semantic-ui-react'

interface IProps {
    anecdote: IAnecdote
    setEditMode: (editMode: boolean) => void
    setSelectedAnecdote: (anecdote: IAnecdote | null) => void
}

const AnecdoteDetails: React.FC<IProps> = ({anecdote, setEditMode, setSelectedAnecdote}) => {
    return (
        <div>
            {anecdote.title}
            {anecdote.description}
            <Button content='Edit' color='blue' onClick={() => setEditMode(true)} />
            <Button content='Cancel' color='grey' onClick={() => setSelectedAnecdote(null)} />
        </div>
    )
}

export default AnecdoteDetails
