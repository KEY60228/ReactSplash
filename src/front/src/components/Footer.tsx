import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <button className="button button--link">Logout</button>
        <Link to="/login" className="button button--link">
          Login / Register
        </Link>
      </footer>
    </>
  )
}

export default Footer
