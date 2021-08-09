import React, { createContext, useState } from "react"

const OperationsProvider = (props) => {
    const [state, setState] = useState({
        title: 'Editar',
        usuarioId: null,
        operations: [],
        operacionesId: '',
        operacionesConcepto: '',
        operacionesMonto: '',
        operacionesFecha: '',
        relaTipo: '',
    })
    return(
        <>
            <AppContext.Provider value={[state, setState]}>
                {props.children}
            </AppContext.Provider>
        </>
    )
}

export default OperationsProvider
export const AppContext = createContext()