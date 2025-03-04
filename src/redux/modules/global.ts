import { createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "@/redux/interface";

const globalState: GlobalState = {
    // layout mode (vertical | classic | transverse | columns)
    layout: "vertical",
    // footer
    footer: true,
};

const globalSlice = createSlice({
  name: 'admin-global',
  initialState: globalState,
  reducers: {
    setGlobalState: (state, action) => {}
  }
})

export const { setGlobalState } = globalSlice.actions;
export default globalSlice.reducer;




