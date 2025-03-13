import { theme, ConfigProvider, App as AppProvider } from 'antd';
import { HappyProvider } from "@ant-design/happy-work-theme";
import zhCN from 'antd/locale/zh_CN';
import RouterProvider from '@/routers';
import { useDispatch, useSelector, RootState } from '@/redux';
import { shallowEqual } from 'react-redux';

const App: React.FC = () => {

  const { isDark, primary, isHappy, componentSize, compactAlgorithm, borderRadius } = useSelector(
    (state: RootState) => ({
      isDark: state.global.isDark,
      primary: state.global.primary,
      isHappy: state.global.isHappy,
      componentSize: state.global.componentSize,
      compactAlgorithm: state.global.compactAlgorithm,
      borderRadius: state.global.borderRadius,
      language: state.global.language
    }),
    shallowEqual
  );

  // init theme algorithm
  const algorithm = () => {
    const algorithmArr = isDark ? [theme.darkAlgorithm] : [theme.defaultAlgorithm];
    // const algorithmArr = [theme.darkAlgorithm];
    if (compactAlgorithm) algorithmArr.push(theme.compactAlgorithm);
    return algorithmArr;
  };
  
  return (
    <ConfigProvider 
      locale={zhCN} 
      componentSize={componentSize} 
      theme={{
        token: { colorPrimary: primary, borderRadius },
        algorithm: algorithm()
      }}
    >
      <HappyProvider disabled={!isHappy}>
        <AppProvider>
          <RouterProvider />
        </AppProvider>
      </HappyProvider>
    </ConfigProvider>
  );
};

export default App;