import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

const config = [
    eslint.configs.recommended,
    {
        files: ["**/*.{js,ts}"],
        plugins: {
            "@typescript-eslint": tseslint,
        },
        languageOptions: {
            parser: parser,
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "no-undef": "off",
            "no-unused-vars": "off",
            semi: ["error", "always"],
            eqeqeq: ["error", "always"],
            "no-dupe-keys": "error",
            "no-unreachable": "error",
            "no-const-assign": "error",
            "no-cond-assign": "error",
            "no-sparse-arrays": "error",
            "no-inner-declarations": "error",
        },
    },
];

export default config;
