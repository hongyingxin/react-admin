import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    // 全局配置
    ignores: [],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        jsxPragma: "React"
      },
      globals: {
        // 全局变量设置
        browser: true,
        node: true,
        es6: true
      }
    },
    // React 相关设置
    settings: {
      react: {
        version: "detect"
      }
    },
    // 启用的插件
    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin
    },
    // ESLint 规则配置
    rules: {
      // ESLint 基础规则
      "no-var": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "no-use-before-define": "off",
      "prefer-const": "off",

      // TypeScript 特定规则
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",

      // React Hooks 规则
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off"
    }
  },
  // 继承的配置
  eslint.configs.recommended,
  tseslint.configs["recommended"],
  reactPlugin.configs["jsx-runtime"],
  reactHooksPlugin.configs.recommended,
  prettierPlugin.configs.recommended
];
