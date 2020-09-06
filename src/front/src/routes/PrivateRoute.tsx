import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = (props: any) => {
  interface State {
    auth: any
  }
  const isLogin = useSelector((state: State) => !! state.auth.user)

  return isLogin ? <Route {...props} /> : <Redirect to="/login" />
}

export default PrivateRoute