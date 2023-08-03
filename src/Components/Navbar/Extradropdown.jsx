import React from 'react'


function Extradropdown(){
    return (
        <>
        <li className="nav-item dropdown item">
            <a
              className="nav-link dropdown-toggle text-light"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              More
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
            </ul>
          </li>
        </>
    )
}

export default Extradropdown