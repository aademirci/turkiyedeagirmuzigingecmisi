import React, { Fragment } from 'react'
import NavBar from '../../features/nav/NavBar'
import AnecdoteDashboard from '../../features/anecdotes/dashboard/AnecdoteDashboard'
import { observer } from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps } from 'react-router-dom'
import HomePage from '../../features/home/HomePage'
import AnecdoteForm from '../../features/anecdotes/form/AnecdoteForm'
import AnecdoteDetails from '../../features/anecdotes/details/AnecdoteDetails'

const App: React.FC<RouteComponentProps> = ({ location }) => {

    return (
        <Fragment>
            <Route exact path='/' component={HomePage} />
            <Route path={'/(.+)'} render={() => (
                <Fragment>
                    <NavBar />
                    <Route path='/anecdotes' component={AnecdoteDashboard} />
                    <Route path='/anecdote/:id' component={AnecdoteDetails} />
                    <Route key={location.key} path={['/create', '/edit/:id']} component={AnecdoteForm} />
                </Fragment>
            )} />
        </Fragment>
    );
}

export default withRouter(observer(App))
