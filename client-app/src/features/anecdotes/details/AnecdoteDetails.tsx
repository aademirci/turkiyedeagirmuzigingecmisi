import React, { useContext } from 'react'
import { Button } from 'semantic-ui-react'
import AnecdoteStore from '../../../app/stores/anecdoteStore'
import { observer } from 'mobx-react-lite'


const AnecdoteDetails: React.FC = () => {
    const anecdoteStore = useContext(AnecdoteStore)
    const {selectedAnecdote: anecdote, openEditForm, cancelSelectedAnecdote} = anecdoteStore

    return (
        <div>
            {anecdote!.title}
            {anecdote!.description}
            <Button content='Edit' color='blue' onClick={() => openEditForm(anecdote!.id)} />
            <Button content='Cancel' color='grey' onClick={cancelSelectedAnecdote} />
        </div>
    )
}

export default observer(AnecdoteDetails)
