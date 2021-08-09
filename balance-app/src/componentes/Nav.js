import React from 'react';
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Nav = () => {

  const logOut = () => {
    cookies.remove('id', {path: '/'})
    cookies.remove('usuario', {path: '/'})
    window.location.href='./login'
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          { cookies.get('id') ? 
            <>
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
                <li className="nav-item">
                  <Link className="nav-link active " to="/home">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/operations">
                    Operaciones
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav text-center">
                <li>
                  <button className="btn btn-success" onClick={() => logOut()}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </>
          :
            <ul className="navbar-nav text-center ms-auto">
              <li>
                <Link className="btn text-white" to="/login">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link className="btn btn-success" to="/register">
                  Registrarse
                </Link>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  )
}

export default Nav