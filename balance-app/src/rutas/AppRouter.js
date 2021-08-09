import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Nav from '../componentes/Nav'
import OperationsProvider from '../componentes/Provider'
import BalanceOperaciones from "../componentes/BalanceOperaciones"
import OperacionesList from "../componentes/OperacionesList"
import ModalOperaciones from '../componentes/ModalOperaciones'
import LoginForm from "../componentes/Login"
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {

    return (
        <OperationsProvider>
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/login">
                    <LoginForm login={"login"}></LoginForm>
                </Route>
                <Route exact path="/register">
                    <LoginForm></LoginForm>
                </Route>
                <PrivateRoute exact path="/operations" >
                        <OperacionesList />
                        <ModalOperaciones />
                </PrivateRoute>
                <PrivateRoute path="/home">
                    <BalanceOperaciones />
                </PrivateRoute>
            </Switch>
        </Router>
        </OperationsProvider>
    )
}

export default AppRouter