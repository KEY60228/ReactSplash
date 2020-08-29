import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar__brand">ReactSplash</Link>
        <div className="navbar__menu">
          <div className="navbar__item">
            <button className="button">
              <i className="icon ion-md-add"></i>
              Submit a photo
            </button>
          </div>
          <span className="navbar__item">
            username
          </span>
          <div className="navbar__item">
            <Link to="/login" className="button button--link">
              Login / Register
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar