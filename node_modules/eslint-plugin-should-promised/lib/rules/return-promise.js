'use strict';

function isPromiseAssertionProperty(property) {
  const name = property && (property.name || property.value);
  return name === 'Promise' ||
         name === 'fulfilled' ||
         name === 'fulfilledWith' ||
         name === 'rejected' ||
         name === 'rejectedWith' ||
         name === 'finally' ||
         name === 'eventually';
}

function ancestorReturns(parents) {
  for (let i = parents.length - 1; i >= 0; i--) {
    let parent = parents[i];
    let type = parent.type;
    if (type === 'ReturnStatement' || type === 'AwaitExpression' || type === 'YieldExpression') {
      return true;
    }
    if (type === 'ArrowFunctionExpression' && parent.body.type === 'CallExpression') {
      return true;
    }
    if (type === 'FunctionExpression') {
      return false;
    }
  }
  return false;
}


module.exports = {
  meta: {
    docs: {}
  },

  create(context) {
    return {
      MemberExpression(node) {
        if (!isPromiseAssertionProperty(node.property)) {
          return;
        }

        if (ancestorReturns(context.getAncestors(node))) {
          return;
        }

        context.report(node.property, 'Promise assertion must return, await or yield.');
      }
    };
  }
};
