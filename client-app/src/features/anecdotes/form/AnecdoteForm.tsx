import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { AnecdoteFormValues } from '../../../app/models/anecdote'
import AnecdoteStore from '../../../app/stores/anecdoteStore'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput'
import TextAreaInput from '../../../app/common/form/TextAreaInput'
import SelectInput from '../../../app/common/form/SelectInput'
import { category } from '../../../app/common/options/categoryOptions'
import DateInput from '../../../app/common/form/DateInput'
import { combineDateAndTime } from '../../../app/common/util/util'
import { combineValidators, isRequired } from 'revalidate'

const validate = combineValidators({
    title: isRequired({message: 'Başlık gereklidir'}),
    category: isRequired('Category'),
    date: isRequired('Date')
})

interface DetailParams {
    id: string
}

const AnecdoteForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const anecdoteStore = useContext(AnecdoteStore)
    const { createAnecdote, editAnecdote, submitting, loadAnecdote, getAnecdoteIndex } = anecdoteStore

    const [anecdote, setAnecdote] = useState(new AnecdoteFormValues())
    const [loading, setLoading] = useState(false)
    const [anecdoteIndex, setAnecdoteIndex] = useState(0)
    

    useEffect(() => {
        if (match.params.id) {
            setLoading(true)
            loadAnecdote(parseInt(match.params.id)).then((anecdote) => setAnecdote(new AnecdoteFormValues(anecdote))).finally(() => setLoading(false))
        } else {
            setLoading(true)
            getAnecdoteIndex().then((result) => setAnecdoteIndex(result)).finally(() => setLoading(false))
        }
    }, [loadAnecdote, match.params.id, getAnecdoteIndex])

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date)
        const {date, ...anecdote} = values
        anecdote.date = dateAndTime
        if (!anecdote.id) {
            let newAnecdote = {
                ...anecdote,
                id: anecdoteIndex + 1
            }
            console.log(anecdote)
            createAnecdote(newAnecdote)
        } else {
            editAnecdote(anecdote)
        }
    }

    return (
        <Segment>
            <FinalForm validate={validate} initialValues={anecdote} onSubmit={handleFinalFormSubmit} render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                    <Field name='title' placeholder='Başlık' value={anecdote.title} component={TextInput} />
                    <Field name='description' placeholder='Açıklama' value={anecdote.description} rows={3} component={TextAreaInput} />
                    <Field name='category' placeholder='Kategori' value={anecdote.category} options={category} component={SelectInput} />
                    <Field name='date' placeholder='Tarih' value={anecdote.date} component={DateInput} />
                    <Field name='city' placeholder='Şehir' value={anecdote.city} component={TextInput} />
                    <Field name='venue' placeholder='Mekan' value={anecdote.venue} component={TextInput} />
                    <Button positive type='submit' content='Submit' loading={submitting} disabled={loading || invalid || pristine} />
                    <Button type='button' content='Iptal' onClick={anecdote.id ? () => history.push(`/anecdote/${anecdote.id}`) : () => history.push('/anecdotes')} disabled={loading} />
                </Form>
            )} />
        </Segment>
    )
}

export default observer(AnecdoteForm)
