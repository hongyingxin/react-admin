/**
 * @description: 检查一个值是否属于某种类型。
 */
export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * @description: 检查一个值是否为函数。
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, "Function");
}

/**
 * @description: 检查一个值是否已定义。
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

/**
 * @description: 检查一个值是否未定义。
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

/**
 * @description: 检查一个值是否为对象。
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};

/**
 * @description: 检查一个值是否为日期。
 */
export function isDate(val: unknown): val is Date {
  return is(val, "Date");
}

/**
 * @description: 检查一个值是否为数字。
 */
export function isNumber(val: unknown): val is number {
  return is(val, "Number");
}

/**
 * @description: 检查一个值是否为异步函数。
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, "AsyncFunction");
}

/**
 * @description: 检查一个值是否为Promise。
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description: 检查一个值是否为字符串。
 */
export function isString(val: unknown): val is string {
  return is(val, "String");
}

/**
 * @description: 检查一个值是否为布尔类型。
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, "Boolean");
}

/**
 * @description: 检查一个值是否为数组。
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

/**
 * @description: 检查是否为客户端。
 */
export const isClient = () => {
  return typeof window !== "undefined";
};

/**
 * @description: 检查是否为浏览器。
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

/**
 * @description: 检查是否为元素。
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

/**
 * @description: 检查一个值是否为null。
 */
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * @description: 检查一个值是否为null或未定义。
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

/**
 * @description: 检查一个值是否为十六进制颜色。
 */
export const isHexColor = (str: string) => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};
