'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      required: true,
      description: 'Route name'
    });

    this.option('controller', {
      desc: 'Automatically add an import for the controller',
      alias: 'c',
      type: String
    });

    this.option('validator', {
      desc: 'Validator name to use for the create and update routes',
      alias: 'v',
      type: String
    });
  }

  writing() {
    if (!this.config.existed) {
      return this.log(chalk.red(`This folder is not a ${this.config.name} project folder`));
    }

    let folders = this.config.get('folders');
    let controllerPath = folders.controller;
    let middlewarePath = folders.middleware;
    let fileName = _.snakeCase(this.options.name);
    let controllerName = _.snakeCase(this.options.controller);
    let validatorName = _.snakeCase(this.options.validator);
    let controllerNameString = _.camelCase(`${controllerName}Controller`);
    this.fs.copyTpl(
      this.templatePath('route.js'),
      this.destinationPath(`${folders.route}/${fileName}.js`),
      { controllerName, controllerPath, middlewarePath, validatorName, controllerNameString }
    );
  }
};
