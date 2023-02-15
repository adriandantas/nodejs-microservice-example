const mongoose = require('mongoose');
const app = require('./src/app');
const logger = require('./src/util/logger');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => logger.info({ message: 'Connected to MongoDB.' }))
  .catch((error) =>
    logger.error({ message: 'Failed to Connect to MongoDB.', source: error }),
  );

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
