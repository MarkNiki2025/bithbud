import type { TSESTree } from "@typescript-eslint/types";
import { test } from "../test-utils/helpers.ts";
import { createLesson2Validator } from "../test-utils/validators/lesson-2-validator.ts";
const checkAnswer = createLesson2Validator();

/*
In this lesson, you'll practice writing small predicate functions that help identify specific AST nodes.
Such helpers are often used inside ESLint rules to analyze code.

https://astexplorer.net/

- Take the example code and paste it into AST Explorer (as in lesson-1).
- Implement the function.

The function name tells you what to detect, for example:
- isVariableDeclaration - true for VariableDeclaration nodes
- isStringLiteral - true for Literal nodes with a string value
*/

test("Test 1: Variable Declaration", async () => {

    function isVariableDeclaration(programNode: TSESTree.Program) {
        return programNode.body[0].type === "VariableDeclaration";
    }

    checkAnswer("test-1", isVariableDeclaration);
});

test("Test 2: Const Declaration", async () => {

    function isConstDeclaration(programNode: TSESTree.Program) {
        const statement = programNode.body[0];
        if (statement.type !== "VariableDeclaration") return false;
        return statement.kind === "const";
    }

    checkAnswer("test-2", isConstDeclaration);
});

test("Test 3: Console Log", async () => {
    // Example code for AST Explorer: `console.log("hello");`.


    function isConsoleLog(programNode: TSESTree.Program) {
        const statement = programNode.body[0];
        if (statement.type !== "ExpressionStatement") return false;

        const expression = statement.expression;
        if (expression.type !== 'CallExpression') return false;

        const caleee = expression.callee;
        if (caleee.type !== 'MemberExpression') return false;

        const obj = caleee.object;
        if (obj.type !== 'Identifier') return false;

        const property = caleee.property;
        if (property.type !== "Identifier") return false;
        if (property.name !== "log") return false;
        return obj.name === "console";
    }

    checkAnswer("test-3", isConsoleLog);
});

test("Test 4: String Literal", async () => {
    // Example: `const foo = "hello";`.


    function isStringLiteral(programNode: TSESTree.Program) {
            const statement = programNode.body[0];
            if(statement.type !== "VariableDeclaration") return false;

            const declarations = statement.declarations[0];
            if (declarations.type !== "VariableDeclarator") return false;

            const init = declarations.init;
            if (init.type !== "Literal") return false;

            return typeof(init.value) === 'string';
    }

    checkAnswer("test-4", isStringLiteral);
});

test("Test 5: Plus Operator", async () => {
    // Example: `const foo = bar + baz;`.

    function isPlusOperator(programNode: TSESTree.Program) {
    const statement = programNode.body[0];

    if (statement.type !== "VariableDeclaration") return false;

    const decl = statement.declarations[0];
    if (!decl || decl.type !== "VariableDeclarator") return false;

    const init = decl.init;
    if (!init || init.type !== "BinaryExpression") return false;

    return init.operator === "+";
    }

    checkAnswer("test-5", isPlusOperator);
});

test("Test 6: If Without Else", async () => {
    // Example: `if (foo > 0) { getFoo(); }`.

    function isIfWithoutElse(programNode: TSESTree.Program) {
        const statement = programNode.body[0];
        if(statement.type !== "IfStatement") return false;
        return statement.alternate === null;
    }

    checkAnswer("test-6", isIfWithoutElse);
});

test("Test 7: Function With No Params", async () => {
    // Example: `function foo() {}`.

    function isFunctionWithNoParams(programNode: TSESTree.Program) {
        const statement = programNode.body[0];
        if(statement.type !== "FunctionDeclaration") return false;
        return statement.params.length === 0;
    }

    checkAnswer("test-7", isFunctionWithNoParams);
});

test("Test 8: String Concatenation", async () => {
    // Example: `"foo" + "bar"`

    function isStringConcatenation(programNode: TSESTree.Program) {
        const statement = programNode.body[0];
        if (statement.type !== 'ExpressionStatement') return false;

        const expression = statement.expression;
        if (expression.type !== "BinaryExpression") return false;

        return  expression.left.type === 'Literal' && 
        expression.right.type === 'Literal' && 
        typeof expression.right.value === "string" &&
        typeof expression.left.value === 'string' &&
        expression.operator === '+';
     }

    checkAnswer("test-8", isStringConcatenation);
});

test("Test 9: Export Const", async () => {
    // Example: `export const foo = 42;`

    function isExportConst(programNode: TSESTree.Program) {
        const statement = programNode.body[0];
        if(statement.type !== "ExportNamedDeclaration") return false;

        const declaration= statement.declaration;
        if (declaration.type !== "VariableDeclaration") return false;

        return declaration.kind === 'const';
    }

    checkAnswer("test-9", isExportConst);
});

test("Test 10: Ternary Inside Call", async () => {
    // Example: `getFoo(foo ? bar : 42)`

    function isTernaryInsideCall(programNode: TSESTree.Program) {
        const statement = programNode.body[0];
        if (statement.type !== "ExpressionStatement") return false;

        const expression = statement.expression;
        if(expression.type !== 'CallExpression') return false;

        const argumentss = expression.arguments;
        if(argumentss.length === 0 ) return false;

        return argumentss[0].type === "ConditionalExpression";
    }

    checkAnswer("test-10", isTernaryInsideCall);
});

test("Test 11: Object With Spread", async () => {
    // Example: `{ ...foo, bar: 42 }`

    function isObjectWithSpread(programNode: TSESTree.Program) {
        const statement = programNode.body[0];
        if (statement.type !== "ExpressionStatement") return false;

        const expression = statement.expression;
        if (expression.type !== "ObjectExpression") return false;
        
        const properties = expression.properties;
        return properties.some(e => e.type === "SpreadElement");
    }
    checkAnswer("test-11", isObjectWithSpread);
});

test("Test 12: Template With Expression", async () => {
    // Example: ``Hello, ${foo}!``

    function isTemplateWithExpression(programNode: TSESTree.Program) {
        const statement = programNode.body[0];
        if (statement.type !== "ExpressionStatement") return false;

        const expression = statement.expression;
        if (!expression || expression.type !== 'TemplateLiteral') return false;

        return expression.expressions.length > 0;
    }

    checkAnswer("test-12", isTemplateWithExpression);
});

test("Test 13: Assignment To Window", async () => {
    // Example: `window.foo = "bar"`

    function isAssignmentToWindow(programNode: TSESTree.Program) {
        const statement = programNode.body[0];
        if (statement.type !== "ExpressionStatement") return false;

        const expression = statement.expression;
        if (expression.type !== "AssignmentExpression") return false;

        const left = expression.left;
        if (left.type !== "MemberExpression") return false;

        const obj = left.object;
        if(obj.type !== "Identifier") return false;
        
        return obj.name === "window";
    }
    checkAnswer("test-13", isAssignmentToWindow);
});
