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
      description: 'Controller name'
    });

    this.option('model', {
      desc: 'Automatically add an import for the model',
      alias: 'm',
      type: String
    });
  }

  writing() {
    if (!this.config.existed) {
      return this.log(chalk.red(`This folder is not a ${this.config.name} project folder`));
    }

    let folders = this.config.get('folders');
    let fileName = _.snakeCase(this.options.name);
    let modelName = _.upperFirst(_.camelCase(this.options.model));
    let modelFileName = _.snakeCase(modelName);
    let modelPath = folders.model;
    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(`${folders.controller}/${fileName}.js`),
      { modelName, modelFileName, modelPath }
    );
  }
};
