import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Navbar = () => {
  interface State {
    auth: any
  }
  
  const isLogin = useSelector((state: State) => !! state.auth.user)
  const username = useSelector((state: State) => state.auth.user ? state.auth.user.name : '')

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar__brand">
          ReactSplash
        </Link>
        <div className="navbar__menu">
          <div className="navbar__item">
            { isLogin && 
              <button className="button">
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
      </nav>
    </>
  )
}

export default Navbar
