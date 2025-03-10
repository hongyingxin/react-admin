import { lazy } from 'react';
import { getFlatMenuList } from '@/utils';
import { Navigate } from 'react-router-dom';
import { RouteObjectType } from '@/routers/interface';
import RouterGuard from './RouterGuard';
import LayoutIndex from '@/layouts';
import LazyComponent from '@/components/Lazy';

// 动态路由转换

// 动态导入路由
const modules = import.meta.glob('@/views/**/*.tsx') as Record<string, Parameters<typeof lazy>[number]>;

/**
 * @description 将菜单列表转换为 react-router 所需的格式
 * @param {Array} authMenuList 权限菜单列表
 * @returns {Array} react-router 所需的路由格式
 */
export const convertToDynamicRouterFormat = (authMenuList: RouteObjectType[]) => {
  // 1. 扁平化路由
  const flatMenuList = getFlatMenuList(authMenuList);

  // 2. 处理每个路由项
  const handleMenuList = flatMenuList.map((item) => {

    item.children && delete item.children;

    // 处理重定向
    if (item.redirect) item.element = <Navigate to={item.redirect} />;

    // 动态导入组件
    if (item.element && typeof item.element === 'string') {
      const Component = LazyComponent(lazy(modules['/src/views' + item.element + '.tsx']))
      item.element = <RouterGuard>{Component}</RouterGuard>
    }

    // 设置loader
    item.loader = () => {
      return {
        ...item.meta,
        redirect: !!item.redirect,
      }
    }

    return item;
  })

  // 3. 构建最终路由结构
  const dynamicRouter: RouteObjectType[] = [{ element: <LayoutIndex />, children: [] }]

  // 4. 添加到动态路由
  handleMenuList.forEach((item) => {
    if (item.meta?.isFull) dynamicRouter.push(item)
    else dynamicRouter[0].children?.push(item)
  })

  return dynamicRouter;
}
