import React, { Fragment, useContext } from 'react'
import { Card, Icon, Image, Label, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import AnecdoteStore from '../../../app/stores/anecdoteStore'



const AnecdoteList: React.FC = () => {
    const anecdoteStore = useContext(AnecdoteStore)
    const {anecdotesByDate, selectAnecdote, deleteAnecdote, submitting, target} = anecdoteStore

    return (
        <Fragment>
            {anecdotesByDate.map(anecdote => (
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
                        <Button name={anecdote.id} floated='right' content='Delete' color='red' onClick={(e) => deleteAnecdote(e, anecdote.id)} loading={target === anecdote.id.toString() && submitting} />
                        <Button floated='right' content='View' color='blue' onClick={() => selectAnecdote(anecdote.id)} />
                    </Card.Content>
                </Card>
            ))}
        </Fragment>



    )
}

export default observer(AnecdoteList)
