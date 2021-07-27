import React from 'react'

const OperacionesList = (props) => {

    const reset = () => {

        props.setTitle('Nueva')
        props.setOperation({        
            operacionesConcepto: '',
            operacionesMonto: '',
            relaTipo: ''
        })
    }

    return(
        <>
            {props.operations.length > 0 ? (
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
                                onClick={() => props.getOperations(0)}
                            >
                                Todas
                            </button>
                            <span className="text-secondary mx-1">/</span>
                            <button 
                                className="btn btn-sm opciones shadow-sm border px-3 rounded-pill"
                                onClick={() => props.getOperations(1)}
                            >
                                Ingreso
                            </button>
                            <span className="text-secondary mx-1">/</span>
                            <button 
                                className="btn btn-sm opciones shadow-sm border px-3 rounded-pill"
                                onClick={() => props.getOperations(2)}
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
                                {props.operations !== 'error' ? (
                                    props.operations.map(item => (
                                    <tr key={item.operacionesId}>
                                        <td>{item.operacionesConcepto}</td>
                                        <td>${item.operacionesMonto}</td>
                                        <td>{item.relaTipo === 1 ? "Ingreso" : "Egreso"}</td>
                                        <td>{item.fecha}</td>
                                        <td>
                                            <button 
                                                type="button" 
                                                id="idEditar" 
                                                onClick={() => props.getOperation(item.operacionesId)} 
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
                                                onClick={() => props.getOperation(item.operacionesId)} 
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
                        className="btn btn-sm btn-success ms-auto shadow-sm border" 
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