export const errorHandler = (err, req, res, next) => {
  if (!err) return;
  console.log({ SERVER_ERROR: err, URL: req.originalUrl });
  return res.status(500).json({
    status: "error",
    message: err?.message || "Internal Server Error",
  });
};
