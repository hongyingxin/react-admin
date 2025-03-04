import React from "react";
import { Layout } from "antd";
import ToolBarLeft from "../components/Header/ToolBarLeft";
import ToolBarRight from "../components/Header/ToolBarRight";
import LayoutMain from "../components/Main";

const { Header } = Layout;

const LayoutVertical: React.FC = () => {
  return (
    <section className="layout-vertical">
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
