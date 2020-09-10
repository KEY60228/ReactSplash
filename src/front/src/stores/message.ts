import { createSlice } from '@reduxjs/toolkit'

// Stateの初期状態
const initialState = {
  content: ''
}

// Sliceを生成する
const slice = createSlice({
  name: 'message', // Sliceの名称
  initialState, // Stateの初期状態 (上で定義)
  reducers: {
    // action.payloadに渡された引数が入っている
    setContent: (state, action) => {
      return Object.assign({}, state, { content: action.payload })
    },
  },
})

// Reducerをエクスポートする
export default slice.reducer

// Action Creatorsをエクスポートする
export const { setContent } = slice.actions

// Asyncアクション
