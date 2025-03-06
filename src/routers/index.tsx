import { useState, useEffect } from "react";
import { RouterProvider as Router, RouteObject, createHashRouter, createBrowserRouter } from "react-router-dom";
import { convertToDynamicRouterFormat } from "./helper/ConvertRouter";
import { wrappedStaticRouter } from "./modules/staticRouter";
import { RootState, useSelector } from "@/redux";
import { RouteObjectType } from "./interface";
import usePermissions from "@/hooks/usePermissions";
import NotFound from "@/components/Error/404";

const mode = import.meta.env.VITE_ROUTER_MODE as 'hash' | 'history';

/**
 * 路由文件入口
 */

const RouterProvider: React.FC = () => {

  const { initPermission } = usePermissions();

  const token = useSelector((state: RootState) => state.user.token);
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList);

  const [routerList, setRouterList] = useState<RouteObjectType[]>(wrappedStaticRouter);

  useEffect(() => {
    // 刷新页面时，没有菜单数据，因此需要先获取菜单数据
    if (!authMenuList.length) {
      initPermission(token);
      return
    }
    // 转换为 react-router 所需的路由结构
    const dynamicRouter = convertToDynamicRouterFormat(authMenuList);
    // 合并静态路由和动态路由
    let allRouter = [...wrappedStaticRouter, ...dynamicRouter];
    // 3. 处理 404 路由
    allRouter.forEach(item => item.path === "*" && (item.element = <NotFound />));
    // 4. 设置路由列表
    setRouterList(allRouter);
  }, [authMenuList]);

  const routerMode = {
    hash: () => createHashRouter(routerList as RouteObject[]),
    history: () => createBrowserRouter(routerList as RouteObject[])
  };

  return <Router router={routerMode[mode]()} />;
}

export default RouterProvider;