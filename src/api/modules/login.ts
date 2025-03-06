// 登录相关接口
import http from "@/api";
import { AuthState } from "@/redux/interface";
import { PORT1 } from "@/api/config/servicePort";
import { ReqLogin, ResLogin } from "@/api/interface/index";

/**
 * @name AuthModule
 */
// User login
export const loginApi = (params: ReqLogin) => {
  return http.post<ResLogin>(PORT1 + `/login`, params);
};

// User logout
export const logoutApi = () => {
  return http.post(PORT1 + `/logout`, {}, { loading: true });
};

// Get menu list
export const getAuthMenuListApi = () => {
  return http.get<AuthState["authMenuList"]>(PORT1 + `/menu/list`);
};

// Get button permissions
export const getAuthButtonListApi = () => {
  return http.get<AuthState["authButtonList"]>(PORT1 + `/auth/buttons`);
};