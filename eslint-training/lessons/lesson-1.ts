import { test, getLintResult } from "../test-utils/helpers.js";
import { createLesson1Validator } from "../test-utils/validators/lesson-1-validator.js";

const checkAnswer = createLesson1Validator();

/*
Check the README.md file for details on how to get started with the lessons.

In this lesson, you'll start exploring ESLint by learning about the AST.
Learn more about ESLint core concepts: https://eslint.org/docs/latest/use/core-concepts/

Open https://astexplorer.net/

In the settings, select the following:
- language: "JavaScript"
- parser: "espree"
(see example: images/astexplorer-config.png)

AST (Abstract Syntax Tree) is a tree structure where each part of the code is represented by a node.

Nodes have a `type` field, for example:
- variable → `VariableDeclarator`
- function → `FunctionDeclaration`
- conditional statement → `IfStatement`
*/

test("Test 1: Variable Declaration", () => {
    // Take the code below, paste in AST Explorer and find the node type for the variable declaration of `foo`.
    // Then put the node type in the empty string in `const answer = "";`.
    const foo = "Hello World!";

    const answer = "VariableDeclarator";

    checkAnswer("test-1", answer);
});

test("Test 2: Function Declaration", () => {
    // Take the code below, paste in AST Explorer and find the node type for the entire function `getFoo`.
    // Then put the node type in the empty string in `const answer = "";`.
    function getFoo(bar) {
        return "Hello " + bar;
    }

    const answer = "FunctionDeclaration";

    checkAnswer("test-2", answer);
});

test("Test 3: Function Parameter", () => {
    // Take the code below, paste in AST Explorer and find the node type for the parameter `bar`.
    // Then put the node type in the empty string in `const answer = "";`.
    function getFoo(bar) {
        return "Hello " + bar;
    }

    const answer = "Identifier";

    checkAnswer("test-3", answer);
});

test("Test 4: Conditional Statement", () => {
    // Find the node type for the entire if-else block.
    let access: boolean;
    const user = { isAdmin: true };

    if (user.isAdmin) {
        access = true;
    } else {
        access = false;
    }

    const answer = "IfStatement";

    checkAnswer("test-4", answer);
});

test("Test 5: Expression Statement", () => {
    // Find the node type for the entire statement with `access = true;`.
    let access: boolean;
    const user = { isAdmin: true };

    if (user.isAdmin) {
        access = true;
    } else {
        access = false;
    }

    const answer = "ExpressionStatement";

    checkAnswer("test-5", answer);
});

test("Test 6: Literal Node", () => {
    // Find the node type for the string `"Welcome, admin!"`.
    let access: string;
    const user = { isAdmin: true };

    if (user.isAdmin) {
        access = "Welcome, admin!";
    } else {
        access = "Access denied";
    }

    const answer = "Literal";

    checkAnswer("test-6", answer);
});

/*
AST nodes have not only `type`, but also properties that store additional information about the code structure.

Examples of node properties:
- Variable names are stored in specific properties
- Operators are stored in their own properties
- Code blocks are stored in dedicated properties
*/

test("Test 7: Variable Name Storage", () => {
    // Find the property `name` for variable `foo`.
    const foo = "bar";

    const answer = "id";

    checkAnswer("test-7", answer);
});

test("Test 8: Binary Expression Operator", () => {
    // Find the property name that stores the `+` operator in expression `bar + baz`.
    const bar = 1;
    const baz = 2;
    const foo = bar + baz;

    const answer = "operator";

    checkAnswer("test-8", answer);
});

test("Test 9: Conditional Else Block", () => {
    // Find the property name that stores the else-block inside IfStatement node.
    let result: string;
    const isFoo = true;

    if (isFoo) {
        result = "bar";
    } else {
        result = "baz";
    }

    const answer = "alternate";

    checkAnswer("test-9", answer);
});

test("Test 10: Variable Value", () => {
    // Find the property name that stores the initializer `"bar"` in variable declaration.
    const foo = "bar";

    const answer = "init";

    checkAnswer("test-10", answer);
});

