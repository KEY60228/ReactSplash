import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PhotoList from './components/PhotoList'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { asyncCurrentUser } from './stores/auth'
import GuestRoute from './routes/GuestRoute'
import PrivateRoute from './routes/PrivateRoute'
import SystemError from './components/errors/SystemError'
import { INTERNAL_SERVER_ERROR } from './util'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const currentUser = async() => {
    await dispatch(asyncCurrentUser())
  }

  interface State {
    auth: any,
    error: any
  }
  const code = useSelector((state: State) => state.error.code)
  
  useEffect(() => {
    currentUser()
  }, [])

  useEffect(() => {
    if (code === INTERNAL_SERVER_ERROR) {
      history.push('/500')
    }
  }, [code])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact children={<PhotoList />} />
          <GuestRoute path="/login" children={<Login />} />
          <Route path="/500" children={<SystemError />}/>
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
