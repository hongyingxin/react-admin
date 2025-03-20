import { Navigate } from "react-router-dom";
import { HOME_URL, LOGIN_URL } from "@/config";
import { RouteObjectType } from "@/routers/interface";
import { Loading } from "@/components/Loading";
import RouterGuard from "@/routers/helper/RouterGuard";
import Login from "@/views/login/index";
import NotFound from "@/components/Error/404";
import NotAuth from "@/components/Error/403";
import NotNetwork from "@/components/Error/500";

// 静态路由
const staticRouter: RouteObjectType[] = [
  {
    path: "/",
    element: <Navigate to={HOME_URL} />
  },
  {
    path: LOGIN_URL,
    element: <Login />,
    meta: {
      title: "登录"
    }
  },
  // 异常路由
  {
    path: "403",
    element: <NotAuth />,
    meta: {
      title: "403"
    }
  },
  {
    path: "404",
    element: <NotFound />,
    meta: {
      title: "404"
    }
  },
  {
    path: "500",
    element: <NotNetwork />,
    meta: {
      title: "500"
    }
  },
  // 先设置 <Loading /> 组件以防止页面刷新时出现 404
  {
    path: "*",
    element: <Loading />
  }
];

// 用高阶组件包裹静态路由
export const wrappedStaticRouter = staticRouter.map(route => {
  return {
    ...route,
    element: <RouterGuard>{route.element}</RouterGuard>,
    loader: () => {
      return {
        ...route.meta
      };
    }
  };
});
