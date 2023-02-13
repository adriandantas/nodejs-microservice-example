class AppError extends Error {
  constructor(data) {
    super(data.message);
    this.source = data.source;
  }
}

module.exports = AppError;
