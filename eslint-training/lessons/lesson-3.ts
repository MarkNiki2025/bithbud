import { test } from "../test-utils/helpers.js";
import { ESLintUtils } from "@typescript-eslint/utils";
import { createLesson3Validator } from "../test-utils/validators/rule-validator.js";
import { exitCode } from "process";

const checkAnswer = createLesson3Validator();

/*
ESLint rule consists of two main parts:

- meta - rule description:
    - type: problem type ("problem" | "suggestion" | "layout")
    - docs: documentation
    - messages: error messages

- create(context) - main logic:
    - returns an object with visitors for AST node types
    - uses context.report() to report problems

Learn more:
- https://eslint.org/docs/latest/extend/custom-rules
- https://typescript-eslint.io/developers/custom-rules/
*/

test("Test 1: no-console-log", () => {
    /*
        Task: Create ESLint rule that forbids the use of console.log().

        Requirements:
        - Detect any calls to console.log().
        - Report an error when such calls are found.
        - Ignore other console methods.
     */

    const noConsoleLog = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)({
        name: "no-console-log",
        meta: {
            type: "problem", // this is a code problem
            docs: {
                description: "Disallow console.log() statements",
            },
            messages: {
                // define error message with ID "noConsoleLog"
                noConsoleLog: "Unexpected console.log() statement.",
            },
            schema: [], // no options yet
        },
        defaultOptions: [],
        create(context) {
            // return an object with visitors for different node types
            return {
                // CallExpression - any function call: foo(), obj.method().
                CallExpression(node) {
                    // check if this is exactly console.log()
                    if (
                        node.callee.type === "MemberExpression" &&
                        node.callee.object.type === "Identifier" &&
                        node.callee.object.name === "console" &&
                        node.callee.property.type === "Identifier" &&
                        node.callee.property.name === "log"
                    ) {
                        // report the error
                        context.report({
                            node: node, // which node has the error
                            messageId: "noConsoleLog", // message ID from meta.messages
                        });
                    }
                },
            };
        },
    });

    checkAnswer("test-1", noConsoleLog);
});

test("Test 2: no-alert", () => {
    /*
        Task: Create ESLint rule that forbids the use of alert().

        Requirements:
        - Detect any calls to alert().
        - Report an error when such calls are found.
     */

    const noAlert = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)({
        name: "no-alert",
        meta: {
            type: "problem",
            docs: {
                description: "Disallow alert() statements",
            },
            messages: {
                noAlert: "Unexpected alert() statement.", // TODO: create an error message
            },
            schema: [],
        },
        defaultOptions: [],
        create(context) {
            return {
                CallExpression(node) {
                    if (
                        node.callee.type === "Identifier" &&
                        node.callee.name === "alert"
                    ) {
                        context.report({
                            node: node,
                            messageId: "noAlert"
                        });
                    }
                    
                    // TODO: check if this is an alert() call and report an error
                },
            };
        },
    });

    checkAnswer("test-2", noAlert);
});

test("Test 3: no-var", () => {
    /*
        Task: Create ESLint rule that forbids the use of var keyword.
        Requirements: Detect and report variable declarations using var.
     */

    const noVar = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)({
        name: "no-var",
        meta: {
            type: "problem",
            docs: {
                description: "Disallow Var statements",
            },
            messages: {
                noVar: "Unexpected Var statement.", // TODO: create an error message
            },
            schema: [],
        },
        defaultOptions: [],
        create (context){
            return {
                VariableDeclaration (node){
                    if (
                        node.kind === 'var'
                    ) {
                        context.report ({
                            node: node,
                            messageId: 'noVar'
                        });
                    }
                }
            };
        }
        // TODO:
        // - Implement the `noVar` rule.
        // - Use the VariableDeclaration node.
    });

    checkAnswer("test-3", noVar);
});

/*
ESLint Schema - configurable rules with options.
Schema allows to configure rule behavior in eslint.config.js:

{
    "rules": {
        "max-function-params": ["error", { "max": 3 }]
    }
}

Schema defines:
- What options are valid (type, structure)
- Default values for options
- Validation rules

Learn more:
- https://eslint.org/docs/latest/extend/custom-rules#options-schemas
*/

test("Test 4: max-function-params", () => {
    /*
        Task: Create ESLint rule that limits the number of function parameters.
        Requirements: Detect and report functions with more than 3 parameters .
     */

    const maxFunctionParams = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)({
        name: "max-function-params",
        meta: {
            type: "suggestion",
            docs: {
                description: "Enforce a maximum number of function parameters",
            },
            messages: {
                maxFunctionParams: "Function has {{count}} parameters, but only {{max}} are allowed.",
            },
            schema: [
                // schema is an array - each element defines one option object
                {
                    type: "object", // first option is an object
                    properties: {
                        // define what properties this object can have
                        max: {
                            type: "integer", // must be an integer
                            minimum: 0, // cannot be negative
                        },
                    },
                    additionalProperties: false, // no other properties allowed
                },
            ],
        },
        defaultOptions: [{ max: 3 }], // default: max 3 parameters

        // create() now receives options as second parameter
        create(context, [options]) {
            // extract the max value from options
            const maxParams = options.max;

            return {
                FunctionDeclaration(node) {
                    const paramCount = node.params.length;

                    if (paramCount > maxParams) {
                        context.report({
                            node: node,
                            messageId: "maxFunctionParams",
                            // data object - values will be interpolated into the message
                            // {{count}} will be replaced with paramCount
                            // {{max}} will be replaced with maxParams
                            data: {
                                count: paramCount,
                                max: maxParams,
                            },
                        });
                    }
                },
            };
        },
    });

    checkAnswer("test-4", maxFunctionParams);
});

