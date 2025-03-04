import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/redux/interface";

const authState: AuthState = {
  // 菜单权限列表
  authMenuList: [],
  // 菜单权限列表 ==> 左侧菜单栏渲染，需要移除 isHide == true
  showMenuList: [],
  // 菜单权限列表 ==> 扁平化一维数组菜单，主要用于添加动态路由
  flatMenuList: [],
  // 按钮权限列表
  authButtonList: {}
};

const authSlice = createSlice({
  name: 'admin-auth',
  initialState: authState,
  reducers: {
    setAuthMenuList: (state, action) => {
    },
  },
})

export const { setAuthMenuList } = authSlice.actions;
export default authSlice.reducer;
