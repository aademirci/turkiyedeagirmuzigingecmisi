import React, { useContext } from 'react'
import { Menu, Container, Button, Responsive, Image, Dropdown } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { Link, NavLink } from 'react-router-dom'
import { RootStoreContext } from '../../app/stores/rootStore'

const NavBar: React.FC = () => {
	const rootStore = useContext(RootStoreContext)
	const { isLoggedIn, user, logout } = rootStore.userStore

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
				{user && (
					<Menu.Item position='right'>
						<Image avatar spaced='right' src={user.image || 'https://pbs.twimg.com/profile_images/1094653876593147906/jE71N6tm_reasonably_small.jpg'} />
						<Dropdown pointing='top left' text={user.displayName}>
							<Dropdown.Menu>
								<Dropdown.Item
									as={Link}
									to={`/profile/username`}
									text='My profile'
									icon='user'
								/>
								<Dropdown.Item onClick={logout} text='Logout' icon='power' />
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>
				)}
			</Container>
		</Menu>
	)
}

export default observer(NavBar)
