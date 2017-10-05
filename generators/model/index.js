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
      description: 'Model name'
    });

    this.option('seeder', {
      desc: 'Generate seeder for model',
      alias: 's'
    });

    this.option('validator', {
      desc: 'Generate create and update validator for model',
      alias: 'v'
    });
  }

  writing() {
    if (!this.config.existed) {
      return this.log(chalk.red(`This folder is not a ${this.config.name} project folder`));
    }

    let folders = this.config.get('folders');
    let fileName = _.snakeCase(this.options.name);
    let name = _.upperFirst(_.camelCase(fileName));

    this.fs.copyTpl(
      this.templatePath('model.js'),
      this.destinationPath(`${folders.model}/${fileName}.js`),
      { name }
    );

    if (this.options.seeder) {
      this.composeWith(require.resolve('../seeder'), { model: name, arguments: [fileName] });
    }

    if (this.options.validator) {
      this.composeWith(require.resolve('../validator'), { arguments: [`create_${fileName}`] });
      this.composeWith(require.resolve('../validator'), { arguments: [`update_${fileName}`] });
    }
  }
};
