'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let config = require('config');
let helmet = require('helmet');
let compression = require('compression');
let mongoose = require('mongoose');
let cors = require('cors');

let logger = require('./middlewares/logger');
let routes = require('./routes');
let errorRoutes = require('./middlewares/error-routes');


// Initialize express app
let app = express();

// Don't write access logs when running tests
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(logger.accessLog);
}

// Add express middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());             // Parse application/json
app.use(bodyParser.urlencoded({ extended: false }));     // Parse form-data


// Add routes to express server
app.use('/api', routes);
app.use('*', errorRoutes.pageNotFound);


// Don't write error logs when running tests
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(logger.errorLog);
}

let dbConnectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`;
let dbOptions = { useMongoClient: true };
if (config.db.user && config.db.pass) {
  dbOptions['user'] = config.db.user;
  dbOptions['pass'] = config.db.pass;

  if (config.db.authSource) {
    dbOptions['authSource'] = config.db.authSource;
  }
}

mongoose.connect(dbConnectionString, dbOptions, function (err) {
  if (err) {
    console.error(err.message);
    process.exit();
  }
  console.log('Connection to database server has been established');
  startServer();
});

// Start express server
function startServer() {
  app.listen(config.app.port);
  console.log(`Server started on ${config.app.host}:${config.app.port}`);
}


module.exports = app;   // For testing
