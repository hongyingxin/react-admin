import { createSlice } from "@reduxjs/toolkit";
import { TabsState } from "@/redux/interface";


const tabsState: TabsState = {

}

const tabsSlice = createSlice({
  name: 'admin-tabs',
  initialState: tabsState,
  reducers: {
    setTabsState: (state, action) => {
    },
  },
})

export const { setTabsState } = tabsSlice.actions;
export default tabsSlice.reducer;

