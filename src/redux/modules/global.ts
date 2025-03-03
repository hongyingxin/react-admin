import { createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "@/redux/interface";

const globalState: GlobalState = {
};

const globalSlice = createSlice({
  name: 'hooks-global',
  initialState: globalState,
  reducers: {
    setGlobalState: (state, action) => {}
  }
})

export const { setGlobalState } = globalSlice.actions;
export default globalSlice.reducer;