test("Test 5: max-string-length", () => {
    /*
        Task: Create ESLint rule that limits the length of string literals.

        Requirements:
        - Detect and report string literals longer than 15 characters.
     */

    const maxStringLength = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)({
        name: "max-string-length",
        meta: {
            type: "suggestion",
            docs: {
                description: "Enforce a maximum string literal length",
            },
            messages: {
                maxStringLength: "String exceeds maximum allowed length of {{ max }} characters.",
            },
            schema: [
                {
                    type: "object", 
                    properties: {
                        max: {
                            type: "integer", 
                            minimum: 1, 
                        },
                    },
                    additionalProperties: false, 
                },
            ],
        },
        defaultOptions: [{ max: 15 }], 
        create(context, [options]) {
            const maxLength = options.max;

            return {
                Literal(node){
                    if (
                        typeof(node.value) === "string" &&
                        node.value.length > maxLength
                    ) {
                        const lengthCount = node.value.length;

                        context.report({
                            node: node,
                            messageId: "maxStringLength",
                            data: {
                                count: lengthCount,
                                max:  maxLength,
                            },
                        });
                    }
                    
                }
            };
        },
    });

    checkAnswer("test-5", maxStringLength);
});

test("Test 6: min-identifier-length", () => {
    /*
        Task: Create ESLint rule that requires minimum identifier length.
        Requirements: Detect and report identifiers shorter than 2 characters.
     */

    const minIdentifierLength = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)({
        name: "min-identifier-length",
        meta: {
            type: "suggestion",
            docs: {
                description: "Enforce a minimum identifier length with optional exceptions",
            },
            messages: {
                minIdentifierLength: "Too short identifier.",
            },
            schema: [
                {
                    type: "object",
                    required: ['min'],
                    properties: {
                        min: {
                            type: "integer",
                            minimum: 1,
                        },
                        exceptions: {
                            type: 'array',
                            items: {
                                type: "string"
                            }
                        }
                    },
                    additionalProperties: false,
                },
            ],
        },
        defaultOptions: [{ min: 2, exceptions: ["i", "j", "x", "y"] }],
        create(context, [options]) {
            const min = options.min;
            return {
                Identifier(node){
                    if (
                        node.name.length < min &&
                        !options.exceptions.includes(node.name)
                    ) {
                        context.report({
                            node: node,
                            messageId: "minIdentifierLength"
                        });
                    }
                }
            };
        },
    });

    checkAnswer("test-6", minIdentifierLength);
});

/*
ESLint provides context.sourceCode to access the source code:

Key methods:
- getText(node) - get the text representation of a node
- getTokens(node) - get all tokens in a node
- getFirstToken(node) / getLastToken(node) - get first/last token
- getTokenBefore(node) / getTokenAfter(node) - get adjacent tokens
- getAllComments() - get all comments in the file
- getCommentsBefore(node) / getCommentsAfter(node) - get comments near a node
- lines - array of all source code lines

Tokens represent the smallest meaningful units:
- Keywords: var, let, const, if, for, etc.
- Identifiers: variable names, function names
- Punctuators: (, ), {, }, ;, etc.
- Operators: +, -, *, ==, etc.

Each token has:
- type: "Keyword" | "Identifier" | "Punctuator" | "String" | "Numeric" | etc.
- value: the actual text
- range: [start, end] positions in the source
- loc: { start: { line, column }, end: { line, column } }

Learn more:
- https://eslint.org/docs/latest/extend/custom-rules#accessing-the-source-code
- https://typescript-eslint.io/developers/custom-rules/#the-context-object
*/

