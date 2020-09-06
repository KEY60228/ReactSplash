import React from 'react'
import ReactDOM from 'react-dom'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { asyncLogout } from '../stores/auth'

const Footer = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  interface State {
    auth: any,
    error: any
  }
  const apiStatus = useSelector((state: State) => state.auth.apiStatus)

  const logout = async() => {
    await new Promise(() => dispatch(asyncLogout()))

    if (apiStatus) {
      history.push('/login')
    }
  }

  interface State {
    auth: any
  }

  const isLogin = useSelector((state: State) => !! state.auth.user)

  return (
    <>
      <footer className="footer">
        { isLogin && 
          <button className="button button--link"  onClick={logout}>
            Logout
          </button>
        }
        { !isLogin &&
          <Link to="/login" className="button button--link">
            Login / Register
          </Link>
        }
      </footer>
    </>
  )
}

export default Footer
