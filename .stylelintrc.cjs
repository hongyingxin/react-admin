// @see: https://stylelint.io

module.exports = {
  root: true,
  extends: [
    // 配置 stylelint 标准扩展
    "stylelint-config-standard",
    // 配置 stylelint CSS 属性书写顺序插件
    "stylelint-config-recess-order"
  ],
  overrides: [
    // 扫描 .html/less 文件中的样式
    {
      files: ["**/*.html"],
      customSyntax: "postcss-html"
    },
    {
      files: ["**/*.less"],
      customSyntax: "postcss-less"
    }
  ],
  rules: {
    "function-url-quotes": "always", // URL 中的引号 "always": 必须有引号, "never": 不能有引号
    "color-hex-length": "long", // 指定十六进制颜色的缩写或扩展形式 "short": 缩写, "long": 扩展
    "rule-empty-line-before": "never", // 规则前是否需要空行
    "font-family-no-missing-generic-family-keyword": null, // 禁止在字体族名列表中缺少通用字体族关键字
    "no-empty-source": null, // 禁止空的源
    "selector-class-pattern": null, // 强制选择器类名的格式
    "value-no-vendor-prefix": null, // 禁用供应商前缀（用于解决多行省略 -webkit-box）
    "no-descending-specificity": null, // 禁止后出现的选择器具有比前面更低的特异性
    "custom-property-pattern": null, // 允许自定义 CSS 变量名
    "media-feature-range-notation": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"]
      }
    ]
  },
  ignoreFiles: ["**/.js", "/*.jsx", "/.tsx", "**/.ts"]
};
