import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import PhotoForm from './PhotoForm'

const Navbar = () => {
  interface State {
    auth: any
  }
  
  const isLogin = useSelector((state: State) => !! state.auth.user)
  const username = useSelector((state: State) => state.auth.user ? state.auth.user.name : '')

  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar__brand">
          ReactSplash
        </Link>
        <div className="navbar__menu">
          <div className="navbar__item">
            { isLogin && 
              <button className="button" onClick={ev => setShowForm(!showForm)}>
                <i className="icon ion-md-add"></i>
                Submit a photo
              </button>
            }
          </div>
          <span className="navbar__item">
            { isLogin && username }
          </span>
          <div className="navbar__item">
            { !isLogin && 
              <Link to="/login" className="button button--link">
                Login / Register
              </Link>
            }
          </div>
        </div>
        { showForm && 
          <PhotoForm setShowForm={setShowForm}/>
        }
      </nav>
    </>
  )
}

export default Navbar
