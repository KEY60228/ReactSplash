import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PhotoList from './components/PhotoList'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact children={<PhotoList />}/>
          <Route path="/login" children={<Login />}/>
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