test("Test 7: no-trailing-spaces", () => {
    /*
        Task: Create ESLint rule that detects trailing spaces at the end of lines.
        Requirements: Detect and report lines that end with one or more space characters before the newline.
    */

    const noTrailingSpaces = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)({
        name: "no-trailing-spaces",
        meta: {
            type: "layout",
            docs: {
                description: "Disallow trailing whitespace at the end of lines",
            },
            messages: {
                noTrailingSpaces: "Trailing space found at the end of line.",
            },
            schema: [],
        },
        defaultOptions: [],
        create(context) {
            const sourceCode = context.sourceCode;

            return {
                // Program node - the root of the AST, runs once for entire file
                Program(node) {
                    // lines is an array of all source code lines (0-indexed)
                    const lines = sourceCode.lines;

                    lines.forEach((line, lineIndex) => {
                        // check if line ends with whitespace
                        if (/\s+$/.test(line)) {
                            // calculate the position of the trailing space
                            const lineNumber = lineIndex + 1; // lines are 1-indexed for users

                            // find where the trailing spaces start
                            const trimmedLength = line.trimEnd().length;
                            const trailingSpacesStart = trimmedLength;

                            context.report({
                                node: node,
                                // specify exact location using loc
                                loc: {
                                    start: { line: lineNumber, column: trailingSpacesStart },
                                    end: { line: lineNumber, column: line.length },
                                },
                                messageId: "noTrailingSpaces",
                            });
                        }
                    });
                },
            };
        },
    });

    checkAnswer("test-7", noTrailingSpaces);
});

test("Test 8: no-long-comments", () => {
    /*
        Task: Create ESLint rule that limits the length of comments.
        Requirements: Detect and report comments that are too long.
    */

    const noLongComments = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)({
        name: "no-long-comments",
        meta: {
            type: "suggestion",
            docs: {
                description: "Enforce a maximum comment length",
            },
            messages: {
                noLongComments: "Comment is too long.",
            },
            schema: [{
                type: "object",
                required: ["max"],
                properties: {
                    max: {
                        type: "integer",  
                        minimum: 1,
                    },
                },
                additionalProperties: false,
        }],
        },
        defaultOptions: [{ max: 20 }],
        create(context, [options]) {
            const maxLengthOfComment = options.max;

            return {
                Program(node){
                    const allComents = context.sourceCode.getAllComments();

                    for (let item of allComents){
                        if (
                            item.value.length > maxLengthOfComment
                        ) {
                            context.report ({
                                node: node,
                                messageId: 'noLongComments'
                            });
                        }
                    }
                }
            };
            // TODO: your code here
            // - Get sourceCode
            // - Return Program visitor
            // - Get all comments with getAllComments()
            // - Iterate through comments
            // - Check if comment.value.length > max
            // - Report
        },
    });

    checkAnswer("test-8", noLongComments);
});

test("Test 9: require-space-around-operator", () => {
    /*
        Task: Create ESLint rule that requires spaces around binary operators.
        Requirements: Detect and report binary operators that do not have a space before or after.
    */

    const requireSpaceAroundOperator = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)(
        {
            name: "require-space-around-operator",
            meta: {
                type: "layout",
                docs: {
                    description: "Require spaces around binary operators",
                },
                messages: {
                    requireSpaceAroundOperator: "Missing space around binary operator.",
                },
                schema: [],
            },
            defaultOptions: [],
            create(context) {
                const sourceCode = context.sourceCode;

                return {
                    BinaryExpression(node) {
                        const allTokens = context.sourceCode.getTokens(node);

                        const operatorToken = allTokens.find(t => t.value === node.operator);
                        if (!operatorToken) return;

                        const operatorIndex = allTokens.indexOf(operatorToken);
                        const tokenBefore = allTokens[operatorIndex - 1];
                        const tokenAfter = allTokens[operatorIndex + 1];
                        
                        const spaceBefore = tokenBefore ? operatorToken.range[0] > tokenBefore.range[1] : false;
                        const spaceAfter = tokenAfter ? operatorToken.range[1] < tokenAfter.range[0] : false;
                        
                        if (!(spaceBefore && spaceAfter)){
                            context.report ({
                                node: node,
                                messageId: 'requireSpaceAroundOperator',

                            });
                        }
                    },
                };
            },
        },
    );

    checkAnswer("test-9", requireSpaceAroundOperator);
});

test("Test 10: require-semicolon", () => {
    /*
        Task: Create ESLint rule that requires semicolons at the end of statements.
        Requirements: Detect and report statements that are missing semicolons.
     */

    const requireSemicolon = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)(
        {
            name: "require-semicolon",
            meta: {
                type: "layout",
                docs: {
                    description: "Require semicolons at the end of statements",
                },
                messages: {
                    requireSemolconsAtTheEnd: "Missing semicolons at the end of statements.",
                },
                schema: [],
            },
            defaultOptions: [],
            create(context) {
                return {
                    ExpressionStatement(node){
                        const lastToken = context.sourceCode.getLastToken(node);
                        if (lastToken.value !== ';') {
                            context.report({
                                node: node,
                                messageId: 'requireSemolconsAtTheEnd'
                            });
                        }
                    },
                    VariableDeclaration (node){
                        const lastToken = context.sourceCode.getLastToken(node);
                        if (lastToken.value !== ';') {
                            context.report({
                                node: node,
                                messageId: 'requireSemolconsAtTheEnd'
                            });
                        } 
                    }
                };
            }
        // TODO:
        // - Implement the `requireSemicolon` rule.
        // - You’ll need two visitors: ExpressionStatement and VariableDeclaration.
    });

    checkAnswer("test-10", requireSemicolon);
});
