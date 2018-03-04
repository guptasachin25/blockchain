var _ = require('lodash');

// Doesn't keep track of result for speed
const runSeriallyImpl = function (array, fun, i) {
  if (i >= array.length) {
    return Promise.resolve();
  }
  return fun(array[i]).then(() => runSeriallyImpl(array, fun, i + 1));
};

const runSerially = function (array, fun) {
  return runSeriallyImpl(array, fun, 0);
};
exports.runSerially = runSerially;

exports.runParallely = function (array, parallelFactor, fun) {
  const lists = _.chunk(array, parallelFactor);
  return runSerially(lists, oneList => Promise.all(_.map(oneList, fun)));
};