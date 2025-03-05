import React from "react";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ToolBarLeft from "../components/Header/ToolBarLeft";
import ToolBarRight from "../components/Header/ToolBarRight";
import LayoutMain from "../components/Main";
import LayoutMenu from "../components/Menu";
import logo from "@/assets/images/logo.svg";
import "./index.less";

const { Header, Sider } = Layout;

const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE;

const LayoutVertical: React.FC = () => {

  const isCollapse = useSelector((state: RootState) => state.global.isCollapse);

  return (
    <section className="layout-vertical">
      <Sider width={200} collapsed={isCollapse}>
      <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          {!isCollapse && <h2 className="logo-text">{APP_TITLE}</h2>}
        </div>
        <LayoutMenu />
      </Sider>
      <Layout>
        <Header>
          <ToolBarLeft />
          <ToolBarRight />
        </Header>
        <LayoutMain />
      </Layout>
    </section>
  )
};

export default LayoutVertical;
