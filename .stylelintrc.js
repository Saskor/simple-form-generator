module.exports = {
    "extends": [],
    "plugins": [
        "stylelint-scss",
        "stylelint-order",
        "stylelint-no-unsupported-browser-features"
    ],
    "rules": {
        "color-no-invalid-hex": true,
        "font-family-no-duplicate-names": true,
        "font-family-no-missing-generic-family-keyword": true,
        "function-calc-no-invalid": true,
        "function-calc-no-unspaced-operator": true,
        "function-linear-gradient-no-nonstandard-direction": true,
        "string-no-newline": true,
        "unit-no-unknown": true,
        "property-no-unknown": true,
        "declaration-block-no-duplicate-properties": true,
        "declaration-block-no-shorthand-property-overrides": true,
        "block-no-empty": true,
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-element-no-unknown": true,
        "selector-type-no-unknown": true,
        "media-feature-name-no-unknown": true,
        "comment-no-empty": true,
        "no-descending-specificity": true,
        "no-duplicate-selectors": true,
        "no-extra-semicolons": true,
        "no-invalid-double-slash-comments": true,
        "alpha-value-notation": "number",
        "color-function-notation": "legacy",
        "length-zero-no-unit": true,
        "font-weight-notation": "numeric",
        "function-url-no-scheme-relative": true,
        "shorthand-property-no-redundant-values": true,
        "value-no-vendor-prefix": true,
        /*"custom-property-pattern": "custom-.+",*/
        "declaration-block-no-redundant-longhand-properties": true,
        "declaration-no-important": true,
        "declaration-block-single-line-max-declarations": 1,
        "selector-max-attribute": 2,
        "selector-max-class": 2,
        "selector-max-combinators": 2,
        "selector-max-compound-selectors": 2,
        "selector-max-empty-lines": 0,
        "selector-max-id": 1,
        "selector-max-pseudo-class": 1,
        "selector-max-type": 2,
        "selector-max-universal": 1,
        "selector-pseudo-element-colon-notation": "double",
        "max-nesting-depth": 2,
        "no-unknown-animations": true,
        "color-hex-case": "lower",
        "font-family-name-quotes": "always-where-recommended",
        "function-comma-newline-after": "never-multi-line",
        "function-comma-space-after": "always-single-line",
        "function-comma-space-before": "never",
        "function-max-empty-lines": 0,
        "function-name-case": "lower",
        "function-parentheses-newline-inside": "always-multi-line",
        "function-parentheses-space-inside": "never",
        "function-url-quotes": "always",
        "function-whitespace-after": "always",
        "number-leading-zero": "always",
        "number-no-trailing-zeros": true,
        "string-quotes": "double",
        "unit-case": "lower",
        "value-keyword-case": "lower",
        "value-list-comma-newline-after": "always-multi-line",
        "value-list-comma-newline-before": "never-multi-line",
        "value-list-comma-space-after": "always-single-line",
        "value-list-comma-space-before": "never",
        "value-list-max-empty-lines": 0,
        "custom-property-empty-line-before": [
            "always",
            {except: ["after-comment", "after-custom-property", "first-nested"]}
        ],
        "property-case": "lower",
        "declaration-bang-space-after": "never",
        "declaration-bang-space-before": "always",
        "declaration-colon-newline-after": "always-multi-line",
        "declaration-colon-space-after": "always-single-line",
        "declaration-colon-space-before": "never",
        "declaration-empty-line-before": "never",
        "declaration-block-semicolon-newline-after": "always-multi-line",
        "declaration-block-semicolon-newline-before": "never-multi-line",
        "declaration-block-semicolon-space-after": "always-single-line",
        "declaration-block-semicolon-space-before": "never",
        "declaration-block-trailing-semicolon": "always",
        "block-closing-brace-empty-line-before": "never",
        "block-closing-brace-newline-after": [
            "always",
            {"ignoreAtRules": ["else"]}
        ],
        /*"block-closing-brace-newline-before": "always-multi-line",
        "block-closing-brace-space-after": "always-single-line",
        "block-closing-brace-space-before": "never",
        "block-opening-brace-newline-after": "always-multi-line",
        "block-opening-brace-space-after": "never",
        "block-opening-brace-space-before": "always",*/
        "selector-attribute-brackets-space-inside": "never",
        "selector-attribute-operator-space-after": "never",
        "selector-attribute-operator-space-before": "never",
        "selector-attribute-quotes": "always",
        "selector-combinator-space-after": "always",
        "selector-combinator-space-before": "always",
        "selector-descendant-combinator-no-non-space": true,
        "selector-pseudo-class-case": "lower",
        "selector-pseudo-class-parentheses-space-inside": "always",
        "selector-pseudo-element-case": "lower",
        "selector-type-case": "lower",
        "selector-list-comma-newline-after#always-multi-line": "always-multi-line",
        /*"selector-list-comma-newline-before": "never-multi-line",*/
        "selector-list-comma-space-after": "always",
        "selector-list-comma-space-before": "never",
        "rule-empty-line-before": "always",
        /* */
        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-name-case": "lower",
        "media-feature-parentheses-space-inside": "never",
        "media-feature-range-operator-space-after": "always",
        "media-feature-range-operator-space-before": "always",
        "media-query-list-comma-newline-after": "always-multi-line",
        "media-query-list-comma-newline-before": "never-multi-line",
        "media-query-list-comma-space-after": "always-single-line",
        "media-query-list-comma-space-before": "never",
        "at-rule-empty-line-before": [
            "always",
            {
                except: [
                    "after-same-name",
                    "inside-block",
                    "blockless-after-same-name-blockless",
                    "blockless-after-blockless",
                    "first-nested"
                ],
                ignoreAtRules: ["import"]
            }
        ],
        "at-rule-name-case": "lower",
        "at-rule-name-newline-after": "always-multi-line",
        "at-rule-name-space-after": "always",
        "at-rule-semicolon-newline-after": "always",
        "at-rule-semicolon-space-before": "never",
        "comment-empty-line-before": "never",
        "comment-whitespace-inside": "always",
        "indentation": 2,
        "linebreaks": "unix",
        "max-empty-lines": 1,
        "max-line-length": 120,
        "no-eol-whitespace": [
            true,
            {ignore: ["empty-lines"]}
        ],
        "no-missing-end-of-source-newline": true,
        "no-empty-first-line": true,
        /* unicode-bom */
        /* sass plugin */
        "scss/at-each-key-value-single-line": true,
        "scss/at-else-closing-brace-newline-after": "always-last-in-chain",
        "scss/at-else-empty-line-before": "never",
        "scss/at-else-if-parentheses-space-before": "always",
        "scss/at-extend-no-missing-placeholder": true,
        "scss/at-function-named-arguments": "always",
        "scss/at-function-parentheses-space-before": "always",
        "scss/at-if-closing-brace-newline-after": "always-last-in-chain",
        "scss/at-if-no-null": true,
        "scss/at-import-no-partial-leading-underscore": true,
        "scss/at-import-partial-extension": "never",
        "scss/at-mixin-argumentless-call-parentheses": "never",
        "scss/at-mixin-named-arguments": "always",
        "scss/at-mixin-parentheses-space-before": "always",
        "scss/at-rule-no-unknown": true,
        "scss/dollar-variable-colon-newline-after": "always-multi-line",
        "scss/dollar-variable-colon-space-after": "always-single-line",
        "scss/dollar-variable-colon-space-before": "never",
        "scss/dollar-variable-empty-line-after": [
            "always",
            {except: ["last-nested", "before-comment", "before-dollar-variable"]}
        ],
        "scss/dollar-variable-empty-line-before": [
            "always",
            {except: ["first-nested", "after-comment", "after-dollar-variable"]}
        ],
        "scss/dollar-variable-no-missing-interpolation": true,
        "scss/double-slash-comment-whitespace-inside": "always",
        "scss/comment-no-empty": true,
        /*"scss/declaration-nested-properties": "always",*/
        /*"scss/declaration-nested-properties-no-divided-groups": true,*/
        "scss/dimension-no-non-numeric-values": true,
       /*  "scss/function-color-relative" Encourage the use of the scale-color over:
            darken
            desaturate
            fade-in
            fade-out
            lighten
            opacify
            saturate
            transparentize
        */
        "scss/function-color-relative": true,
        "scss/function-quote-no-quoted-strings-inside": true,
        "scss/function-unquote-no-unquoted-strings-inside": true,
        "scss/map-keys-quotes": "always",
        "scss/operator-no-newline-after": true,
        "scss/operator-no-unspaced": true,
        "scss/selector-nest-combinators": "always",
        "scss/selector-no-redundant-nesting-selector": true,
        "scss/no-duplicate-dollar-variables": true,
        "scss/no-duplicate-mixins": true,
        "scss/no-global-function-names": true,
        "scss/partial-no-import`": true,
        "order/order": [
            "custom-properties",
            "dollar-variables",
            "declarations",
            "rules",
            "at-rules"
        ],
        "plugin/no-unsupported-browser-features": [true, {
            browsers: [
                "Safari >= 9",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Opera versions"
            ],
            severity: "error"
        }]
    }
};
