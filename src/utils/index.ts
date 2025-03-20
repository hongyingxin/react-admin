import { store } from "@/redux";
// import { ResPage } from "@/api/interface";
import { RouteObjectType } from "@/routers/interface";
// import { RequestData } from "@ant-design/pro-components";

const mode = import.meta.env.VITE_ROUTER_MODE;

/**
 * @description 获取当前时间的问候语。
 * @returns {String}
 */
export function getTimeState() {
  let timeNow = new Date();
  let hours = timeNow.getHours();
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
  if (hours >= 10 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {Number}
 */
export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}

/**
 * @description 设置样式属性
 * @param {String} key - 样式属性名
 * @param {String} val - 样式属性值
 */
export function setStyleProperty(key: string, val: string) {
  document.documentElement.style.setProperty(key, val);
}

/**
 * @description 将3位HEX颜色代码转换为6位代码。
 * @returns {String}
 */
export function convertToSixDigitHexColor(str: string) {
  if (str.length > 4) return str.toLocaleUpperCase();
  else return (str[0] + str[1] + str[1] + str[2] + str[2] + str[3] + str[3]).toLocaleUpperCase();
}

/**
 * @description 获取浏览器默认语言。
 * @returns {String}
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) defaultBrowserLang = "zh";
  else defaultBrowserLang = "en";
  return defaultBrowserLang;
}

/**
 * @description 使用递归展平菜单，以便更容易添加动态路由。
 * @param {Array} menuList - 菜单列表。
 * @returns {Array}
 */
export function getFlatMenuList(menuList: RouteObjectType[]): RouteObjectType[] {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单中的菜单项（排除isHide == true的菜单）。
 * @param {Array} menuList - 菜单列表。
 * @returns {Array}
 */
export function getShowMenuList(menuList: RouteObjectType[]) {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

/**
 * @description 获取一级菜单。
 * @param {RouteObjectType[]} menuList - 菜单列表。
 * @returns {RouteObjectType[]}
 */
export function getFirstLevelMenuList(menuList: RouteObjectType[]) {
  return menuList.map(item => {
    return { ...item, children: undefined };
  });
}

/**
 * @description 获取一个具有路径的菜单对象。
 * @param {Array} menulist - 要搜索的菜单对象列表。
 * @param {string} path - 要与菜单对象的路径匹配的路径。
 * @returns {Object} 匹配的菜单对象或null（如果没有匹配）。
 */
export function getMenuByPath(
  menulist: RouteObjectType[] = store.getState().auth.flatMenuList,
  path: string = getUrlWithParams()
) {
  const menuItem = menulist.find(menu => {
    // 通过正则表达式匹配动态路由
    const regex = new RegExp(`^${menu.path?.replace(/:.[^/]*/, ".*")}$`);
    return regex.test(path);
  });
  return menuItem || {};
}

/**
 * @description 使用递归查找所有面包屑并将其存储在redux中。
 * @param {Array} menuList - 菜单列表。
 * @param {Array} parent - 父菜单。
 * @param {Object} result - 处理后的结果。
 * @returns {Object}
 */
export function getAllBreadcrumbList(
  menuList: RouteObjectType[],
  parent: RouteObjectType[] = [],
  result: { [key: string]: RouteObjectType[] } = {}
) {
  for (const item of menuList) {
    result[item.meta!.key!] = [...parent, item];
    if (item.children) getAllBreadcrumbList(item.children, result[item.meta!.key!], result);
  }
  return result;
}

/**
 * @description 获取相对URL与参数。
 * @returns {String}
 */
export function getUrlWithParams() {
  const url = {
    hash: location.hash.substring(1),
    history: location.pathname + location.search
  };
  return url[mode as keyof typeof url];
}

/**
 * @description 获取需要展开的子菜单键。
 * @param {String} path - 当前路径。
 * @returns {Array}
 */
export function getOpenKeys(path: string): string[] {
  let currentKey: string = "";
  let openKeys: string[] = [];
  let pathSegments: string[] = path.split("/").map((segment: string) => "/" + segment);
  for (let i: number = 1; i < pathSegments.length - 1; i++) {
    currentKey += pathSegments[i];
    openKeys.push(currentKey);
  }
  return openKeys;
}

/**
 * @description 格式化服务器返回的数据以供ProTable组件使用。
 * @param {Object} data - 服务器返回的数据。
 * @returns {Object}
 */
// export function formatDataForProTable<T>(data: ResPage<T>): Partial<RequestData<T>> {
//   return {
//     success: true,
//     data: data.list,
//     total: data.total
//   };
// }

/**
 * @description 一个函数，用于执行一段代码并防止在浏览器中进行调试。
 * @returns {number} - 可以用于停止执行的setInterval的ID。
 */
export function blockDebugger() {
  function innerFunction() {
    try {
      // 使用不寻常的语法调用"debugger"语句以防止调试
      (function () {
        return false;
      })
        ["constructor"]("debugger")
        ["call"]();
    } catch (err) {
      console.log("Debugger is blocked", err);
    }
  }
  // 使用setInterval开始执行并返回间隔ID
  return setInterval(innerFunction, 50);
}
