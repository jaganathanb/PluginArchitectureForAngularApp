function rule(context) {
    'use strict';
    return {
        'CallExpression': function(node) {
            var prefix = context.options[0];
            var callee = node.callee;
            if (callee.type === 'MemberExpression' && callee.property.name === 'directive') {
                var name = node.arguments[0].value;
               if(name !== undefined && !(name.indexOf(prefix) === 0)){
                    context.report(node, 'The {{directive}} directive should be prefixed with {{prefix}}', {
                        directive: name,
                        prefix: prefix
                    });
                }

            }
        }
    };

};

module.exports = rule;
