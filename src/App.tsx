import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import Login from '@/views/login';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Login />
    </ConfigProvider>
  )
}

export default App;
