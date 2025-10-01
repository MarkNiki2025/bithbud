interface Lesson4TestCase {
    valid: string[] | { code: string }[];
    invalid: {
        code: string;
        errors: Array<{ messageId: string }> | number;
        output?: string;
        options?: unknown;
    }[];
}

type DataLesson4 = Record<string, Lesson4TestCase>;

export function getDataLesson4(name: string) {
    const data: DataLesson4 = {
        "test-1": {
            valid: [
                {
                    code: `
function getFoo(bar?: string) {
    if (!bar) {
        return undefined;
    }

    return bar;
}`,
                },
                {
                    code: `
const foo = undefined;`,
                },
                {
                    code: `
const foo: string | undefined = Math.random() > 0.5 ? "bar" : undefined;`,
                },
            ],
            invalid: [
                {
                    code: `
function getFoo(bar?: string) {
    if (!bar) {
        return null;
    }

    return bar;
}`,
                    errors: 1,
                },
                {
                    code: `
const foo = null;`,
                    errors: 1,
                },
                {
                    code: `
const foo: string | null = Math.random() > 0.5 ? "bar" : null;`,
                    errors: 1,
                },
            ],
        },

        "test-2": {
            valid: [
                {
                    code: `// This is a foo comment`,
                },
                {
                    code: `//  Here are bar spaces`,
                },
                {
                    code: `//! This is a foo directive`,
                },
                {
                    code: `//# This is a bar region`,
                },
                {
                    code: `//`,
                },
                {
                    code: `
/*
 * This is a baz block comment
 */
`,
                },
                {
                    code: `const noCommentsFoo = true;`,
                },
                {
                    code: `//// Four slashes, then a space`,
                },
            ],
            invalid: [
                {
                    code: `//noSpace`,
                    errors: 1,
                },
                {
                    code: `const foo = 42; //noSpace`,
                    errors: 1,
                },
                {
                    code: `
//Foo
//Bar
`,
                    errors: 2,
                },
            ],
        },

        "test-3": {
            valid: [
                {
                    code: `
                [1, 2, 3].forEach(bar => {
                    console.log(bar);
                });
            `,
                },
                {
                    code: `
                [1, 2, 3].forEach(bar => {
                    const foo = bar * 42;
                    const baz = qux + 42;
                    console.log(foo);
                });
            `,
                },
                {
                    code: `
                [1, 2, 3].forEach(function(bar) {
                    console.log(bar);
                });
            `,
                },
                {
                    code: `
                [1, 2, 3].forEach(function(bar) {
                    const foo = bar * 42;
                    const baz = qux + 42;
                    console.log(foo);
                });
            `,
                },
            ],

            invalid: [
                {
                    code: `
                [1, 2, 3].forEach(bar => {
                    const foo = bar * 42;
                    const baz = qux + 42;
                    console.log(foo);
                    console.log(baz);
                });
            `,
                    errors: 1,
                },
                {
                    code: `
                [1, 2, 3].forEach(function(bar) {
                    const foo = bar * 42;
                    const baz = qux + 42;
                    console.log(foo);
                    console.log(baz);
                });
            `,
                    errors: 1,
                },
            ],
        },
    };

    return data[name];
}
