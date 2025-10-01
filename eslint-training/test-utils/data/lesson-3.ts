interface Lesson3TestCase {
    valid: string[];
    invalid: {
        code: string;
        errors: Array<{ messageId: string }> | number;
        output?: string;
        options?: unknown;
    }[];
}

type DataLesson3 = Record<string, Lesson3TestCase>;

export function getDataLesson3(name: string) {
    const data: DataLesson3 = {
        "test-1": {
            valid: [
                "console.error('foo');",
                "console.warn('foo');",
                "console.info('foo');",
                "const log = () => {};",
                "// console.log('foo')",
            ],
            invalid: [
                {
                    code: "console.log('foo');",
                    errors: [{ messageId: "noConsoleLog" }],
                },
                {
                    code: "console.log('foo', 42);",
                    errors: [{ messageId: "noConsoleLog" }],
                },
                {
                    code: "function getFoo() { console.log('foo'); }",
                    errors: [{ messageId: "noConsoleLog" }],
                },
                {
                    code: "const foo = 42; console.log(foo);",
                    errors: [{ messageId: "noConsoleLog" }],
                },
            ],
        },

        "test-2": {
            valid: [
                "console.log('foo');",
                "const alert = () => {};",
                "// alert('foo')",
                "window.confirm('foo');",
            ],
            invalid: [
                {
                    code: "alert('foo');",
                    errors: [{ messageId: "noAlert" }],
                },
                {
                    code: "if (foo) { alert('foo'); }",
                    errors: [{ messageId: "noAlert" }],
                },
            ],
        },

        "test-3": {
            valid: ["const foo = 42;", "let bar = 'hello';", "const { bar, baz } = foo;"],
            invalid: [
                {
                    code: "var foo = 42;",
                    errors: 1,
                },
                {
                    code: "var x = 1, y = 2;",
                    errors: 1,
                },
                {
                    code: "var foo = 'foo';",
                    errors: 1,
                },
            ],
        },

        "test-4": {
            valid: [
                "function getFoo(foo, bar, baz) {}",
                "const foo = (bar, baz) => bar + baz;",
                "function getFoo(foo) { return foo; }",
            ],
            invalid: [
                {
                    code: "function getFoo(foo, bar, baz, qux) {}",
                    errors: [{ messageId: "maxFunctionParams" }],
                },
                {
                    code: "function getFoo(foo, bar, baz, qux) { return foo; }",
                    errors: [{ messageId: "maxFunctionParams" }],
                },
            ],
        },

        "test-5": {
            valid: ['const foo = "bar";', 'const baz = "qux";', 'const quux = "";', 'const corge = "foo";'],
            invalid: [
                {
                    code: 'const foo = "this string is too long";',
                    errors: [{ messageId: "maxStringLength" }],
                },
                {
                    code: 'getFoo("this string is too long");',
                    errors: [{ messageId: "maxStringLength" }],
                },
            ],
        },

        "test-6": {
            valid: ["const foo = 42;", "function bar() {}", "let baz = 42;", "const qux = 42;"],
            invalid: [
                {
                    code: "const a = 42;",
                    errors: [{ messageId: "minIdentifierLength" }],
                },
                {
                    code: "function b() {}",
                    errors: [{ messageId: "minIdentifierLength" }],
                },
                {
                    code: "let c = 42;",
                    errors: [{ messageId: "minIdentifierLength" }],
                },
                {
                    code: "const d = 42;",
                    errors: [{ messageId: "minIdentifierLength" }],
                },
            ],
        },

        "test-7": {
            valid: [
                "const foo = 42;",
                "function getFoo() {\n  return 42;\n}",
                "// comment without trailing spaces",
            ],
            invalid: [
                {
                    code: "const foo = 42;  ",
                    errors: [{ messageId: "noTrailingSpaces" }],
                },
                {
                    code: "const foo = 42;   \nconst bar = 42;",
                    errors: [{ messageId: "noTrailingSpaces" }],
                },
                {
                    code: "function getFoo() {  \n  return 42;\n}",
                    errors: [{ messageId: "noTrailingSpaces" }],
                },
            ],
        },

        "test-8": {
            valid: ["// Short comment", "/* Block comment */", "const foo = 42; // inline comment"],
            invalid: [
                {
                    code: "// This is a very long comment .....",
                    errors: [{ messageId: "noLongComments" }],
                },
                {
                    code: "const foo = 42; // This is a very long comment .....",
                    errors: [{ messageId: "noLongComments" }],
                },
            ],
        },

        "test-9": {
            valid: ["const foo = bar + baz;", "const foo = bar - baz;", "if (foo === 42) {}"],
            invalid: [
                {
                    code: "const foo = bar+baz;",
                    errors: [{ messageId: "requireSpaceAroundOperator" }],
                },
                {
                    code: "const foo = bar-baz;",
                    errors: [{ messageId: "requireSpaceAroundOperator" }],
                },
                {
                    code: "if (foo===42) {}",
                    errors: [{ messageId: "requireSpaceAroundOperator" }],
                },
            ],
        },

        "test-10": {
            valid: ["const foo = 42;", "function getFoo() { return 42; }", "const foo = { bar: 42 };"],
            invalid: [
                {
                    code: "const foo = 42",
                    errors: 1,
                },
                {
                    code: "let foo = 42",
                    errors: 1,
                },
                {
                    code: "getFoo()",
                    errors: 1,
                },
            ],
        },
    };

    return data[name];
}
