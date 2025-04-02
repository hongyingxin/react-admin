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
  // 主题设置抽屉是否显示
  themeDrawerVisible: false,
  // 是否开启菜单分割
  menuSplit: true,
  // 是否开启灰色模式
  isGrey: false,
  // 是否开启弱色模式
  isWeak: false,
  // 是否开启开心模式
  isHappy: false,
  // 是否开启紧凑模式
  compactAlgorithm: false,
  // 是否开启圆角模式
  borderRadius: 4,
  // 主色调
  primary: "#1890ff",
  // 组件大小
  componentSize: "middle",
  // tabs
  tabs: true,
  // tabs icon
  tabsIcon: true,
  // tabs drag
  tabsDrag: true
};

const globalSlice = createSlice({
  name: "admin-global",
  initialState: globalState,
  reducers: {
    setGlobalState<T extends keyof GlobalState>(state: GlobalState, { payload }: PayloadAction<ObjToKeyValUnion<GlobalState>>) {
      state[payload.key as T] = payload.value as GlobalState[T];
    }
  }
});

export const { setGlobalState } = globalSlice.actions;
export default globalSlice.reducer;
