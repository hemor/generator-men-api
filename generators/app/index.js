'use strict';

const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const _ = require('lodash');


function folderName(name) {
  name = _.kebabCase(name.toLowerCase());
  return name;
}


module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      description: 'Application name',
      default: this.appname
    });

    this.option('yes', {
      desc: 'Skip prompt and use the default configurations',
      alias: 'y'
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('men-api') + ' generator!'
    ));

    if (this.options.yes) {
      let props = {
        appDescription: '',
        appVersion: '1.0.0',
        appPort: 3000,
        author: '',
        license: 'ISC',
        dbHost: 'localhost',
        dbPort: 27017,
        dbName: folderName(this.options.name),
        dbUser: '',
        dbPass: ''
      };
      return this.props = props;
    }

    const prompts = [
      {
        type: 'input',
        name: 'appDescription',
        message: 'Application Description:'
      },
      {
        type: 'input',
        name: 'appVersion',
        message: 'Application Version:',
        default: '1.0.0'
      },
      {
        type: 'number',
        name: 'appPort',
        message: 'Application Port:',
        default: 3000
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author:'
      },
      {
        type: 'input',
        name: 'license',
        message: 'Application License:',
        default: 'ISC'
      },
      {
        type: 'input',
        name: 'dbHost',
        message: 'Database Host:',
        default: 'localhost'
      },
      {
        type: 'number',
        name: 'dbPort',
        message: 'Database Port:',
        default: 27017
      },
      {
        type: 'input',
        name: 'dbName',
        message: 'Database Name:',
        default: folderName(this.options.name)
      },
      {
        type: 'input',
        name: 'dbUser',
        message: 'Database User:'
      },
      {
        type: 'password',
        name: 'dbPass',
        message: 'Database Password:'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    let { appDescription, appVersion, appPort, author, license, dbHost, dbPort, dbName,dbUser, dbPass } = this.props;
    let appName = folderName(this.options.name);

    // If appName is not the present directory name, create it and change the destinationRoot
    if (path.basename(this.destinationPath()) !== appName) {
      mkdirp(appName);
      this.destinationRoot(this.destinationPath(appName));
    }

    // Copy non-template files
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('nodemonignore'),
      this.destinationPath('.nodemonignore')
    );
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    );

    // Copy template files
    this.fs.copyTpl(
      this.templatePath('config/default.json'),
      this.destinationPath('config/default.json'),
      { appPort, dbHost, dbPort, dbName, dbUser, dbPass }
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { appName, appDescription, appVersion, author, license }
    );

    // Create other folders
    mkdirp(this.destinationPath('logs'));
    mkdirp(this.destinationPath('test/integration'));
    mkdirp(this.destinationPath('test/unit'));
    mkdirp(this.destinationPath('src/database/seeders'));

    // Create files
    this.fs.write(this.destinationPath('config/development.json'), '');
    this.fs.write(this.destinationPath('config/production.json'), '');
    this.fs.write(this.destinationPath('config/test.json'), '');
  }

  conflicts() {
    // Create application configuration
    let config = {
      folders: {
        controller: 'src/controllers',
        model: 'src/database/models',
        seeder: 'src/database/seeders',
        middleware: 'src/middlewares',
        route: 'src/routes',
        validator: 'src/validators'
      }
    };
    this.config.set(config);
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
