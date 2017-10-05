'use strict';

let winston = require('winston');
let expressWinston = require('express-winston');
let config = require('config');
require('winston-daily-rotate-file');


let accessLog = expressWinston.logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: '.log',
      datePattern: `${config.log.access}/yyyy/MM/dd/HH`,
      createTree: true,
      prettyPrint: true,
      silent: false,
      timestamp: true,
      json: true,
      colorize: true,
      prepend: true,
      // localTime: true,
      zippedArchive: true
    })
  ],
  meta: true,
  colorize: false
});

let errorLog = expressWinston.logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: '.log',
      datePattern: `${config.log.error}/yyyy/MM/dd/HH`,
      createTree: true,
      prettyPrint: true,
      silent: false,
      timestamp: true,
      json: true,
      colorize: true,
      prepend: true,
      // localTime: true,
      zippedArchive: true
    })
  ],
  meta: true,
  colorize: false
});


module.exports = {
  accessLog,
  errorLog
};
