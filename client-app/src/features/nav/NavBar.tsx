import React from 'react'
import { Menu, Container, Button, Responsive } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { Link, NavLink } from 'react-router-dom'

const NavBar: React.FC = () => {

	return (
		<Menu inverted>
			<Container fluid>
				<Menu.Item header as={NavLink} exact to='/'>
					<img className="ui" src="/tamg-logo.png" alt="logo" width={151} height={51} />
					<Responsive minWidth={768}>Türkiye'de Ağır Müziğin Geçmişi</Responsive>
				</Menu.Item>
				<Menu.Item name='Anekdotlar' as={NavLink} to='/anecdotes' />
				<Menu.Item>
					<Button as={Link} to='/create' positive content='Anekdot paylaş' />
				</Menu.Item>
			</Container>
		</Menu>
	)
}

export default observer(NavBar)
