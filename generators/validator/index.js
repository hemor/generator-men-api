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
      description: 'Validator name'
    });
  }

  writing() {
    if (!this.config.existed) {
      return this.log(chalk.red(`This folder is not a ${this.config.name} project folder`));
    }

    let folders = this.config.get('folders');
    let fileName = _.snakeCase(this.options.name);
    this.fs.copyTpl(
      this.templatePath('validator.js'),
      this.destinationPath(`${folders.validator}/${fileName}.js`),
      { fileName }
    );
  }
};
