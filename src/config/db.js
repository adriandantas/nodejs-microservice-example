const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const logger = require('../util/logger');

let mongo;

async function init() {
  let mongoUri = process.env.MONGO_URI;

  if (
    !(
      mongoUri === undefined ||
      mongoUri === null ||
      `${mongoUri}`.trim().length === 0
    )
  ) {
    logger.info({
      message: 'Service will connect to MongoDB defined in MONGO_URI.',
      mongoUri,
    });
  } else {
    mongo = await MongoMemoryServer.create();
    logger.info({
      message: 'Initiate MongoMemoryServer since MONGO_URI is not defined.',
    });
    logger.info({ message: 'MongoMemoryServer created.' });
    mongoUri = mongo.getUri();
  }

  mongoose.set('strictQuery', false);
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info({ message: 'Connected to MongoDB.' }))
    .catch((error) =>
      logger.error({
        message: 'Failed to Connect to MongoDB.',
        source: error,
        mongoUri,
      }),
    );
}

module.exports = {
  init,
};
