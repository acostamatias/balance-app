import axios from "axios"
import React, {useState,useEffect, useContext} from "react"
import {Link} from 'react-router-dom'
import {AppContext} from './Provider'
import Cookies from "universal-cookie"

const cookie = new Cookies()

const Balance = (props) => {
    const [balance, setBalance] = useState({})
    const [state, setState] = useContext(AppContext)

    useEffect(() => {
        getBalance()
        getUltimasOperaciones()
    },[])

    const getBalance = async () => {
        await axios.get('http://localhost:4000/balance/' + cookie.get('id')).then(
            (res) => {
                setBalance(res.data[0])
            }
        )
    }

    const getUltimasOperaciones = async () => {
        await axios.get('http://localhost:4000/ultimas-operaciones/' + cookie.get('id')).then(
            (res) => {
                setState({
                    ...state,
                    operations: res.data
                })
                console.log(res.data)
            }
        )
    }

    return(
        <div className="container"> 
            <div className="row"> 
                <h2 className="text-center mt-5">Bienvenido {cookie.get('usuario')}</h2>

                {state.operations.length > 0 ? 
                    <>
                        <div 
                        className="col-lg-5 col-sm-12 text-center card shadow-sm mt-5 d-flex align-items-center bg-success text-white me-3 py-3"
                        >
                        
                            <div className="my-auto">
                                <h1>Balance total</h1>
                                <h2>${Object.keys(balance).length > 0 && balance.balance}</h2>
                            </div>
                        </div>

                        <div className="col-sm-12 col-lg-6 table-responsive-lg border mt-5 bg-white shadow-sm rounded p-3">
                            <h2 className="text-center">Últimas operaciones</h2>
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Concepto</th>
                                        <th scope="col">Monto</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.operations !== 'error' ? (
                                        state.operations.map(item => (
                                            <tr key={item.operacionesId}>
                                                <td>{item.operacionesConcepto}</td>
                                                <td>${item.operacionesMonto}</td>
                                                <td>{item.relaTipo === 1 ? "Ingreso" : "Egreso"}</td>
                                                <td>{item.fecha}</td>
                                            </tr>
                                        ))) : (
                                            <></>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <div className="text-center my-5">
                        <h2>No se encontraron resultados.</h2>
                        <h4 className="text-secondary">Dirijase a la pestaña de operaciones para comenzar.</h4>
                        <Link className="btn btn-success rounded-pill mt-3" to="/operations">
                            Operaciones
                        </Link>
                        </div>
                }
                
            </div>
        </div>
    )
}

export default Balance

