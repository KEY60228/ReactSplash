import { createSlice } from '@reduxjs/toolkit'

// Stateの初期状態
const initialState = {
  user: null,
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
  },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setUser } = slice.actions

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
      const response = await window.axios.post(
        'https://localhost:1443/api/login',
        data
      )
      // console.log(response.data)
      dispatch(setUser(response.data))
    } catch(err) {}
  }
}

export const asyncLogout = () => {
  return async(dispatch: any) => {
    try {
      const response = await window.axios.post(
        'https://localhost:1443/api/logout'
      )
    } catch(err) {}
    dispatch(setUser(null));
  }
}