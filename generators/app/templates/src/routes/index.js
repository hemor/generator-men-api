'use strict';

let fs = require('fs');
let path = require('path');
let express = require('express');
let router = express.Router();


fs.readdirSync(__dirname)
  .filter(file => {
    return (fs.lstatSync(path.resolve(__dirname, file)).isFile()) && (file.indexOf('.') !== 0) && (file !== path.basename(module.filename)) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let routeName = `/${file.substr(0, file.length -3)}`;
    let routes = require(`./${file}`);
    router.use(routeName, routes);
  });


module.exports = router;
