import { theme, ConfigProvider, App as AppProvider } from "antd";
import { HappyProvider } from "@ant-design/happy-work-theme";
import zhCN from "antd/locale/zh_CN";
import RouterProvider from "@/routers";
import { useSelector, RootState } from "@/redux";
import { shallowEqual } from "react-redux";

const App: React.FC = () => {
  let test = "111";
  console.log(test);
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

  // 初始化主题算法
  const algorithm = () => {
    const algorithmArr = isDark ? [theme.darkAlgorithm] : [theme.defaultAlgorithm];
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
