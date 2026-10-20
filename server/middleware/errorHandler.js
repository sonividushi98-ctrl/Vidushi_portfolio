function errorHandler(err, req, res, next) {
  console.error("[error]", err.stack || err.message);

  const status = err.status || err.statusCode || 500;
  const message =
    status === 500 ? "Internal server error" : err.message || "Request failed";

  res.status(status).json({
    success: false,
    message,
  });
}

module.exports = { errorHandler };
