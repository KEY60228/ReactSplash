import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PhotoList from './PhotoList'
import Login from './Login'
import Navbar from './Navbar'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact children={<PhotoList />}/>
          <Route path="/login" children={<Login />}/>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
