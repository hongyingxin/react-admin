import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/redux/interface";

const authState: AuthState = {

};

const authSlice = createSlice({
  name: 'hooks-auth',
  initialState: authState,
  reducers: {
    setAuthMenuList: (state, action) => {
    },
  },
})

export const { setAuthMenuList } = authSlice.actions;
export default authSlice.reducer;
