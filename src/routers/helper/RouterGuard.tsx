import React, { useEffect } from "react";
import { RootState, useSelector } from "@/redux";
import { MetaProps } from "@/routers/interface";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { HOME_URL, LOGIN_URL, ROUTER_WHITE_LIST } from "@/config";

// 路由守卫组件

interface RouterGuardProps {
  children: React.ReactNode;
}

const RouterGuard: React.FC<RouterGuardProps> = props => {
  // 获取路由加载器返回的数据。
  const loader = useLoaderData();
  console.log("useLoaderData-----------", loader);
  // 编程式导航
  const navigate = useNavigate();
  // 获取当前路由路径
  const { pathname } = useLocation();
  // 将navigate挂载到window上，方便在非React组件中使用
  window.$navigate = navigate;

  const token = useSelector((state: RootState) => state.user.token);
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList);

  useEffect(() => {
    // 设置标题
    const meta = loader as MetaProps;
    if (meta) {
      const title = import.meta.env.VITE_GLOB_APP_TITLE;
      document.title = meta?.title ? `${meta.title} - ${title}` : title;
    }

    // 1. 白名单路由直接通过
    if (ROUTER_WHITE_LIST.includes(pathname)) return;

    // 2. 判断是否是登录页
    const isLoginPage = pathname === LOGIN_URL;

    // 3. 已登录且有权限时的登录页访问控制
    if (authMenuList.length && token && isLoginPage) {
      navigate(HOME_URL);
      return;
    }

    // 4. 未登录或无权限时的页面访问控制
    if ((!token && !isLoginPage) || (!authMenuList.length && !token && !isLoginPage)) {
      navigate(LOGIN_URL, { replace: true });
      return;
    }
  }, [loader]);

  return props.children;
};

export default RouterGuard;
