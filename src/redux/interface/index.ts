import { RouteObjectType } from "@/routers/interface";
import type { SizeType } from "antd/lib/config-provider/SizeContext";

export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

export type LanguageType = "zh" | "en" | null;

/* GlobalState */
export interface GlobalState {
  layout: LayoutType;
  footer: boolean;
  maximize: boolean;
  isCollapse: boolean;
  isDark: boolean;
  accordion: boolean;
  siderInverted: boolean;
  headerInverted: boolean;
  breadcrumb: boolean;
  breadcrumbIcon: boolean;
  language: LanguageType;
  themeDrawerVisible: boolean;
  menuSplit: boolean;
  isGrey: boolean;
  isWeak: boolean;
  isHappy: boolean;
  compactAlgorithm: boolean;
  borderRadius: number;
  primary: string;
  componentSize: SizeType;
  tabs: boolean;
  tabsIcon: boolean;
  tabsDrag: boolean;
}

/* tabsMenuProps */
export interface TabsListProp {
  icon: string;
  title: string;
  path: string;
  closable: boolean;
}

/* TabsState */
export interface TabsState {
  tabsList: TabsListProp[];
}

/* UserState */
export interface UserState {
  token: string;
  userInfo: {
    name: string;
  };
}

/* AuthState */
export interface AuthState {
  authMenuList: RouteObjectType[];
  showMenuList: RouteObjectType[];
  flatMenuList: RouteObjectType[];
  authButtonList: {
    [key: string]: string[];
  };
}
