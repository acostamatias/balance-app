import React, {useState} from 'react'
import axios from 'axios'

const ModalOperaciones = (props) => {

  const [errors, setErrors] = useState({
    tipo: '',
    mensaje: ''
  })

  const reset = () => {
    props.setOperation(
      {operacionesConcepto: '',
      operacionesMonto: '',
      relaTipo: ''}
    )
    props.setTitle('Editar')
    setErrors({mensaje: ''})
    document.querySelector('#alerta').classList=''
  }

  const handleOnChange = (e) => {
    const {name, value} = e.target
    props.setOperation((prevState) => ({
      ...prevState,
      [name]: value }
    ))
  }

  const axiosMethod = async (method, data) => {
    if(method === 'post') {
      await axios.post('http://localhost:4000/nueva-operacion/', data)
      props.getOperations(0)
    }else {
      await axios.put('http://localhost:4000/actualizar-operacion/' + props.operation.operacionesId, data) 
      props.getOperations(0)
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if(
      props.operation.operacionesConcepto.length > 0 
      && props.operation.operacionesMonto !== ''
      && props.operation.relaTipo !== ''
      ) {
        const data = props.operation
        if(props.title === 'Editar') {
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
                ¿Está seguro que desea eliminar <b>{Object.keys(props.operation).length  > 0 && props.operation.operacionesConcepto}</b>?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" onClick={() => props.deleteOperacion(props.operation.operacionesId)} className="btn btn-danger rounded-pill px-4" data-bs-dismiss="modal">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{props.title} Operación</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => reset()} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              
              <div id="alerta" className="" role="alert">
                {errors.mensaje.length > 0 && errors.mensaje}
              </div>
              {props.title === "Editar" ? 
                Object.keys(props.operation).length > 0 && 

                //Form PUT ----------------------------------------
                <form id="formulario" onSubmit={handleOnSubmit}>
                  <div className="mb-3">
                    <label htmlFor="concepto" className="form-label">Concepto</label>
                    <input 
                      type="text" 
                      name="operacionesConcepto" 
                      className="form-control" 
                      value={props.operation.operacionesConcepto} 
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
                      value={props.operation.operacionesMonto} 
                      id="monto" 
                      onChange={handleOnChange}
                    />
                  </div>
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => reset()} data-bs-dismiss="modal">Cancelar</button>
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
                   value={props.operation.operacionesConcepto || ""}
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
                   value={props.operation.operacionesMonto || ""}
                 />
               </div>
               <div className="mb-3">
                 <label htmlFor="tipoPost" className="form-label">Tipo</label>
                 <select 
                   id="tipoPost" 
                   name="relaTipo" 
                   className="form-select"
                   onChange={handleOnChange}
                   value={props.operation.relaTipo || "0"}
                 >
                   <option value="0" disabled>Seleccionar tipo</option>  
                   <option value="1">Ingreso</option>      
                   <option value="2">Egreso</option>
                 </select>
               </div>
               <div className="modal-footer">
                 <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => reset()} data-bs-dismiss="modal">Cancelar</button>
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
