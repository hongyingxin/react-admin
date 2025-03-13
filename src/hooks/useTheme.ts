import { useEffect } from "react";
import { theme } from "antd";
import { shallowEqual } from "react-redux";
import { RootState, useSelector } from "@/redux";
import { setStyleProperty } from "@/utils";
import { getLightColor, getDarkColor } from "@/utils/color";
import siderTheme from "@/styles/theme/sider";
import headerTheme from "@/styles/theme/header";
import globalTheme from "@/styles/theme/global";

type ThemeType = "light" | "inverted" | "dark";

/**
 * @description 使用钩子设置全局主题
 */
const useTheme = () => {
  const { token } = theme.useToken();

  const { isDark, primary, isGrey, isWeak, borderRadius, compactAlgorithm, siderInverted, headerInverted } = useSelector(
    (state: RootState) => ({
      isDark: state.global.isDark,
      primary: state.global.primary,
      isGrey: state.global.isGrey,
      isWeak: state.global.isWeak,
      borderRadius: state.global.borderRadius,
      compactAlgorithm: state.global.compactAlgorithm,
      siderInverted: state.global.siderInverted,
      headerInverted: state.global.headerInverted
    }),
    shallowEqual
  );

  /**
   * @description 切换暗黑模式
   */
  useEffect(() => switchDark(), [isDark]);
  const switchDark = () => {
    console.log("isDark", isDark);
    const html = document.documentElement;
    html.setAttribute("class", isDark ? "dark" : "");
    changePrimary();
  };

  /**
   * @description 切换主色调
   */
  useEffect(() => changePrimary(), [primary, borderRadius, compactAlgorithm]);
  const changePrimary = () => {
    const type: ThemeType = isDark ? "dark" : "light";
    // custom less variable
    Object.entries(globalTheme[type]).forEach(([key, val]) => {
      setStyleProperty(key, val);
    });
    // antd less variable
    Object.entries(token).forEach(([key, val]) => {
      setStyleProperty(`--hooks-${key}`, val);
    });
    // antd primaryColor less variable
    for (let i = 1; i <= 9; i++) {
      setStyleProperty(
        `--hooks-colorPrimary${i}`,
        isDark ? `${getDarkColor(primary, i / 10)}` : `${getLightColor(primary, i / 10)}`
      );
    }
  };

  /**
   * @description 切换灰度和弱色
   */
  useEffect(() => changeGreyOrWeak(), [isGrey, isWeak]);
  const changeGreyOrWeak = () => {
    const html = document.documentElement;
    html.style.filter = isWeak ? "invert(80%)" : isGrey ? "grayscale(1)" : "";
  };

  /**
   * @description 切换侧边栏主题
   */
  useEffect(() => changeSiderTheme(), [isDark, siderInverted]);
  const changeSiderTheme = () => {
    const type: ThemeType = isDark ? "dark" : siderInverted ? "inverted" : "light";
    Object.entries(siderTheme[type]).forEach(([key, val]) => setStyleProperty(key, val));
  };

  /**
   * @description 切换头部主题
   */
  useEffect(() => changeHeaderTheme(), [isDark, headerInverted]);
  const changeHeaderTheme = () => {
    const type: ThemeType = isDark ? "dark" : headerInverted ? "inverted" : "light";
    Object.entries(headerTheme[type]).forEach(([key, val]) => setStyleProperty(key, val));
  };
};

export default useTheme;
