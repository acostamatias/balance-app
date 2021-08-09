import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import Mensaje from './Mensaje'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const LoginForm = (props) => {

  const [redirect, setRedirect] = useState(false)
  const [errors, setErrors] = useState({
    type: '',
    mensaje: ''
  })
  const [usuario, setUsuario] = useState({
    usuariosNombre: '',
    password: '',
    usuariosEmail: ''
  })

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    const url = 'http://localhost:4000/login'

    await axios.get(url, {params: {usuariosNombre: usuario.usuariosNombre, usuariosPassword: usuario.password}})
    .then(
      res => {
        console.log(res.data)
        if(res.data) {
          setErrors({type: 'success', message: 'Iniciando sesión.'})
          cookies.set('id', res.data.usuariosId, {
            path: '/',
            sameSite: 'none',
            secure: true
          })
          cookies.set('usuario', res.data.usuariosNombre, {
            path: '/',
            sameSite: 'none',
            secure: true
          })
          setUsuario(
            {
              usuariosNombre: '',
              password: '',
              usuariosEmail: ''
            }
          )
          setRedirect(true)
        }else {
          setErrors({type: 'danger', mensaje: 'Los datos ingresados son incorrectos.'})
          setTimeout(() => setErrors({type: ''}), 5000)
        }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    const url = 'http://localhost:4000/register'

    if(!usuario.usuariosNombre.trim() || !usuario.usuariosEmail.trim() || !usuario.password.trim()) {
    }else {
      await axios.post(url, usuario).then(
        (res) => {
          if(res.data.length < 45) {
            setErrors({
              type: 'success',
              mensaje: res.data
            })
            setTimeout(() => setRedirect(true), 6000)
            setUsuario(
              {
                usuariosNombre: '',
                password: '',
                usuariosEmail: ''
              }
            )
          }else {
            setErrors({
              type: 'danger',
              mensaje: res.data
            })
          }
          setTimeout(() => setErrors({type: ''}), 5000)
        }
      )
    }
  }

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value }
    ))
  }

  return(
    <div className="container">
      <div className="row d-flex align-items-center justify-content-center flex-column vh-100">
        <div className="col-12 col-lg-5">
          {props.login ?
            <>
            {redirect && <Redirect to="/home"></Redirect>}
            <h2 className="text-center">Iniciar sesión</h2>
            {errors.type.length > 0 && <Mensaje errors={errors}></Mensaje>}
            <form id="formulario" className="shadow-sm border rounded p-4 mt-5" onSubmit={handleSubmitLogin}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fs-6">Nombre de usuario</label>
                <input 
                  type="text" 
                  name="usuariosNombre" 
                  className="form-control rounded-pill" 
                  placeholder="Nombre de usuario"
                  id="nombre" 
                  value={usuario.usuariosNombre}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fs-6">Contraseña</label>
                <input 
                  type="password" 
                  name="password" 
                  className="form-control rounded-pill" 
                  id="password" 
                  placeholder="Contraseña"
                  value={usuario.password}
                  onChange={handleOnChange}
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success rounded-pill px-4">Confirmar</button>
              </div>
            </form>
            </>
          : 
            <>
            {redirect ? <Redirect to="/login" /> : <></>}
            <h2 className="text-center">Crear cuenta</h2>
            {errors.type.length > 0 && <Mensaje errors={errors}></Mensaje>}
            <form id="formulario" className="shadow-sm border rounded p-4 mt-5" onSubmit={handleSubmitRegister}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fs-6">Email</label>
                <input 
                  type="email" 
                  name="usuariosEmail" 
                  className="form-control rounded-pill" 
                  placeholder="email@email.com"
                  id="email" 
                  value={usuario.usuariosEmail}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fs-6">Nombre de usuario</label>
                <input 
                  type="text" 
                  name="usuariosNombre" 
                  className="form-control rounded-pill" 
                  placeholder="Nombre de usuario"
                  id="username" 
                  value={usuario.usuariosNombre}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fs-6">Contraseña</label>
                <input 
                  type="password" 
                  name="password" 
                  className="form-control rounded-pill" 
                  id="password" 
                  placeholder="Contraseña"
                  value={usuario.password}
                  onChange={handleOnChange}
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success rounded-pill px-4">Confirmar</button>
              </div>
            </form>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default LoginForm