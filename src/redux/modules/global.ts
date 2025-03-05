import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "@/redux/interface";

const globalState: GlobalState = {
    // layout mode (vertical | classic | transverse | columns)
    layout: "vertical",
    // 是否显示底部
    footer: true,
    // 是否最大化
    maximize: false,
    // 是否开启侧边栏
    isCollapse: false,
    // 是否开启暗黑主题
    isDark: false,
    // 是否开启手风琴效果
    accordion: true,
    // 是否开启侧边栏反转
    siderInverted: false,
    // 是否开启头部反转
    headerInverted: false,
    // 面包屑
    breadcrumb: true,
    // 面包屑图标
    breadcrumbIcon: true,
    // 语言
    language: "zh",
};

const globalSlice = createSlice({
  name: 'admin-global',
  initialState: globalState,
  reducers: {
    setGlobalState<T extends keyof GlobalState>(state: GlobalState, { payload }: PayloadAction<ObjToKeyValUnion<GlobalState>>) {
      state[payload.key as T] = payload.value as GlobalState[T];
    }
  }
})

export const { setGlobalState } = globalSlice.actions;
export default globalSlice.reducer;




