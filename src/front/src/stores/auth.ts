import { createSlice } from '@reduxjs/toolkit'

import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'
import { setCode } from './error'

// Stateの初期状態
const initialState = {
  user: null,
  apiStatus: null,
  loginErrorMessages: null
}

// Sliceを生成する
const slice = createSlice({
  name: 'auth', // Sliceの名称
  initialState, // Stateの初期状態 (上で定義)
  reducers: {
    // action.payloadに渡された引数が入っている
    setUser: (state, action) => {
      return Object.assign({}, state, { user: action.payload })
    },
    setApiStatus: (state, action) => {
      return Object.assign({}, state, { apiStatus: action.payload })
    },
    setLoginErrorMessages: (state, action) => {
      return Object.assign({}, state, { loginErrorMessages: action.payload })
    }
  },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setUser, setApiStatus, setLoginErrorMessages } = slice.actions

// Asyncアクション
export const asyncRegister = (data: any) => {
  return async (dispatch: any) => {
    try {
      const response = await window.axios.post(
        'https://localhost:1443/api/register',
        data,
      )
      dispatch(setUser(response.data))
    } catch (err) {}
  }
}

export const asyncLogin = (data: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setApiStatus(null))
      const response = await window.axios.post(
        'https://localhost:1443/api/login',
        data
      ).catch(
        (err:any) => err.response || err
      )
      
      if (response.status === OK) {
        dispatch(setApiStatus(true))
        dispatch(setUser(response.data))
      }
      
      dispatch(setApiStatus(false))

      if (response.status === UNPROCESSABLE_ENTITY) {
        dispatch(setLoginErrorMessages(response.data.errors))
      }
      
      dispatch(setCode(response.status))
    } catch(err) {}
  }
}

export const asyncLogout = () => {
  return async(dispatch: any) => {
    try {
      const response = await window.axios.post(
        'https://localhost:1443/api/logout'
      )
      dispatch(setUser(null));
    } catch(err) {}
  }
}

export const asyncCurrentUser = () => {
  return async (dispatch: any) => {
    try {
      const response = await window.axios.get(
        'https://localhost:1443/api/user'
      )
      dispatch(setUser(response.data));
      dispatch(setApiStatus(true))
    } catch (err) {}
  }
}