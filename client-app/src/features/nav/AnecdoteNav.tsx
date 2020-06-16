import React from 'react'
import { Container, Button, Icon, Dropdown } from 'semantic-ui-react'

const languageOptions = [
    { key: '1980', text: '1980', value: '1980' },
    { key: '1981', text: '1981', value: '1981' }
  ]

const AnecdoteNav = () => {
    return (
        <Container className='anecdote-nav' textAlign='center'>
            <Button.Group widths={3}>
                <Button><Icon name='chevron left' />En başa dön</Button>
                <Dropdown button className='icon' floating scrolling options={languageOptions} icon='chevron down' text='Yıllar' style={{'textAlign': 'center'}} />
                <Button toggle>Sıralama: Geçmişten bugüne</Button>
            </Button.Group>
        </Container>
    )
}

export default AnecdoteNav
