import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import PhotoList from './components/PhotoList'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { asyncCurrentUser } from './stores/auth'
import GuestRoute from './routes/GuestRoute'
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  const dispatch = useDispatch()

  const currentUser = async() => {
    await dispatch(asyncCurrentUser())
  }
  
  useEffect(() => {
    currentUser()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact children={<PhotoList />} />
          <GuestRoute path="/login" children={<Login />} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
