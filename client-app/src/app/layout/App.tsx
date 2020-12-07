import React, { Fragment, useContext, useEffect } from 'react'
import NavBar from '../../features/nav/NavBar'
import AnecdoteDashboard from '../../features/anecdotes/dashboard/AnecdoteDashboard'
import { observer } from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom'
import HomePage from '../../features/home/HomePage'
import AnecdoteForm from '../../features/anecdotes/form/AnecdoteForm'
import AnecdoteDetails from '../../features/anecdotes/details/AnecdoteDetails'
import NotFound from './NotFound'
import { ToastContainer } from 'react-toastify'
import LoginForm from '../../features/user/LoginForm'
import { RootStoreContext } from '../stores/rootStore'
import LoadingComponent from './LoadingComponent'
import ModalContainer from '../common/modals/ModalContainer'
import ProfilePage from '../../features/profiles/ProfilePage'

const App: React.FC<RouteComponentProps> = ({ location }) => {
    const rootStore = useContext(RootStoreContext)
    const {setAppLoaded, token, appLoaded} = rootStore.commonStore
    const {getUser} = rootStore.userStore

    useEffect(() => {
        if (token)
            getUser().finally(() => setAppLoaded())
        else
            setAppLoaded()
    }, [getUser, setAppLoaded, token])

    if (!appLoaded) return <LoadingComponent content='Loading app...' />

    return (
        <Fragment>
            <ModalContainer />
            <Route exact path='/' component={HomePage} />
            <Route path={'/(.+)'} render={() => (
                <Fragment>
                    <NavBar />
                    <ToastContainer position='bottom-right' />
                    <Switch>
                        <Route path='/anecdotes' component={AnecdoteDashboard} />
                        <Route path='/anecdote/:id' component={AnecdoteDetails} />
                        <Route key={location.key} path={['/create', '/edit/:id']} component={AnecdoteForm} />
                        <Route path='/profile/:username' component={ProfilePage} />
                        <Route component={NotFound} />
                    </Switch>
                </Fragment>
            )} />
        </Fragment>
    );
}

export default withRouter(observer(App))
