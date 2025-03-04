import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import routes from '@/routers';

const RouterElement = () => {
  const element = useRoutes(routes);
  return element;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <RouterElement />
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;