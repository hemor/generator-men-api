let fs = require('fs');
let Ajv = require('ajv');

let validators = require('../validators');

let ajv = new Ajv({ allErrors: true, removeAdditional: 'all', jsonPointers: true });
validators.forEach(validator => ajv.addSchema(validator.schema, validator.name));


function errorResponse(schemaErrors) {
  let errors = schemaErrors.map(error => {
    let params = error.dataPath ? error.dataPath.slice(1) : error.params.missingProperty;
    let message = error.message;
    return { params, message };
  });
  return {
    status: 'error',
    error: {
      message: 'Invalid data',
      data: error
    }
  };
}


function validateSchema(schemaName) {
  return function (req, res, next) {
    if (!ajv.validate(schemaName, req.body)) {
      return res.status(400).json(errorResponse(ajv.errors));
    }
  };
}


module.exports = validateSchema;
