const cors = require('cors');

const BodyParser = require('body-parser');
const dbConnections = require('./db-connection');

module.exports = function preInitialization(app) {
  app.use(BodyParser.urlencoded({ extended: true }));
  app.use(BodyParser.json());

  app.use(cors({ exposedHeaders: 'Authorization' }));

  dbConnections.estDBConnection();
};
