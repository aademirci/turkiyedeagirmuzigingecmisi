import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IAnecdote } from '../../../app/models/anecdote'

interface IProps {
    setEditMode: (editMode: boolean) => void
    anecdote: IAnecdote
    createAnecdote: (anecdote: IAnecdote) => void
    editAnecdote: (anecdote: IAnecdote) => void
    anecdoteIndex: number
}

const AnecdoteForm: React.FC<IProps> = ({setEditMode, anecdote: initialFormState, createAnecdote, editAnecdote, anecdoteIndex}) => {
    const initialiseForm = () => {
        if(initialFormState){
            return initialFormState
        } else {
            return {
                id: 0,
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [anecdote, setAnecdote] = useState<IAnecdote>(initialiseForm)

    const handleSubmit = () => {
        if (anecdote.id === 0) {
            let newAnecdote = {
                ...anecdote,
                id: anecdoteIndex + 1
            }
            createAnecdote(newAnecdote)
        } else {
            editAnecdote(anecdote)
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget
        setAnecdote({...anecdote, [name]: value})
    }

    return (
        <Segment>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Başlık' value={anecdote.title} />
                <Form.TextArea rows={2} onChange={handleInputChange} name='description' placeholder='Açıklama' value={anecdote.description} />
                <Form.Input onChange={handleInputChange} name='category' placeholder='Kategori' value={anecdote.category} />
                <Form.Input type='date' onChange={handleInputChange} name='date' placeholder='Tarih' value={anecdote.date} />
                <Form.Input onChange={handleInputChange} name='city' placeholder='Şehir' value={anecdote.city} />
                <Form.Input onChange={handleInputChange} name='venue' placeholder='Mekan' value={anecdote.venue} />
                <Button positive type='submit' content='Submit' />
                <Button type='button' content='Iptal' onClick={() => setEditMode(false)} />
            </Form>
        </Segment>
    )
}

export default AnecdoteForm
