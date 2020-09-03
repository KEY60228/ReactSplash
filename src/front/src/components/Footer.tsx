import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { asyncLogout } from '../stores/auth'

const Footer = () => {
  const dispatch = useDispatch()
  
  const logout = async() => {
    await dispatch(asyncLogout())
  }

  return (
    <>
      <footer className="footer">
        <button className="button button--link"  onClick={logout}>Logout</button>
        <Link to="/login" className="button button--link">
          Login / Register
        </Link>
      </footer>
    </>
  )
}

export default Footer
