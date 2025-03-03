import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useSelector } from '@/redux';

import Login from '@/views/login';

const App: React.FC = () => {
  const token = useSelector((state) => state.user.token);
  console.log('token-----------------', token);
  return (
    <ConfigProvider locale={zhCN}>
      <Login />
    </ConfigProvider>
  )
}

export default App;
