// @ts-check

/**
 * @typedef {import('./types.ts').Report} Report
 * @typedef {import('./types.ts').ReportLesson2} ReportLesson2
 * @typedef {import('./types.ts').ReportLesson3} ReportLesson3
 * @typedef {import('node:test/reporters').TestEvent} TestEvent
 */

export class ReportError extends Error {
    /**
     * @param {Report} report
     */
    constructor(report) {
        super(`Test failed: ${report.type}`);
        this.name = "ReportError";
        /** @type {Report} */
        this.report = report;
    }

    /**
     * @param {unknown} error
     * @returns {error is ReportError}
     */
    static isReportError(error) {
        return typeof error === "object" && error !== null && "report" in error;
    }

    /**
     * @param {unknown} error
     * @returns {Report | null}
     */
    static getReport(error) {
        return ReportError.isReportError(error) ? error.report : null;
    }
}

const colors = {
    green: "\x1b[92m",
    red: "\x1b[91m",
    blue: "\x1b[94m",
    yellow: "\x1b[33m",
    gray: "\x1b[90m",
    reset: "\x1b[0m",
};

/**
 * @param {string} code
 */
function isMultiline(code) {
    return code.includes("\n");
}

/**
 * @param {ReportLesson2} report
 * @returns {string}
 */
function formatLesson2Report(report) {
    const header = `\n    ${"Test case".padEnd(60, " ")} ${"Expected".padEnd(10, " ")} ${"Got".padEnd(
        10,
        " ",
    )}\n`;
    const separator = `    ${"-".repeat(60)} ${"-".repeat(10)} ${"-".repeat(10)}\n`;

    let output = `${header}${separator}`;

    for (const testCase of report.data) {
        const code = testCase.code.padEnd(60, " ");
        const expected = String(testCase.expected).padEnd(10, " ");
        const result = String(testCase.result).padEnd(10, " ");
        const status = testCase.passed ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;

        output += `    ${colors.blue}${code}${colors.reset} ${colors.gray}${expected}${colors.reset} ${colors.yellow}${result}${colors.reset} ${status}\n`;
    }

    output += "\n";
    return output;
}

/**
 * @param {ReportLesson3} report
 * @returns {string}
 */
// function formatLesson3Report(report) {
//     let output = "";

//     if (report.data.valid.length > 0) {
//         output += `    valid cases:\n`;
//         for (const testCase of report.data.valid) {
//             const code = testCase.code.padEnd(55, " ");
//             const status = testCase.passed
//                 ? `${colors.green}✓${colors.reset}`
//                 : `${colors.red}✗${colors.reset}`;
//             output += `        ${colors.blue}${code}${colors.reset} ${status}\n`;
//         }
//         output += "\n";
//     }

//     if (report.data.invalid.length > 0) {
//         output += `    invalid cases:\n`;
//         for (const testCase of report.data.invalid) {
//             const code = testCase.code.padEnd(55, " ");
//             const status = testCase.passed
//                 ? `${colors.green}✓${colors.reset}`
//                 : `${colors.red}✗${colors.reset}`;
//             output += `        ${colors.blue}${code}${colors.reset} ${status}\n`;
//         }
//         output += "\n";
//     }

//     return output;
// }

/**
 * @param {ReportLesson3} report
 * @returns {string}
 */
function formatLesson3Report(report) {
    let output = "\n";

    if (report.data.valid.length > 0) {
        output += `    valid cases:\n`;
        for (const testCase of report.data.valid) {
            const status = testCase.passed
                ? `${colors.green}✓${colors.reset}`
                : `${colors.red}✗${colors.reset}`;

            if (isMultiline(testCase.code)) {
                output += `        ${status}\n`;
                const lines = testCase.code.split("\n");
                for (const line of lines) {
                    output += `        ${colors.blue}${line}${colors.reset}\n`;
                }
                output += "\n";
            } else {
                const code = testCase.code.padEnd(60, " ");
                output += `        ${colors.blue}${code}${colors.reset} ${status}\n`;
            }
        }
        output += "\n";
    }

    if (report.data.invalid.length > 0) {
        output += `    invalid cases:\n`;
        for (const testCase of report.data.invalid) {
            const status = testCase.passed
                ? `${colors.green}✓${colors.reset}`
                : `${colors.red}✗${colors.reset}`;

            if (isMultiline(testCase.code)) {
                output += `        ${status}\n`;
                const lines = testCase.code.split("\n");
                for (const line of lines) {
                    output += `        ${colors.blue}${line}${colors.reset}\n`;
                }
                output += "\n";
            } else {
                const code = testCase.code.padEnd(60, " ");
                output += `        ${colors.blue}${code}${colors.reset} ${status}\n`;
            }
        }
        output += "\n";
    }

    return output;
}

/**
 * @param {Report} report
 * @returns {string}
 */
function formatReport(report) {
    switch (report.type) {
        case "lesson-1":
            return "";

        case "lesson-2":
            return formatLesson2Report(report);

        case "lesson-3-4":
            return formatLesson3Report(report);

        default:
            return "";
    }
}

/**
 * @param {AsyncIterable<TestEvent>} source
 * @returns {AsyncGenerator<string, void, unknown>}
 */
export default async function* reporter(source) {
    let passed = 0;
    let failed = 0;

    for await (const event of source) {
        if (event.type === "test:stdout") {
            yield `${colors.gray}${event.data.message}${colors.reset}`;
        }

        if (event.type === "test:pass") {
            passed++;
            yield `${colors.green}✓ ${event.data.name}${colors.reset}\n`;
        } else if (event.type === "test:fail") {
            failed++;
            yield `${colors.red}✗ ${event.data.name}${colors.reset}\n`;

            const error = event.data.details.error;
            const actualError = error.cause || error;
            const report = ReportError.getReport(actualError);

            if (!report) {
                continue;
            }

            const formattedReport = formatReport(report);

            if (formattedReport) {
                yield formattedReport;
            }
        }
    }

    yield `\nTotal: ${passed + failed} | ${colors.green}Passed:${colors.reset} ${passed} | ${
        colors.red
    }Failed:${colors.reset} ${failed}\n`;
}
