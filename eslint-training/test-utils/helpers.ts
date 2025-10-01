import { test as nodeTest } from "node:test";
import { ESLint } from "eslint";
import { fileURLToPath } from "url";

export function test(name: string, fn: () => Promise<void> | void) {
    nodeTest(name, async () => {
        await fn();
    });
}

export async function getLintResult(path: string): Promise<number> {
    const eslint = new ESLint();
    const currentFilePath = fileURLToPath(path);
    const results = await eslint.lintFiles([currentFilePath]);
    const result = results[0].messages.length;
    return result;
}
