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
  return errors;
}


function validateSchema(schemaName) {
  return function (req, res, next) {
    if (!ajv.validate(schemaName, req.body)) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: 'Invalid data',
        data: errorResponse(ajv.errors)
      });
    }
    next();
  };
}


module.exports = validateSchema;
