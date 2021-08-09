import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Nav from '../componentes/Nav'
import BalanceOperaciones from "../componentes/BalanceOperaciones"
import OperacionesList from "../componentes/OperacionesList"
import ModalOperaciones from '../componentes/ModalOperaciones'
import LoginForm from "../componentes/Login"
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
    const [operations, setOperations] = useState([])
    const [operation, setOperation] = useState([{
        operacionesConcepto: '',
        operacionesMonto: '',
        relaTipo: '',
    }])
    const [title, setTitle] = useState('Editar')

    useEffect(() => {
        getOperations(0)
        getOperation(1)
    },[])

    const getOperations = async (type) => {
        await axios.get('http://localhost:4000/operaciones-tipo/' + type).then(
            (res) => {
                setOperations(res.data)
            }
        )
    }

    const getOperation = async (id) => {
        await axios.get('http://localhost:4000/operaciones/' + id).then(
            (res) => {
                setOperation(res.data[0])
            }
        )
    }

    const deleteOperacion = async (id) => {
        await axios.delete(`http://localhost:4000/eliminar-operacion/${id}`, {
          mode: 'cors',
          credentials: 'include'
        })
        getOperations(0)
    }

    let opciones = document.getElementsByClassName('opciones')

    const changeColor = (selected) => {
        cambiarClase();
        opciones[selected].classList.add('btn-success');
        opciones[selected].classList.remove('border');
    }
    
    const cambiarClase = () => {
        for (let i = 0; i < opciones.length; i++) {
          opciones[i].classList.remove('btn-success')
          opciones[i].classList.add('border')
        }
    }
    
    for (let i = 0; i < opciones.length; i++) {
        opciones[i].addEventListener("click", () => changeColor(i))
    }

    return (
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
                        <OperacionesList 
                            operations={operations}
                            operation={operation}
                            getOperations={getOperations}
                            setTitle={setTitle}
                            title={title}
                            getOperation={getOperation}
                            setOperation={setOperation}
                            deleteOperacion={deleteOperacion}
                        ></OperacionesList>
                        <ModalOperaciones 
                            operations={operations}
                            operation={operation}
                            setOperation={setOperation}
                            getOperation={getOperation}
                            getOperations={getOperations}
                            title={title}
                            deleteOperacion={deleteOperacion}
                            setTitle={setTitle}
                        ></ModalOperaciones>
                </PrivateRoute>
                <PrivateRoute path="/home">
                    <BalanceOperaciones operations={operations} setOperations={setOperations}>
                    </BalanceOperaciones> 
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default AppRouter