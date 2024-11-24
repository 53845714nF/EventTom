import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      semi: ["warn", "always"],
    },
    languageOptions: {
      globals: {
        localStorage: "readonly", // localStorage is read-only and should not be reassigned
        Storage: "readonly", 
        console: "readonly", 
        URLSearchParams: "readonly", 
      },
    },
  },
];
