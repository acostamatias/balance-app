import React from 'react';
import {Link} from 'react-router-dom'

const Nav = () => {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav fs-5 mx-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item">
              <Link className="nav-link active " to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/operations">
                Operaciones
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav