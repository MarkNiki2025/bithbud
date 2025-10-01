import { test } from "../test-utils/helpers.js";
import { ESLintUtils } from "@typescript-eslint/utils";
import { createLesson4Validator } from "../test-utils/validators/rule-validator.js";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";


const checkAnswer = createLesson4Validator();

/*
    Code style:
    - Extract any standalone numbers or strings into constants or in a constants object.
    - Use camelCase for constant names (not SNAKE_CASE).
    - Keep create() clean - delegate logic to small helper functions when possible.
    - Use descriptive names for variables and helper functions.
*/

test("Test 1: must-not-use-null", () => {
    /*
        Task: Create ESLint rule that disallows using `null`.
        Requirements: Detect any assignment of `null` and report.

        Wrong:
            if (!data) {
                result = null;
            }

        Correct:
            if (!data) {
                result = undefined;
            }
     */

    const mustNotUseNull = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)(
        {
            name: "mustNotUseNull",
            meta: {
                type: "layout",
                docs: {
                    description: "Require don`t usisng null ",
                },
                messages: {
                    mustNotUseNullInCode: "Null was used",
                },
                schema: [],
            },
            defaultOptions: [],
            create(context) {
                return {
                    [AST_NODE_TYPES.Literal] (node) {
                        if (node.value === null) {
                            context.report({
                                node: node,
                                messageId: 'mustNotUseNullInCode'
                            });
                        }
                    },
                };
            }
    }
);

    checkAnswer("test-1", mustNotUseNull);
});

test("Test 2: must-add-space-for-comments", () => {
    /*
        Task: Create ESLint rule that .
        Requirements: Detect and repotr .

        Task: Create ESLint rule that enforces a space after `//` in single-line comments.
        Requirements: Detect comments starting with `//` that are not followed by a space and report.

        Wrong:
            //comment

        Correct:
            // comment
     */

    const mustAddSpaceForComments = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)({
        name: "mustAddSpaceForComments",
            meta: {
                type: "layout",
                docs: {
                    description: "Require add space for comments ",
                },
                messages: {
                    mustAddSpaceForComments: "Spase hasn`t added for comments",
                },
                schema: [],
            },
            defaultOptions: [],
            create (context) {
                return {
                    [AST_NODE_TYPES.Program] () {
                        const allComents = context.sourceCode.getAllComments();

                        const exeptions = [' ',"!", "#", "/" ];

                        for (let item of allComents) {
                            if (item.type === 'Line')  {
                                    const firstChar = item.value.trimStart()[0];
                                    const trimedValue = item.value.trimStart();
                                    const isExeption = exeptions.some(pref => item.value.startsWith(pref));
                                    if ((item.value.replace(/\s/g, '') === "") || (firstChar === '*')) continue;

                                    if (
                                        !isExeption &&
                                        !trimedValue.startsWith("\n*")
                                    ) {
                                    context.report({
                                    node: item,
                                    messageId: 'mustAddSpaceForComments'
                                    });
                                }
                            }
                        }
                    }
                };
            }
        // TODO: implement the `mustAddSpaceForComments` rule.
    });

    checkAnswer("test-2", mustAddSpaceForComments);
});

test("Test 3: for-each-max-lines", () => {
    /*
        Task: Create ESLint rule that limits the number of lines inside a `forEach` callback.
        Requirements: Detect any `forEach` callback that has more than 3 lines and report.

        Wrong:
            array.forEach(foo => {
                doA(foo);
                doB(foo);
                doC(foo);
                doD(foo);
            });

        Correct:
            array.forEach(foo => {
                doA(foo);
                doB(foo);
                doC(foo);
            });
     */

    const forEachMaxLines = ESLintUtils.RuleCreator((name) => `https://example.com/rules/${name}`)({
        name: "for-each-max-lines",
        meta: {
            type: "suggestion",
            docs: {
                description: "Forbid using more than the maximum number of lines",
            },
            messages: {
                noMoreLinesThanMax: "Exceeded maximum number of lines",
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
        defaultOptions: [{ max: 3 }],

        create (context, [options]) {
        const maxCountOfLines = options.max;
            return {
                    [AST_NODE_TYPES.CallExpression](node){
                       const linesCount = node.loc.end.line - node.loc.start.line - 1 ;
                       if (linesCount > maxCountOfLines) {
                            context.report({
                                node:node,
                                messageId:'noMoreLinesThanMax'
                            });
                       }
                    }
                };
            }
        });
    checkAnswer("test-3", forEachMaxLines);
});
