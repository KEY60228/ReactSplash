import React, { JSXElementConstructor } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const GuestRoute = (props: any) => {
  interface State {
    auth: any
  }
  const isLogin = useSelector((state: State) => !! state.auth.user)

  return isLogin ? <Redirect to="/" /> : <Route {...props} />
}

export default GuestRoute