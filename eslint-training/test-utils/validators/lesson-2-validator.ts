import { parse } from "espree";
import type { TSESTree } from "@typescript-eslint/types";
import { getDataLesson2 } from "../data/lesson-2.ts";
import { ReportLesson2 } from "../types.ts";
import { ReportError } from "../reporter.js";

function parseCode(code: string) {
    return parse(code, {
        ecmaVersion: "latest",
        sourceType: "module",
    }) as TSESTree.Node;
}

function getTestCasesLesson2(testKey: string) {
    const testData = getDataLesson2(testKey);

    return testData.map((testCase) => {
        const ast = parseCode(testCase.code);

        return {
            ast: ast,
            code: testCase.code,
            expected: testCase.expected,
        };
    });
}

export function createLesson2Validator() {
    return (testKey: string, userAnswer: (ast: TSESTree.Node) => boolean) => {
        const testCases = getTestCasesLesson2(testKey);
        const report: ReportLesson2 = {
            type: "lesson-2",
            data: [],
        };

        for (const testCase of testCases) {
            const result = userAnswer(testCase.ast);

            report.data.push({
                ...testCase,
                result,
                passed: result === testCase.expected,
            });
        }

        if (report.data.some((t) => !t.passed)) {
            throw new ReportError(report);
        }
    };
}
