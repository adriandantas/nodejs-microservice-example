function healthCheck(req, res) {
  const response = {
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    env: process.env.NODE_ENV || 'development',
  };
  res.status(200).json(response);
}

module.exports = {
  healthCheck,
};
