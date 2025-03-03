import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/redux/interface";

const userState: UserState = {
  token: "safas",
  userInfo: {
    name: "Admin"
  },
}

const userSlice = createSlice({
  name: 'hooks-user',
  initialState: userState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setUserInfo: (state, { payload }: PayloadAction<{ name: string }>) => {
      state.userInfo = payload;
    },
  }
})

export const { setToken, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
