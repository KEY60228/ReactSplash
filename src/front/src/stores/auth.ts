import { createSlice } from "@reduxjs/toolkit";

// Stateの初期状態
const initialState = {
  user: null
};

// Sliceを生成する
const slice = createSlice({
  name: "auth", // Sliceの名称
  initialState, // Stateの初期状態 (上で定義)
  reducers: {
    // action.payloadに渡された引数が入っている
    setUser: (state, action) => {
      return Object.assign({}, state, {user: action.payload})
    }
  },
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { setUser } = slice.actions

// Asyncアクション
export const register = (data: any) => {
  return async(dispatch: any) => {
    try {
      const response = await window.axios.post('/api/register', data)
      dispatch(setUser(response))
    } catch(err) {
      
    }
  }
}