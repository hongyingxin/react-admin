import { RouteObjectType } from "@/routers/interface";
/**
 * @description Get the corresponding greeting for the current time.
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
 * @description Get the subMenu keys that need to be expanded.
 * @param {String} path - The current path.
 * @returns {Array}
 */
export function getOpenKeys(path: string): string[] {
  let currentKey: string = "";
  let openKeys: string[] = [];
  const pathSegments: string[] = path.split("/").map((segment: string) => "/" + segment);
  for (let i: number = 1; i < pathSegments.length - 1; i++) {
    currentKey += pathSegments[i];
    openKeys.push(currentKey);
  }
  return openKeys;
}

/**
 * @description Use recursion to find all breadcrumbs and store them in redux.
 * @param {Array} menuList - The menu list.
 * @param {Array} parent - The parent menu.
 * @param {Object} result - The processed result.
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
 * @description Obtain the first level menu
 * @param {RouteObjectType[]} menuList - The menu list.
 * @returns {RouteObjectType[]}
 */
export function getFirstLevelMenuList(menuList: RouteObjectType[]) {
  return menuList.map(item => {
    return { ...item, children: undefined };
  });
}

/**
 * @description Flatten the menu using recursion for easier addition of dynamic routes.
 * @param {Array} menuList - The menu list.
 * @returns {Array}
 */
export function getFlatMenuList(menuList: RouteObjectType[]): RouteObjectType[] {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

/**
 * @description Use recursion to filter out the menu items that need to be rendered in the left menu (excluding menus with isHide == true).
 * @param {Array} menuList - The menu list.
 * @returns {Array}
 */
export function getShowMenuList(menuList: RouteObjectType[]) {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter(item => {
    if (item.children) {
      item.children = getShowMenuList(item.children);
    }
    return !item.meta?.isHide;
  });
}