import React, {useContext, useEffect} from 'react'
import axios from 'axios'

import {AppContext} from './Provider'
import Cookies from 'universal-cookie'

const cookie = new Cookies()

const OperacionesList = (props) => {
    const [state, setState] = useContext(AppContext)

    const getOperations = async (type) => {
        await axios.get('http://localhost:4000/operaciones-tipo', {params: {id: type, idUsuario:cookie.get('id')}}).then(
            (res) => {
                setState({...state, operations: res.data})
            }
        )
    }

    useEffect(() => {  
        getOperations(0)
        console.log('efftc')
    },[])

    const reset = () => {

        setState({
            ...state, 
            title: 'Nueva',
            operacionesId: '',
            operacionesConcepto: '',
            operacionesMonto: '',
            operacionesFecha: '',
            relaTipo: ''
        })
    }

    const getOperation = async (id) => {
        await axios.get('http://localhost:4000/operaciones/' + id).then(
            (res) => {
                setState({
                    ...state,
                    operacionesId: res.data[0].operacionesId,
                    operacionesConcepto: res.data[0].operacionesConcepto,
                    operacionesMonto: res.data[0].operacionesMonto,
                    operacionesFecha: res.data[0].operacionesFecha,
                    relaTipo: res.data[0].relaTipo,
                })
                console.log(state)
            }
        )
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

    return(
        <>
            {state.operations.length > 0 ? (
                <div className="container">
                    <div className="row">
                        <div className="bg-white shadow-sm p-3 rounded border mt-5 d-flex align-items-center">
                            <h1 className="m-0 fs-2">Lista de operaciones</h1>
                            <button 
                                className="btn btn-sm btn-success ms-auto shadow-sm px-3 rounded-pill" 
                                data-bs-toggle="modal" 
                                onClick={() => reset()}
                                data-bs-target="#staticBackdrop"
                            >
                                Nueva Operación
                            </button>
                        </div>
                        <div className="text-center  py-3">
                            <span className="text-secondary me-2">Filtrar por:</span>
                            <button
                                className="btn btn-success btn-sm opciones shadow-sm border px-3 rounded-pill"
                                onClick={() => getOperations(0)}
                            >
                                Todas
                            </button>
                            <span className="text-secondary mx-1">/</span>
                            <button 
                                className="btn btn-sm opciones shadow-sm border px-3 rounded-pill"
                                onClick={() => getOperations(1)}
                            >
                                Ingreso
                            </button>
                            <span className="text-secondary mx-1">/</span>
                            <button 
                                className="btn btn-sm opciones shadow-sm border px-3 rounded-pill"
                                onClick={() => getOperations(2)}
                            >
                                Egreso
                            </button>
                        </div>
                        <div className="col-sm-12 col-lg-12 table-responsive-lg border bg-white shadow-sm rounded p-3 mb-4">
                            <table className="table table-hover align-middle">
                                <thead>
                                <tr>
                                    <th scope="col">Concepto</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Acciones</th>
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
                                        <td>
                                            <button 
                                                type="button" 
                                                id="idEditar" 
                                                onClick={() => getOperation(item.operacionesId)} 
                                                className="btn btn-secondary btn-sm me-2 mb-1 px-3 rounded-pill shadow-sm" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#staticBackdrop"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                type="button" 
                                                value={item.operacionesId} 
                                                className="btn btn-danger btn-sm mb-1 px-3 rounded-pill shadow-sm" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#modalEliminar"
                                                onClick={() => getOperation(item.operacionesId)} 
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))) : (
                                    <div></div>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center my-5">
                    <h3>No se encontraron resultados</h3>

                    <button 
                        className="btn btn-sm btn-success ms-auto shadow-sm rounded-pill" 
                        data-bs-toggle="modal" 
                        onClick={() => reset()}
                        data-bs-target="#staticBackdrop"
                    >
                        Nueva Operación
                    </button>
                </div>
            )}
        </>
    )
}

export default OperacionesList