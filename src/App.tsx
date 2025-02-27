import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <div>React Admin</div>
    </ConfigProvider>
  )
}

export default App;
