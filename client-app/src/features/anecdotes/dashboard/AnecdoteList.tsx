import React, { Fragment } from 'react'
import { Card, Icon, Image, Label, Button } from 'semantic-ui-react'
import { IAnecdote } from '../../../app/models/anecdote'

interface IProps {
    anecdotes: IAnecdote[]
    selectAnecdote: (id: number) => void
    deleteAnecdote: (id: number) => void
}

const AnecdoteList: React.FC<IProps> = ({ anecdotes, selectAnecdote, deleteAnecdote }) => {


    return (
        <Fragment>
            {anecdotes.map(anecdote => (
                <Card className="anecdote" key={anecdote.id}>
                    <Label.Group>
                        <Label color='black'>{anecdote.category}</Label>
                        <Label color='black'>{anecdote.date}</Label>
                    </Label.Group>
                    <Image src='https://tamg.aademirci.com/wp-content/uploads/2019/01/Gong-Putlar-Yikiliyor.jpg' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{anecdote.title}</Card.Header>
                        <Card.Meta>
                            <span className='date'><Icon name='map marker alternate' />{anecdote.venue}, {anecdote.city}</span>
                        </Card.Meta>
                        <Card.Description>
                            {anecdote.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button floated='right' content='Delete' color='red' onClick={() => deleteAnecdote(anecdote.id)} />
                        <Button floated='right' content='View' color='blue' onClick={() => selectAnecdote(anecdote.id)} />
                    </Card.Content>
                </Card>
            ))}
        </Fragment>



    )
}

export default AnecdoteList
