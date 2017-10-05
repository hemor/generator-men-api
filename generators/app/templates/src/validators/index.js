let fs = require('fs');


let validators = [];

fs.readdirSync(__dirname)
.filter(file => file !== 'index.js')
.forEach(file => {
  validators.push(require(`./${file}`));
});


module.exports = validators;
