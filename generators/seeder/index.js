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
      description: 'Seeder name'
    });

    this.option('model', {
      desc: 'Model name to use in seeder',
      alias: 'm',
      type: String,
      required: true
    });
  }

  initializing() {
    if (!this.options.model) {
      this.log(chalk.red('Model name is required'));
      process.exit();
    }
  }

  writing() {
    if (!this.config.existed) {
      return this.log(chalk.red(`This folder is not a ${this.config.name} project folder`));
    }

    let folders = this.config.get('folders');
    let fileName = _.snakeCase(this.options.name);
    let modelName = this.options.model;
    this.fs.copyTpl(
      this.templatePath('seeder.js'),
      this.destinationPath(`${folders.seeder}/${fileName}.js`),
      { modelName }
    );
  }
};
