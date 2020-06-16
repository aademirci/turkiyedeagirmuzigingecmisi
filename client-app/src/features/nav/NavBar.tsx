import React from 'react'
import { Menu, Container, Button, Header, Responsive } from 'semantic-ui-react'

interface IProps {
	openCreateForm: () => void
}

const NavBar: React.FC<IProps> = ({openCreateForm}) => {
	return (
		<Menu fixed='top' inverted>
			<Container fluid>
				<Menu.Item header>
					<img className="ui" src="tamg-logo.png" alt="logo" width={151} height={51} />
					<Responsive minWidth={768}>Türkiye'de Ağır Müziğin Geçmişi</Responsive>
				</Menu.Item>
				<Menu.Item name='Anekdotlar' />
				<Menu.Item>
					<Button positive content='Anekdot paylaş' onClick={openCreateForm} />
				</Menu.Item>
			</Container>
		</Menu>
	)
}

export default NavBar
