import type { TSESTree } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";

export interface ReportLesson1 {
    type: "lesson-1";
}

interface TestCaseLesson2 {
    ast: TSESTree.Node;
    code: string;
    expected: boolean;
}

interface ReportLesson2Data extends TestCaseLesson2 {
    result: boolean;
    passed: boolean;
}

export interface ReportLesson2 {
    type: "lesson-2";
    data: ReportLesson2Data[];
}

export interface TestCaseResultLesson3 {
    code: string;
    passed: boolean;
    error?: string;
}

interface Lesson3Results {
    valid: TestCaseResultLesson3[];
    invalid: TestCaseResultLesson3[];
}

export interface ReportLesson3 {
    type: "lesson-3-4";
    data: Lesson3Results;
}

export interface TestCases {
    valid: (string | { code: string })[];
    invalid: { code: string; errors: number | { messageId: string }[] }[];
}

export type Report = ReportLesson1 | ReportLesson2 | ReportLesson3;

export type StringAnswer = string;
export type FunctionAnswer = (ast: TSESTree.Node) => boolean;
export type RuleAnswer = TSESLint.RuleModule<string, unknown[]>;

export type Lesson1Validator = (testKey: string, answer: StringAnswer) => void;
export type Lesson2Validator = (testKey: string, answer: FunctionAnswer) => void;
export type Lesson3Validator = (testKey: string, answer: RuleAnswer) => void;
export type Lesson4Validator = (testKey: string, answer: RuleAnswer) => void;
