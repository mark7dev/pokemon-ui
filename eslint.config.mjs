import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    "node_modules/**",
    "jest.config.js",
    "jest.setup.js",
    "*.config.js",
    "*.config.mjs",
  ]),
  {
    rules: {
      // Allow setState in useEffect for mounting patterns (common in Next.js)
      "react-hooks/set-state-in-effect": "off",
      // Allow components without displayName
      "react/display-name": ["warn", { "ignoreTranspilerName": true }],
      // Allow unused vars starting with underscore
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
        },
      ],
      // Allow any type with warning
      "@typescript-eslint/no-explicit-any": ["warn", { "ignoreRestArgs": true }],
      // Allow require in config files
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    // Apply different rules for test files
    files: ["**/*.test.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
    rules: {
      "react/display-name": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);

export default eslintConfig;
