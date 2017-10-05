let config = require('config');
let faker = require('faker');
let mongoose = require('mongoose');
let <%= modelName %> = mongoose.model('<%= modelName %>');


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
  startSeeder();
});


function startSeeder() {
  let items = [];

  for (var i = 0; i < 1; i++) {
    let item = new <%= modelName %>({
      // Generate random model data
    });
    items.push(item);
  }

  let done = 0;

  items.forEach(item => {
    item.save((err, result) => {
      done++;
      if (done === items.length) {
        disconnect();
      }
    });
  });
}

function disconnect() {
  mongoose.disconnect();
}
