export interface Lesson2TestCase {
    code: string;
    expected: boolean;
}

type DataLesson2 = Record<string, Lesson2TestCase[]>;

export function getDataLesson2(name: string) {
    const data: DataLesson2 = {
        "test-1": [
            {
                code: "const foo = 5;",
                expected: true,
            },
            {
                code: "let bar = 10;",
                expected: true,
            },
            {
                code: "function baz() {}",
                expected: false,
            },
        ],
        "test-2": [
            {
                code: "const foo = 5;",
                expected: true,
            },
            {
                code: "let bar = 10;",
                expected: false,
            },
            {
                code: "var baz = 15;",
                expected: false,
            },
        ],
        "test-3": [
            {
                code: "console.log('foo');",
                expected: true,
            },
            {
                code: "console.error('bar');",
                expected: false,
            },
            {
                code: "logger.log('baz');",
                expected: false,
            },
        ],
        "test-4": [
            {
                code: "const foo = 'hello';",
                expected: true,
            },
            {
                code: "const foo = 42;",
                expected: false,
            },
            {
                code: "const foo = true;",
                expected: false,
            },
        ],
        "test-5": [
            {
                code: "const foo = bar + baz;",
                expected: true,
            },
            {
                code: "const foo = bar - baz;",
                expected: false,
            },
            {
                code: "const foo = bar * baz;",
                expected: false,
            },
        ],
        "test-6": [
            {
                code: "if (foo > 0) { getFoo(); }",
                expected: true,
            },
            {
                code: "if (foo > 0) { getFoo(); } else { getBar(); }",
                expected: false,
            },
            {
                code: "while (foo > 0) { getFoo(); }",
                expected: false,
            },
        ],
        "test-7": [
            {
                code: "function getFoo() {}",
                expected: true,
            },
            {
                code: "function getFoo(bar, baz) { return bar + baz; }",
                expected: false,
            },
            {
                code: "const getFoo = () => {};",
                expected: false,
            },
        ],
        "test-8": [
            {
                code: `"foo" + "bar"`,
                expected: true,
            },
            {
                code: `"foo" + baz`,
                expected: false,
            },
            {
                code: `foo + bar`,
                expected: false,
            },
        ],
        "test-9": [
            {
                code: `export const foo = 42;`,
                expected: true,
            },
            {
                code: `export let foo = 42;`,
                expected: false,
            },
            {
                code: `const foo = 42;`,
                expected: false,
            },
        ],
        "test-10": [
            {
                code: `getFoo(foo ? bar : 42);`,
                expected: true,
            },
            {
                code: `getFoo(42);`,
                expected: false,
            },
            {
                code: `foo ? getFoo(bar) : getFoo(baz);`,
                expected: false,
            },
        ],
        "test-11": [
            {
                code: `({ ...foo, bar: 42 })`,
                expected: true,
            },
            {
                code: `({ bar: 42, baz: 99 })`,
                expected: false,
            },
            {
                code: `({})`,
                expected: false,
            },
        ],
        "test-12": [
            {
                code: "`Hello, ${foo}!`",
                expected: true,
            },
            {
                code: "`Hello, world!`",
                expected: false,
            },
            {
                code: "`Value: ${bar + baz}`",
                expected: true,
            },
        ],
        "test-13": [
            {
                code: `window.foo = "bar"`,
                expected: true,
            },
            {
                code: `app.window = "foo"`,
                expected: false,
            },
            {
                code: `foo = "bar"`,
                expected: false,
            },
        ],
    };

    return data[name];
}
