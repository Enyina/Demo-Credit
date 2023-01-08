/**
 * Global error handling middleware
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns error code and message
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log("error:", err);

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      title: "Operational Error",
      message: err.message,
    });
  }

  return res.status(err.statusCode).json({
    title: "Something went wrong",
    message: err.message,
  });
};
