import { createSlice } from '@reduxjs/toolkit'

// Stateの初期状態
const initialState = {
  code: null
}

// Sliceを生成する
const slice = createSlice({
  name: 'error', // Sliceの名称
  initialState, // Stateの初期状態 (上で定義)
  reducers: {
    // action.payloadに渡された引数が入っている
    setCode: (state, action) => {
      return Object.assign({}, state, { user: action.payload })
    },
  },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setCode } = slice.actions

// Asyncアクション
