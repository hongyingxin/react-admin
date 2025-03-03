export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

export type LanguageType = "zh" | "en" | null;

/* GlobalState */
export interface GlobalState {

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

}
