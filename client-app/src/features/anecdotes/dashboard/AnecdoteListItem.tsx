import React, { useContext } from 'react'
import { Card, Label, Image, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IAnecdote } from '../../../app/models/anecdote'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { RootStoreContext } from '../../../app/stores/rootStore'

const AnecdoteListItem: React.FC<{anecdote: IAnecdote}> = ({anecdote}) => {
    const rootStore = useContext(RootStoreContext)
    const {deleteAnecdote, submitting, target} = rootStore.anecdoteStore

    return (
        <Card className="anecdote">
            <Label.Group>
                <Label color='black'>{anecdote.category}</Label>
                <Label color='black'>{format(anecdote.date, 'd MMMM yyyy', {locale: tr})}</Label>
            </Label.Group>
            <Image src='https://tamg.aademirci.com/wp-content/uploads/2019/01/Gong-Putlar-Yikiliyor.jpg' wrapped ui={false} />
            <Card.Content>
                <Card.Header as={Link} to={`/anecdote/${anecdote.id}`}>{anecdote.title}</Card.Header>
                <Card.Meta>
                    {anecdote.city && <span className='date'><Icon name='map marker alternate' />{anecdote.venue}, {anecdote.city}</span>}
                </Card.Meta>
                <Card.Description>
                    {anecdote.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button name={anecdote.id} floated='right' content='Delete' color='red' onClick={(e) => deleteAnecdote(e, anecdote.id)} loading={target === anecdote.id.toString() && submitting} />
            </Card.Content>
        </Card>
    )
}

export default AnecdoteListItem
