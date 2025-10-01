import crypto from "crypto";
import { getDataLesson1 } from "../data/lesson-1.ts";
import { ReportLesson1 } from "../types.ts";
import { ReportError } from "../reporter.js";

function hash(text: string | number) {
    return crypto.createHash("md5").update(String(text)).digest("hex");
}

export function createLesson1Validator() {
    return (testKey: string, userAnswer: string | number) => {
        const correctAnswer = getDataLesson1(testKey);

        if (correctAnswer !== hash(userAnswer)) {
            const report: ReportLesson1 = {
                type: "lesson-1",
            };

            throw new ReportError(report);
        }
    };
}
