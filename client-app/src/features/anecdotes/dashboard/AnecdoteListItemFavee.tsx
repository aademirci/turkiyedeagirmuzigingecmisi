import React from 'react'
import { List, Image, Popup } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { IFavee } from '../../../app/models/anecdote'

interface IProps {
    favees: IFavee[]
}

const AnecdoteListItemFavee: React.FC<IProps> = ({ favees }) => {
    return (
        <List horizontal>
            {favees.map(favee => (
                <List.Item key={favee.username}>
                    <Popup header={favee.displayName} trigger={<Image size='mini' circular src={favee.image || 'https://pbs.twimg.com/profile_images/1094653876593147906/jE71N6tm_reasonably_small.jpg'} />} />
                </List.Item>
            ))}
        </List>
    )
}

export default observer(AnecdoteListItemFavee)
