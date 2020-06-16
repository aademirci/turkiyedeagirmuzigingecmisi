import React, { useContext } from 'react'
import { Menu, Container, Button, Responsive } from 'semantic-ui-react'
import AnecdoteStore from '../../app/stores/anecdoteStore'
import { observer } from 'mobx-react-lite'

const NavBar: React.FC = () => {
	const anecdoteStore = useContext(AnecdoteStore)

	return (
		<Menu fixed='top' inverted>
			<Container fluid>
				<Menu.Item header>
					<img className="ui" src="tamg-logo.png" alt="logo" width={151} height={51} />
					<Responsive minWidth={768}>Türkiye'de Ağır Müziğin Geçmişi</Responsive>
				</Menu.Item>
				<Menu.Item name='Anekdotlar' />
				<Menu.Item>
					<Button positive content='Anekdot paylaş' onClick={anecdoteStore.openCreateForm} />
				</Menu.Item>
			</Container>
		</Menu>
	)
}

export default observer(NavBar)
