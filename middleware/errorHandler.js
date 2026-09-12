export default function errorHandler(error, req, res, next) {
  if (req.headerSent) {
    next(error);
  }
  console.log(error.stack);
  const message = error.isOperational
    ? error.message
    : "Something went wrong. We are working on it.";
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({ message });
}
