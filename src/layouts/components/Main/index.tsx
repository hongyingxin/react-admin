import React, { useEffect, createRef, useContext } from "react";
import { Layout } from "antd";
import { RefreshContext } from "@/context/Refresh";
// 防抖函数
import { useDebounceFn } from "ahooks";
import { useLocation, useOutlet } from "react-router-dom";
import { useSelector, useDispatch } from "@/redux";
import { setGlobalState } from "@/redux/modules/global";
import { RouteObjectType } from "@/routers/interface";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Maximize from "./components/Maximize";
import LayoutTabs from "@/layouts/components/Tabs";
import LayoutFooter from "../Footer";
import "./index.less";

type RouteTypeWithNodeRef = {
  nodeRef?: React.Ref<HTMLElement> | undefined;
} & RouteObjectType;

const { Content } = Layout;

const LayoutMain: React.FC = () => {
  const outlet = useOutlet();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { outletShow } = useContext(RefreshContext);

  const maximize = useSelector(state => state.global.maximize);
  const isCollapse = useSelector(state => state.global.isCollapse);
  const flatMenuList = useSelector(state => state.auth.flatMenuList);

  // 监听窗口变化，折叠菜单
  const { run } = useDebounceFn(
    () => {
      const screenWidth = document.body.clientWidth;
      const shouldCollapse = screenWidth < 1200;
      if (isCollapse !== shouldCollapse) dispatch(setGlobalState({ key: "isCollapse", value: shouldCollapse }));
    },
    { wait: 100 }
  );

  useEffect(() => {
    window.addEventListener("resize", run, false);
    return () => window.removeEventListener("resize", run);
  }, []);

  // 监听当前页面是否最大化，动态添加类名
  useEffect(() => {
    const root = document.getElementById("root") as HTMLElement;
    root.classList.toggle("main-maximize", maximize);
  }, [maximize]);

  // 解决过渡动画导致 useEffect 多次执行的问题
  // http://reactcommunity.org/react-transition-group/with-react-router
  const menuList: RouteTypeWithNodeRef[] = flatMenuList.map(item => ({ ...item, nodeRef: createRef() }));
  const { nodeRef } = menuList.find(route => route.path === pathname) ?? {};

  return (
    <React.Fragment>
      <Maximize />
      <LayoutTabs />
      <SwitchTransition>
        <CSSTransition classNames="fade" key={pathname} nodeRef={nodeRef} timeout={300} exit={false} unmountOnExit>
          <Content ref={nodeRef}>{outletShow && outlet}</Content>
        </CSSTransition>
      </SwitchTransition>
      <LayoutFooter />
    </React.Fragment>
  );
};

export default LayoutMain;
