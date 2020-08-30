import { createSlice } from "@reduxjs/toolkit";

// Stateの初期状態
const initialState = {

};

// Sliceを生成する
const slice = createSlice({
  name: "auth", // Sliceの名称
  initialState, // Stateの初期状態 (上で定義)
  reducers: {
    // action.payloadに渡された引数が入っている
    // setName: (state, action) => {
    //   return Object.assign({}, state, { name: action.payload })
    // },
  },
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
// export const { setName } = slice.actions;