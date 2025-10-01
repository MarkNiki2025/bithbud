import { RuleTester } from "@typescript-eslint/rule-tester";
import parser from "@typescript-eslint/parser";
import type { TSESLint } from "@typescript-eslint/utils";
import { getDataLesson3 } from "../data/lesson-3.ts";
import { getDataLesson4 } from "../data/lesson-4.ts";
import { ReportLesson3, TestCaseResultLesson3, TestCases } from "../types.ts";
import { ReportError } from "../reporter.js";

const RuleTesterConfig = {
    languageOptions: {
        parser,
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
} as const;

function setupRuleTesterInterceptors(
    testCases: TestCases,
    results: { valid: TestCaseResultLesson3[]; invalid: TestCaseResultLesson3[] },
) {
    let currentType: "valid" | "invalid" = "valid";
    let currentCases: any[] = [];
    let currentIndex = 0;

    RuleTester.describe = (name: string, fn: () => void) => {
        currentType = name.includes("invalid") ? "invalid" : "valid";
        currentCases = currentType === "valid" ? testCases.valid : testCases.invalid;
        currentIndex = 0;
        fn();
    };

    RuleTester.it = (name: string, fn: () => void) => {
        const caseInfo = currentCases[currentIndex++];
        const code = typeof caseInfo === "string" ? caseInfo : caseInfo.code;

        try {
            fn();
            results[currentType].push({ code, passed: true });
        } catch (error) {
            results[currentType].push({
                code,
                passed: false,
                error: error instanceof Error ? error.message : String(error),
            });
        }
    };

    RuleTester.afterAll = (fn: () => void) => fn();
}

function hasFailures(results: { valid: TestCaseResultLesson3[]; invalid: TestCaseResultLesson3[] }) {
    return results.valid.concat(results.invalid).some((r) => !r.passed);
}

function createErrorReport(results: { valid: TestCaseResultLesson3[]; invalid: TestCaseResultLesson3[] }) {
    const report: ReportLesson3 = {
        type: "lesson-3-4",
        data: results,
    };
    return new ReportError(report);
}

function validateRule(
    testKey: string,
    userRule: TSESLint.RuleModule<string, unknown[]>,
    testCases: TestCases,
) {
    const results: { valid: TestCaseResultLesson3[]; invalid: TestCaseResultLesson3[] } = {
        valid: [],
        invalid: [],
    };

    setupRuleTesterInterceptors(testCases, results);

    const ruleTester = new RuleTester(RuleTesterConfig);

    try {
        ruleTester.run(testKey, userRule, {
            valid: testCases.valid as any,
            invalid: testCases.invalid as any,
        });

        if (hasFailures(results)) {
            throw createErrorReport(results);
        }
    } catch (error) {
        if (ReportError.isReportError(error)) {
            throw error;
        }

        throw createErrorReport(results);
    }
}

export function createLesson3Validator() {
    return (testKey: string, userRule: TSESLint.RuleModule<string, unknown[]>) => {
        const testCases = getDataLesson3(testKey);
        validateRule(testKey, userRule, testCases);
    };
}

export function createLesson4Validator() {
    return (testKey: string, userRule: TSESLint.RuleModule<string, unknown[]>) => {
        const testCases = getDataLesson4(testKey);
        validateRule(testKey, userRule, testCases);
    };
}
