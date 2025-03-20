// 参考文档: https://www.prettier.cn

module.exports = {
  // 指定每行代码的最大长度
  printWidth: 130,
  // 指定缩进的空格数或制表符数
  tabWidth: 2,
  // 使用制表符进行缩进（true：使用制表符，false：使用空格）
  useTabs: false,
  // 在语句末尾添加分号（true：添加，false：不添加）
  semi: true,
  // 使用单引号表示字符串（true：单引号，false：双引号）
  singleQuote: false,
  // 确定对象字面量中属性名是否使用引号（"as-needed|consistent|preserve"）
  quoteProps: "as-needed",
  // 在 JSX 中使用单引号而不是双引号（true：单引号，false：双引号）
  jsxSingleQuote: false,
  // 在多行对象和数组中打印尾随逗号（"none|es5|all"）
  trailingComma: "none",
  // 在对象字面量和数组的括号之间添加空格，如 "{ foo: bar }"（true：添加，false：不添加）
  bracketSpacing: true,
  // 将 JSX 元素的 > 放在最后一行的末尾，而不是单独放在新行（true：放在末尾，false：放在新行）
  bracketSameLine: false,
  // 箭头函数只有一个参数时是否使用括号（avoid：省略括号，always：总是使用括号）
  arrowParens: "avoid",
  // 指定要使用的解析器，不需要在文件开头包含 @prettier
  requirePragma: false,
  // 在文件顶部插入一个特殊的 @format 标记，表示该文件已经被 Prettier 格式化
  insertPragma: false,
  // 控制文本如何换行（preserve：不换行）
  proseWrap: "preserve",
  // 定义 HTML 中的空格是否敏感（"css"：遵循 CSS display 属性的默认值，"strict"：空格敏感，"ignore"：空格不敏感）
  htmlWhitespaceSensitivity: "css",
  // 定义用于格式化的行尾字符（"auto|lf|crlf|cr"）
  endOfLine: "auto",
  // 这两个选项可用于格式化从给定字符偏移量开始和结束的代码（rangeStart：开始，rangeEnd：结束）
  rangeStart: 0,
  rangeEnd: Infinity
};
