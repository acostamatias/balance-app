import React, {useState, useContext} from 'react'
import axios from 'axios'

import {AppContext} from './Provider'
import Cookies from 'universal-cookie'

const cookie = new Cookies()

const ModalOperaciones = (props) => {
  const [state, setState] = useContext(AppContext)

  const [errors, setErrors] = useState({
    tipo: '',
    mensaje: ''
  })

  const reset = () => {
    setState({
      ...state, 
      title: 'Editar',
      
        operacionesConcepto: '',
        operacionesMonto: '',
        relaTipo: ''
      
    })

    setErrors({mensaje: ''})
    document.querySelector('#alerta').classList=''
  }

  const handleOnChange = (e) => {
    const {name, value} = e.target

    setState((prevState) => ({
      ...prevState,
        [name]: value
      } 
    ))
  }

  const axiosMethod = async (method, data) => {
    if(method === 'post') {
      await axios.post('http://localhost:4000/nueva-operacion/', data)
      getOperations(0)
    }else {
      await axios.put('http://localhost:4000/actualizar-operacion/' + state.operacionesId, data) 
      getOperations(0)
    }
  }

  const getOperations = async (type) => {
    await axios.get('http://localhost:4000/operaciones-tipo' , {params: {id: type, idUsuario:cookie.get('id')}}).then(
        (res) => {
            setState({...state, operations: res.data})
        }
    )
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if(
      state.operacionesConcepto.length > 0 
      && state.operacionesMonto !== ''
      && state.relaTipo !== ''
      ) {
        let data = {
          operacionesConcepto: state.operacionesConcepto,
          operacionesMonto: state.operacionesMonto,
          operacionesFecha: state.operacionesFecha,
          relaTipo: state.relaTipo,
          relaUsuario: cookie.get('id')
        }
        if(state.title === 'Editar') {
          console.log(state)

          axiosMethod('put', data)
          setErrors({tipo: "success", mensaje: "Operación actualizada con éxito."})
          document.querySelector('#alerta').classList+=('alert alert-success')
        }else {
          axiosMethod('post', data)
          setErrors({tipo: "success", mensaje: "Operación agregada con éxito."})
          document.querySelector('#alerta').classList+=('alert alert-success')
        }
        
    }
  }

  const deleteOperacion = async (id) => {
    await axios.delete(`http://localhost:4000/eliminar-operacion/${id}`, {
      mode: 'cors',
      credentials: 'include'
    })
    getOperations(0)
}

  return(
    <>
      <div className="modal fade" id="modalEliminar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticModalEliminar" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticModalEliminar">Eliminar operacion</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div>
              <div className="modal-body fs-4 text-center">
                ¿Está seguro que desea eliminar
                <br />
                <b>{state.operacionesConcepto.length  > 0 && state.operacionesConcepto}</b>?
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary rounded-pill px-4" 
                  data-bs-dismiss="modal" 
                  onClick={() => reset()}
                >
                  Cancelar
                </button>
                <button 
                  type="button"
                  onClick={() => deleteOperacion(state.operacionesId)}
                  className="btn btn-danger rounded-pill px-4"
                  data-bs-dismiss="modal"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{state.title} Operación</h5>
              <button 
                type="button"
                className="btn-close" 
                data-bs-dismiss="modal" 
                onClick={() => reset()} 
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              
              <div id="alerta" className="" role="alert">
                {errors.mensaje.length > 0 && errors.mensaje}
              </div>
              {state.title === "Editar" ? 
                

                //Form PUT ----------------------------------------
                <form id="formulario" onSubmit={handleOnSubmit}>
                  <div className="mb-3">
                    <label htmlFor="concepto" className="form-label">Concepto</label>
                    <input 
                      type="text" 
                      name="operacionesConcepto" 
                      className="form-control" 
                      value={state.operacionesConcepto} 
                      id="concepto" 
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="monto" className="form-label">Monto</label>
                    <input 
                      type="number" 
                      name="operacionesMonto" 
                      className="form-control" 
                      value={state.operacionesMonto} 
                      id="monto" 
                      onChange={handleOnChange}
                    />
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary rounded-pill px-4" 
                      onClick={() => reset()}
                      data-bs-dismiss="modal"
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-success rounded-pill px-4">Aceptar</button>
                  </div>
                </form>
                
               : 
               // Form Post --------------------------------------------
               <form id="formularioPost" onSubmit={handleOnSubmit}>
               <div className="mb-3">
                 <label htmlFor="conceptoPost" className="form-label">Concepto</label>
                 <input 
                   type="text" 
                   name="operacionesConcepto" 
                   className="form-control" 
                   id="conceptoPost" 
                   placeholder="Concepto Operación"
                   value={state.operacionesConcepto || ""}
                   onChange={handleOnChange}
                 />
               </div>
               <div className="mb-3">
                 <label htmlFor="montoPost" className="form-label">Monto</label>
                 <input 
                   type="number" 
                   name="operacionesMonto" 
                   className="form-control" 
                   id="montoPost" 
                   placeholder="12345 (Sólo números)"
                   onChange={handleOnChange}
                   value={state.operacionesMonto || ""}
                 />
               </div>
               <div className="mb-3">
                 <label htmlFor="tipoPost" className="form-label">Tipo</label>
                 <select 
                   id="tipoPost" 
                   name="relaTipo" 
                   className="form-select"
                   onChange={handleOnChange}
                   value={state.relaTipo || "0"}
                 >
                   <option value="0" disabled>Seleccionar tipo</option>  
                   <option value="1">Ingreso</option>      
                   <option value="2">Egreso</option>
                 </select>
               </div>
               <div className="modal-footer">
                 <button 
                  type="button"
                  className="btn btn-secondary rounded-pill px-4" 
                  onClick={() => reset()} 
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                 <button type="submit" className="btn btn-success rounded-pill px-4">Aceptar</button>
               </div>
             </form>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default ModalOperaciones
