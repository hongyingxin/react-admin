import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "@/redux";
import { Menu, MenuProps } from "antd";
import { RouteObjectType, MetaProps } from "@/routers/interface";
import { getOpenKeys } from "@/utils";
import { Icon } from "@/components/Icon";
import "./index.less";

interface LayoutMenuProps {
  mode: MenuProps["mode"];
  menuList?: RouteObjectType[];
  menuSplit?: boolean;
}

const LayoutMenu: React.FC<LayoutMenuProps> = ({ mode, menuSplit }) => {
  const menuList = [
    {
      path: "/home/index",
      element: "/home/index",
      meta: {
        key: "home",
        icon: "HomeOutlined",
        title: "首页",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: true
      }
    },
    {
      path: "/dataScreen/index",
      element: "/dataScreen/index",
      meta: {
        key: "dataScreen",
        icon: "PieChartOutlined",
        title: "数据大屏",
        isLink: "",
        isHide: false,
        isFull: true,
        isAffix: false
      }
    },
    {
      path: "/auth",
      redirect: "/auth/page",
      meta: {
        key: "auth",
        icon: "LockOutlined",
        title: "权限管理",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      },
      children: [
        {
          path: "/auth/page",
          element: "/auth/page/index",
          meta: {
            key: "pageMenu",
            icon: "AppstoreOutlined",
            title: "页面权限",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/auth/button",
          element: "/auth/button/index",
          meta: {
            key: "authButton",
            icon: "AppstoreOutlined",
            title: "按钮权限",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        }
      ]
    },
    {
      path: "/assembly",
      redirect: "/assembly/guide",
      meta: {
        key: "assembly",
        icon: "MedicineBoxOutlined",
        title: "常用组件",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      },
      children: [
        {
          path: "/assembly/guide",
          element: "/assembly/guide/index",
          meta: {
            key: "guide",
            icon: "AppstoreOutlined",
            title: "引导页",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/assembly/echarts",
          element: "/assembly/echarts/index",
          meta: {
            key: "echarts",
            icon: "AppstoreOutlined",
            title: "ECharts",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/assembly/svgIcon",
          element: "/assembly/svgIcon/index",
          meta: {
            key: "svgIcon",
            icon: "AppstoreOutlined",
            title: "SVG 图标",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/assembly/statistic",
          element: "/assembly/statistic/index",
          meta: {
            key: "statistic",
            icon: "AppstoreOutlined",
            title: "统计数值",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/assembly/qrCode",
          element: "/assembly/qrCode/index",
          meta: {
            key: "qrCode",
            icon: "AppstoreOutlined",
            title: "二维码",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/assembly/watermark",
          element: "/assembly/watermark/index",
          meta: {
            key: "watermark",
            icon: "AppstoreOutlined",
            title: "水印",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        }
      ]
    },
    {
      path: "/feat",
      redirect: "/feat/tabs",
      meta: {
        key: "feat",
        icon: "ControlOutlined",
        title: "常用功能",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      },
      children: [
        {
          path: "/feat/tabs",
          element: "/feat/tabs/index",
          meta: {
            key: "tabs",
            icon: "AppstoreOutlined",
            title: "标签栏",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          },
          children: []
        },
        {
          path: "/feat/breadcrumb",
          redirect: "/feat/breadcrumb/flat",
          meta: {
            key: "breadcrumb",
            icon: "AppstoreOutlined",
            title: "面包屑",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          },
          children: [
            {
              path: "/feat/breadcrumb/flat",
              element: "/feat/breadcrumb/flat/index",
              meta: {
                key: "breadcrumbFlat",
                icon: "AppstoreOutlined",
                title: "平级模式",
                isLink: "",
                isHide: false,
                isFull: false,
                isAffix: false
              }
            },
            {
              path: "/feat/breadcrumb/children",
              element: "/feat/breadcrumb/children/index",
              meta: {
                key: "breadcrumbChildren",
                icon: "AppstoreOutlined",
                title: "层级模式",
                isLink: "",
                isHide: false,
                isFull: false,
                isAffix: false
              },
              children: []
            }
          ]
        },
        {
          path: "/feat/globalization",
          element: "/feat/globalization/index",
          meta: {
            key: "globalization",
            icon: "AppstoreOutlined",
            title: "国际化",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/feat/clipboard",
          element: "/feat/clipboard/index",
          meta: {
            key: "clipboard",
            icon: "AppstoreOutlined",
            title: "剪贴板",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/feat/colorPicker",
          element: "/feat/colorPicker/index",
          meta: {
            key: "colorPicker",
            icon: "AppstoreOutlined",
            title: "取色器",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        }
      ]
    },
    {
      path: "/list",
      redirect: "/list/useProTable",
      meta: {
        key: "list",
        icon: "TableOutlined",
        title: "列表页面",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      },
      children: [
        {
          path: "/list/useProTable",
          element: "/list/useProTable/index",
          meta: {
            key: "useProTable",
            icon: "AppstoreOutlined",
            title: "使用 ProTable",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/list/useEditTable",
          element: "/list/useEditTable/index",
          meta: {
            key: "useEditTable",
            icon: "AppstoreOutlined",
            title: "使用 EditTable",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/list/useDragTable",
          element: "/list/useDragTable/index",
          meta: {
            key: "useDragTable",
            icon: "AppstoreOutlined",
            title: "使用 DragTable",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/list/useProList",
          element: "/list/useProList/index",
          meta: {
            key: "ProList",
            icon: "AppstoreOutlined",
            title: "使用 ProList",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        }
      ]
    },
    {
      path: "/form",
      redirect: "/form/basicForm",
      meta: {
        key: "form",
        icon: "FormOutlined",
        title: "表单页面",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      },
      children: [
        {
          path: "/form/basicForm",
          element: "/form/basicForm/index",
          meta: {
            key: "basicForm",
            icon: "AppstoreOutlined",
            title: "基础表单",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/form/stepForm",
          element: "/form/stepForm/index",
          meta: {
            key: "stepForm",
            icon: "AppstoreOutlined",
            title: "分步表单",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/form/advancedForm",
          element: "/form/advancedForm/index",
          meta: {
            key: "advancedForm",
            icon: "AppstoreOutlined",
            title: "高级表单",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        }
      ]
    },
    {
      path: "/details",
      redirect: "/details/basicDetails",
      meta: {
        key: "details",
        icon: "ProfileOutlined",
        title: "详情页面",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      },
      children: [
        {
          path: "/details/basicDetails",
          element: "/details/basicDetails/index",
          meta: {
            key: "basicDetails",
            icon: "AppstoreOutlined",
            title: "基础详情页",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        }
      ]
    },
    {
      path: "/result",
      redirect: "/result/success",
      meta: {
        key: "result",
        icon: "CheckCircleOutlined",
        title: "结果页面",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      },
      children: [
        {
          path: "/result/success",
          element: "/result/success/index",
          meta: {
            key: "success",
            icon: "AppstoreOutlined",
            title: "成功页",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/result/fail",
          element: "/result/fail/index",
          meta: {
            key: "fail",
            icon: "AppstoreOutlined",
            title: "失败页",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/result/warning",
          element: "/result/warning/index",
          meta: {
            key: "warning",
            icon: "AppstoreOutlined",
            title: "警告页",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/result/info",
          element: "/result/info/index",
          meta: {
            key: "info",
            icon: "AppstoreOutlined",
            title: "信息页",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        }
      ]
    },
    {
      path: "/menu",
      redirect: "/menu/menu1",
      meta: {
        key: "menu",
        icon: "ProfileOutlined",
        title: "菜单嵌套",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      },
      children: [
        {
          path: "/menu/menu1",
          element: "/menu/menu1/index",
          meta: {
            key: "menu1",
            icon: "AppstoreOutlined",
            title: "菜单1",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/menu/menu2",
          redirect: "/menu/menu2/menu21",
          meta: {
            key: "menu2",
            icon: "AppstoreOutlined",
            title: "菜单2",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          },
          children: [
            {
              path: "/menu/menu2/menu21",
              element: "/menu/menu2/menu21/index",
              meta: {
                key: "menu21",
                icon: "AppstoreOutlined",
                title: "菜单2-1",
                isLink: "",
                isHide: false,
                isFull: false,
                isAffix: false
              }
            },
            {
              path: "/menu/menu2/menu22",
              redirect: "/menu/menu2/menu22/menu221",
              meta: {
                key: "menu22",
                icon: "AppstoreOutlined",
                title: "菜单2-2",
                isLink: "",
                isHide: false,
                isFull: false,
                isAffix: false
              },
              children: [
                {
                  path: "/menu/menu2/menu22/menu221",
                  element: "/menu/menu2/menu22/menu221/index",
                  meta: {
                    key: "menu221",
                    icon: "AppstoreOutlined",
                    title: "菜单2-2-1",
                    isLink: "",
                    isHide: false,
                    isFull: false,
                    isAffix: false
                  }
                },
                {
                  path: "/menu/menu2/menu22/menu222",
                  element: "/menu/menu2/menu22/menu222/index",
                  meta: {
                    key: "menu222",
                    icon: "AppstoreOutlined",
                    title: "菜单2-2-2",
                    isLink: "",
                    isHide: false,
                    isFull: false,
                    isAffix: false
                  }
                }
              ]
            },
            {
              path: "/menu/menu2/menu23",
              element: "/menu/menu2/menu23/index",
              meta: {
                key: "menu23",
                icon: "AppstoreOutlined",
                title: "菜单2-3",
                isLink: "",
                isHide: false,
                isFull: false,
                isAffix: false
              }
            }
          ]
        },
        {
          path: "/menu/menu3",
          element: "/menu/menu3/index",
          meta: {
            key: "menu3",
            icon: "AppstoreOutlined",
            title: "菜单3",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        }
      ]
    },
    {
      path: "/system",
      redirect: "/system/accountManage",
      meta: {
        key: "system",
        icon: "SettingOutlined",
        title: "系统管理",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      },
      children: [
        {
          path: "/system/accountManage",
          element: "/system/accountManage/index",
          meta: {
            key: "accountManage",
            icon: "AppstoreOutlined",
            title: "账号管理",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/system/roleManage",
          element: "/system/roleManage/index",
          meta: {
            key: "roleManage",
            icon: "AppstoreOutlined",
            title: "角色管理",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/system/menuMange",
          element: "/system/menuMange/index",
          meta: {
            key: "menuMange",
            icon: "AppstoreOutlined",
            title: "菜单管理",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        }
      ]
    },
    {
      path: "/link",
      redirect: "/link/bing",
      meta: {
        key: "link",
        icon: "PaperClipOutlined",
        title: "外部链接",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      },
      children: [
        {
          path: "/link/bing",
          element: "/link/bing/index",
          meta: {
            key: "bing",
            icon: "AppstoreOutlined",
            title: "Bing 内嵌",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/link/gitee",
          element: "/link/gitee/index",
          meta: {
            key: "gitee",
            icon: "AppstoreOutlined",
            title: "Gitee 仓库",
            isLink: "https://gitee.com/HalseySpicy/Hooks-Admin",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/link/github",
          element: "/link/github/index",
          meta: {
            key: "github",
            icon: "AppstoreOutlined",
            title: "GitHub 仓库",
            isLink: "https://github.com/HalseySpicy/Hooks-Admin",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        },
        {
          path: "/link/juejin",
          element: "/link/juejin/index",
          meta: {
            key: "juejin",
            icon: "AppstoreOutlined",
            title: "JueJin 主页",
            isLink: "https://juejin.cn/user/3263814531551816/posts",
            isHide: false,
            isFull: false,
            isAffix: false
          }
        }
      ]
    },
    {
      path: "/about/index",
      element: "/about/index",
      meta: {
        key: "about",
        icon: "ExclamationCircleOutlined",
        title: "关于项目",
        isLink: "",
        isHide: false,
        isFull: false,
        isAffix: false
      }
    }
  ];
  // 获取当前路由匹配信息，包含从根路由到当前路由的所有层级
  const matches = useMatches();
  // 获取路由导航函数，用于编程式导
  const navigate = useNavigate();
  // 获取当前路由信息，包含当前 URL 的路径
  const { pathname } = useLocation();

  const { layout, isDark, accordion, isCollapse, siderInverted, headerInverted, showMenuList, flatMenuList } = useSelector(
    (state: RootState) => ({
      layout: state.global.layout,
      isDark: state.global.isDark,
      accordion: state.global.accordion,
      isCollapse: state.global.isCollapse,
      siderInverted: state.global.siderInverted,
      headerInverted: state.global.headerInverted,
      showMenuList: state.auth.showMenuList,
      flatMenuList: state.auth.flatMenuList
    }),
    shallowEqual
  );

  // 菜单展开的 key 值
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // 菜单选中的 key 值
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // 菜单分割选中的 key 值
  const [splitSelectedKeys, setSplitSelectedKeys] = useState<string[]>([]);

  // 菜单项类型
  type MenuItem = Required<MenuProps>["items"][number];

  // 获取菜单项
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  }

  // 将路由配置转换为 Ant Design 菜单格式
  const handleMenuAsAntdFormat = (list: RouteObjectType[]): MenuItem[] => {
    return list.map(item => {
      return !item?.children?.length
        ? getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />)
        : getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />, handleMenuAsAntdFormat(item.children!));
    });
  };

  // 将路由配置转换为 Ant Design 菜单格式
  const antdMenuList = useMemo(() => handleMenuAsAntdFormat(menuList ?? showMenuList), [menuList, showMenuList]);

  // 设置选中的 key
  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    const path = meta?.activeMenu ?? pathname;
    setSelectedKeys([path]);

    // 设置分割选中的 key（找到可以表示子级的 key）
    const splitPath = `/${path.split("/")[1]}`;
    const splitKeys = showMenuList.find(item => item.path === splitPath) ? splitPath : path;
    setSplitSelectedKeys([splitKeys]);

    // 使用 setTimeout 防止菜单展开时出现样式异常
    if (accordion) setTimeout(() => isCollapse || setOpenKeys(getOpenKeys(pathname)));
  }, [matches, isCollapse]);

  // 菜单展开变化
  const onOpenChange: MenuProps["onOpenChange"] = openKeys => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  // 菜单导航
  const handleMenuNavigation = (path: string) => {
    const menuItem = flatMenuList.find(item => item.path === path);
    if (menuItem?.meta?.isLink) window.open(menuItem.meta.isLink, "_blank");
    navigate(path);
  };

  // 点击菜单
  const clickMenu: MenuProps["onClick"] = ({ key }) => {
    // 如果不是分割菜单
    if (!menuSplit) return handleMenuNavigation(key);

    // 如果是分割菜单
    const children = showMenuList.find(item => item.path === key)?.children;
    if (children?.length) return handleMenuNavigation(children[0].path!);
    handleMenuNavigation(key);
  };

  // 是否经典布局
  const isClassicLayout = useMemo(() => layout === "classic", [layout]);
  // 是否横向布局
  const isTransverseLayout = useMemo(() => layout === "transverse", [layout]);
  // 是否暗黑主题
  const isDarkTheme = useMemo(() => {
    if (isDark) return true;
    if (headerInverted && isTransverseLayout) return true;
    if (headerInverted && isClassicLayout && menuSplit) return true;
    if (siderInverted && !isTransverseLayout && !menuSplit) return true;
    return false;
  }, [layout, isDark, headerInverted, siderInverted, menuSplit]);

  return (
    <Menu
      theme={isDarkTheme ? "dark" : "light"}
      mode={mode}
      selectedKeys={menuSplit ? splitSelectedKeys : selectedKeys}
      onClick={clickMenu}
      items={antdMenuList}
      {...(!isTransverseLayout && accordion && { openKeys, onOpenChange })}
    />
  );
};

export default LayoutMenu;
