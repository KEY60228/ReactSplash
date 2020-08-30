import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

// それぞれ slice.reducer を default export している前提
import authReducer from './auth'

const reducer = combineReducers({
  auth: authReducer,
})

const store = configureStore({ reducer })

export default store
