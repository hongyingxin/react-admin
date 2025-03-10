import { ConfigProvider, App as AppProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import RouterProvider from '@/routers';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <AppProvider>
        <RouterProvider />
      </AppProvider>
    </ConfigProvider>
  );
};

export default App;