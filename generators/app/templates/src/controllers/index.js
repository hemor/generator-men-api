'use strict';

let fs = require('fs');
let path = require('path');


let controllers = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (fs.lstatSync(path.resolve(__dirname, file)).isFile()) && (file.indexOf('.') !== 0) && (file !== path.basename(module.filename)) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    let controllerName = `${file.substr(0, file.length -3)}`;
    let controllerMethods = require(`./${file}`);
    controllers[controllerName] = controllerMethods;
  });


module.exports = controllers;
