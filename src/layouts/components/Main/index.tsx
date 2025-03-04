import React from 'react';
import { Layout } from 'antd';
import { useOutlet } from "react-router-dom";
import LayoutFooter from "../Footer";
import "./index.less";

const LayoutMain: React.FC = () => {
  const outlet = useOutlet();
  const { Content } = Layout;
  return (
    <React.Fragment>
      <Content>{outlet}</Content>
      <LayoutFooter />
    </React.Fragment>
  )
}

export default LayoutMain;

