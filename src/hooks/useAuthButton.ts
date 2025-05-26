import { RootState, useSelector } from "@/redux";
import { getMenuByPath } from "@/utils";

/**
 * @description  使用权限按钮钩子
 */
const useAuthButton = () => {
  const authButtonList = useSelector((state: RootState) => state.auth.authButtonList);

  console.log("authButtonList", authButtonList);

  const meta = getMenuByPath()?.meta ?? {};

  console.log("meta", meta);

  const currentPageAuthButton: { [key: string]: boolean } = {};

  console.log("currentPageAuthButton", currentPageAuthButton);

  authButtonList[meta.key!]?.forEach(item => (currentPageAuthButton[item] = true));

  console.log("currentPageAuthButton", currentPageAuthButton);

  return {
    BUTTONS: currentPageAuthButton
  };
};

export default useAuthButton;