test("Test 11: Binary Expression Left Side", () => {
    // Find the property name that stores the left operand `bar` in expression `bar + baz`.
    const bar = 1;
    const baz = 2;
    const foo = bar + baz;

    const answer = "left";

    checkAnswer("test-11", answer);
});

test("Test 12: If Statement Condition", () => {
    // Find the property name that stores the condition `isFoo`.
    let result: string;
    const isFoo = true;

    if (isFoo) {
        result = "bar";
    } else {
        result = "baz";
    }

    const answer = "test";

    checkAnswer("test-12", answer);
});

test("Test 13: If Statement Then Block", () => {
    // Find the property name that stores the if-block (with `result = "bar";` assignment).
    let result: string;
    const isFoo = true;

    if (isFoo) {
        result = "bar";
    } else {
        result = "baz";
    }

    const answer = "consequent";

    checkAnswer("test-13", answer);
});

test("Test 14: Function Name", () => {
    // Find the property name that stores the function name `getFoo`.
    function getFoo(bar) {
        return "Hello " + bar;
    }

    const answer = "id";

    checkAnswer("test-14", answer);
});

test("Test 15: Function Parameters", () => {
    // Find the property name that stores the function parameters array.
    function getFoo(bar) {
        return "Hello " + bar;
    }

    const answer = "params";

    checkAnswer("test-15", answer);
});

test("Test 16: Function Body", () => {
    // Find the property name that stores the function body.
    function getFoo(bar) {
        return "Hello " + bar;
    }

    const answer = "body";

    checkAnswer("test-16", answer);
});

/*
Function calls and property access create specific node types in the AST.

Examples:
- Function calls → create nodes that store the function name and arguments
- Property access → create nodes that store the object and property being accessed
- Method calls → combine both patterns (property access + function call)
*/

test("Test 17: Function Call Node", () => {
    // Find the node type for the entire function call `getFoo("foo")`.
    function getFoo(bar) {
        return "Hello " + bar;
    }
    getFoo("foo");

    const answer = "CallExpression";

    checkAnswer("test-17", answer);
});

test("Test 18: Function Identifier in Call", () => {
    // Find the property name that stores the function identifier `getFoo` in the call expression.
    function getFoo(bar) {
        return "Hello " + bar;
    }
    getFoo("foo");

    const answer = "callee" ;

    checkAnswer("test-18", answer);
});

test("Test 19: Function Call Arguments Storage", () => {
    // Find the property name that stores the arguments in the call expression.
    function getFoo(bar) {
        return "Hello " + bar;
    }
    getFoo("foo");

    const answer = "arguments";

    checkAnswer("test-19", answer);
});

test("Test 20: Property Access Node", () => {
    // Find the node type for the property access `foo.bar`.
    const foo = { bar: "bar" };
    const bar = foo.bar;

    const answer = "MemberExpression";

    checkAnswer("test-20", answer);
});

test("Test 21: Return in functions", () => {
    // Find the node type for the `return` statement.
    function getFoo(bar) {
        return bar * 2;
    }

    const answer = "ReturnStatement";

    checkAnswer("test-21", answer);
});

/*
Install eslint extension for VScode: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Reload your VScode: `ctrl + shift + P` -> `Developer: Reload Window`.

Change your directory in terminal for current directory, for example: `cd packages/docs/internal/eslint-training`.

ESLint is a static code analysis tool that checks JavaScript code for potential errors and style violations.

ESLint reports errors with:
- Rule name: which rule was violated
- Line and column: where the error occurred
- Message: description of the problem
*/

test("Test 22: Fix basic eslint errors", async () => {
    // Fix all eslint errors.

    const PI = 3.14;

    const foo = [1, 3];

    const bar = {
        name: "foo",
        age: 42,
    };

    function checkFoo(foo) {
        if (foo === "42") {
            return foo;
        }
    }

    function checkBar(bar) {
        console.log(bar);
        return bar === "42";
    }

    const foo2 = { qux: 1, baz: 2 };
    const { qux,  baz } = foo2;

    const answer = await getLintResult(import.meta.url);
    checkAnswer("test-22", answer);
});
