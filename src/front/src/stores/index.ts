import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

// それぞれ slice.reducer を default export している前提
import authReducer from './auth'
import errorReducer from './error'
import messageReducer from './message'

const reducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  message: messageReducer,
})

const store = configureStore({ reducer })

export default store
