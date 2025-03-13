import { message } from "@/hooks/useMessage";

/**
 * @description 将十六进制颜色转换为RGB颜色
 * @param {String} str 颜色值字符串
 * @returns {String} 处理后的颜色值
 */
export function hexToRgb(str: string) {
  let hexs: any = "";
  let reg = /^#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(str)) return message.warning("Enter wrong hex color value");
  str = str.replace("#", "");
  hexs = str.match(/../g);
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
  return hexs;
}

/**
 * @description 将RGB颜色转换为十六进制颜色
 * @param {*} r 红色
 * @param {*} g 绿色
 * @param {*} b 蓝色
 * @returns {String} 处理后的颜色值
 */
export function rgbToHex(r: any, g: any, b: any) {
  let reg = /^\d{1,3}$/;
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return message.warning("Enter wrong rgb color value");
  let hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
  return `#${hexs.join("")}`;
}

/**
 * @description 加深颜色值
 * @param {String} color 颜色值字符串
 * @param {Number} level 深化的程度，限制在0-1之间
 * @returns {String} 处理后的颜色值
 */
export function getDarkColor(color: string, level: number) {
  let reg = /^#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) return message.warning("Enter wrong hex color value");
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * @description 浅化颜色值
 * @param {String} color 颜色值字符串
 * @param {Number} level 深化的程度，限制在0-1之间
 * @returns {String} 处理后的颜色值
 */
export function getLightColor(color: string, level: number) {
  let reg = /^#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) message.warning("Enter wrong hex color value");
  let rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
