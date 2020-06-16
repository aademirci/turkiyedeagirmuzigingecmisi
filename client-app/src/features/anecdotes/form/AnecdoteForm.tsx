import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IAnecdote } from '../../../app/models/anecdote'
import AnecdoteStore from '../../../app/stores/anecdoteStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'

interface DetailParams {
    id: string
}

const AnecdoteForm: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const anecdoteStore = useContext(AnecdoteStore)
    const {createAnecdote, editAnecdote, submitting, anecdote: initialFormState, loadAnecdote, clearAnecdote, anecdoteIndex} = anecdoteStore

    const [anecdote, setAnecdote] = useState<IAnecdote>({
        id: 0,
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    })

    useEffect(() => {
        if (match.params.id && anecdote.id === 0) {
            loadAnecdote(parseInt(match.params.id)).then(() => initialFormState && setAnecdote(initialFormState))
        }
        return () => {
            clearAnecdote()
        }
    }, [loadAnecdote, clearAnecdote, match.params.id, initialFormState, anecdote.id])

    const handleSubmit = () => {
        if (anecdote.id === 0) {
            let newAnecdote = {
                ...anecdote,
                id: anecdoteIndex + 1
            }
            createAnecdote(newAnecdote).then(() => history.push(`/anecdote/${newAnecdote.id}`))
        } else {
            editAnecdote(anecdote).then(() => history.push(`/anecdote/${anecdote.id}`))
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
                <Button positive type='submit' content='Submit' loading={submitting} />
                <Button type='button' content='Iptal' onClick={() => history.push('/anecdotes')} />
            </Form>
        </Segment>
    )
}

export default observer(AnecdoteForm)
