import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

// それぞれ slice.reducer を default export している前提
import authReducer from './auth'
import errorReducer from './error'

const reducer = combineReducers({
  auth: authReducer,
  error: errorReducer
})

const store = configureStore({ reducer })

export default store
