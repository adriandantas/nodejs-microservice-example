const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');
const yaml = require('js-yaml');

const pkg = require('../package.json');

const filename = process.argv[2];
const swaggerDefinition = {
  info: {
    title: pkg.name,
    version: pkg.version,
    description: pkg.description,
  },
  host: 'localhost:3000',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};
const options = {
  swaggerDefinition,
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  apis: ['./src/app.js'],
};

const apiSpec = swaggerJsdoc(options);

//const output = JSON.stringify(apiSpec, null, 2);
const output = yaml.dump(apiSpec);

// Write the JSON string to a file
fs.writeFile(filename, output, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`YAML data written to ${filename}`);
  }
});
