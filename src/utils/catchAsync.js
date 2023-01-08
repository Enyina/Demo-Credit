/**
 * CatchAsync used for async functions
 * @param {*} fn
 * @returns a function that calls the main function
 */
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
