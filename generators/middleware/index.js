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
      description: 'Middleware name'
    });
  }

  writing() {
    if (!this.config.existed) {
      return this.log(chalk.red(`This folder is not a ${this.config.name} project folder`));
    }

    let folders = this.config.get('folders');
    let fileName = _.snakeCase(this.options.name);
    let name = _.camelCase(fileName);
    this.fs.copyTpl(
      this.templatePath('middleware.js'),
      this.destinationPath(`${folders.middleware}/${fileName}.js`),
      { name }
    );
    this.log(chalk.green('The middleware has been created but you have to manually apply it where you need it.'));
  }
};
