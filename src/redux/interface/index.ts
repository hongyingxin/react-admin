import { RouteObjectType } from "@/routers/interface";

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
}

/* tabsMenuProps */
export interface TabsListProp {

}

/* TabsState */
export interface TabsState {

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
