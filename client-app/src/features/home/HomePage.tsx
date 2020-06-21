import React, { useContext, Fragment } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { RootStoreContext } from '../../app/stores/rootStore'
import LoginForm from '../user/LoginForm'
import RegisterForm from '../user/RegisterForm'

const HomePage = () => {
    const rootStore = useContext(RootStoreContext)
    const { isLoggedIn, user } = rootStore.userStore
    const { openModal } = rootStore.modalStore

    return (
        <Container>
            <h1>HomePagee</h1>
            {isLoggedIn && user ? (
                <Button as={Link} to='/anecdotes' size='huge'>Anecdotes</Button>
            ) : (
                <Fragment>
                    <Button onClick={() => openModal(<LoginForm />)} size='huge'>Login</Button>
                    <Button onClick={() => openModal(<RegisterForm />)} size='huge'>Register</Button>
                </Fragment>
                )}
        </Container>
    )
}

export default HomePage
