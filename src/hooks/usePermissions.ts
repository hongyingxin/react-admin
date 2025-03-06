import { notification } from '@/hooks/useMessage';
import { useDispatch } from '@/redux';
import { setToken } from '@/redux/modules/user';
import { setAuthButtonList, setAuthMenuList } from '@/redux/modules/auth';
import { getAuthMenuListApi, getAuthButtonListApi } from '@/api/modules/login';

/**
 * @description 获取菜单权限
 */
const usePermissions = () => {
  const dispatch = useDispatch();

  const initPermission = async (token: string) => {
    if (token) {
      try {
        // 获取按钮和菜单权限
        const { data: menuList } = await getAuthMenuListApi();
        const { data: buttonList } = await getAuthButtonListApi();
        dispatch(setAuthMenuList(menuList));
        dispatch(setAuthButtonList(buttonList));
        // 权限校验
        if (!menuList.length) {
          notification.error({
            message: '获取菜单失败',
            description: '没有菜单权限',
          });
          dispatch(setToken(''));
          return Promise.reject(new Error('没有菜单权限'));
        }
      } catch (error) {
        dispatch(setToken(''));
        return Promise.reject(error);
      }
    }
  }

  return { initPermission };
}

export default usePermissions;
