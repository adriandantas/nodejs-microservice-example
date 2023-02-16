const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo = null;

async function connect() {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function dropCollections() {
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    for (let idx = 0; idx < collections.length; idx += 1) {
      // eslint-disable-next-line no-await-in-loop
      await collections[idx].remove();
    }
  }
}
async function disconnect() {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
}

module.exports = {
  connect,
  dropCollections,
  disconnect,
};
