const errorHandle = (err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ status: false, message: err.message });
};

module.exports = errorHandle;
