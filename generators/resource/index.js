'use strict';

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
      description: 'Resource name'
    });

    this.option('seeder', {
      desc: 'Generate seeder for resource',
      alias: 's'
    });

    this.option('validator', {
      desc: 'Generate create and update validator for resource',
      alias: 'v'
    });
  }

  writing() {
    if (!this.config.existed) {
      return this.log(chalk.red(`This folder is not a ${this.config.name} project folder`));
    }
    let { name, seeder, validator } = this.options;
    let folders = this.config.get('folders');
    let controllerName = _.snakeCase(name);
    let modelName = _.upperFirst(_.camelCase(name));
    let validatorName = validator ? name : undefined;

    this.composeWith(require.resolve('../model'), { seeder, validator, arguments: [name] });
    this.composeWith(require.resolve('../controller'), { model: modelName, arguments: [name] });
    this.composeWith(require.resolve('../route'), { controller: controllerName, validator: validatorName, arguments: [name] });
  }
};
