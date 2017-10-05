'use strict';

let path = require('path');
let express = require('express');
let router = express.Router();
let validator = require(`${path.relative(__dirname, '<%= middlewarePath %>')}/ajv-validator`);
<% if (controllerName) { %>
let <%= controllerName %>Controller = require(path.relative(__dirname, '<%= controllerPath %>')).<%= controllerName %>;


router.get('/', <%= controllerName %>Controller.getAll);
<% if (validatorName) { %>
router.post('/', validator('create_<%= validatorName %>'), <%= controllerName %>Controller.create);
<% } else { %>
router.post('/', <%= controllerName %>Controller.create);
<% } %>
router.get('/:id', <%= controllerName %>Controller.getOne);
<% if (validatorName) { %>
router.patch('/:id', validator('update_<%= validatorName %>'), <%= controllerName %>Controller.update);
<% } else { %>
router.patch('/:id', <%= controllerName %>Controller.update);
<% } %>
router.delete('/:id', <%= controllerName %>Controller.destroy);
<% } else { %>
// let controller = require('');


// router.get('/', controller.getAll);
<% if (validatorName) { %>
// router.post('/', validator('create_<%= validatorName %>'), controller.create);
<% } else { %>
// router.post('/', controller.create);
<% } %>
// router.get('/:id', controller.getOne);
<% if (validatorName) { %>
// router.patch('/:id', validator('update_<%= validatorName %>'), controller.update);
<% } else { %>
// router.patch('/:id', controller.update);
<% } %>
// router.delete('/:id', controller.destroy);
<% } %>


module.exports = router;
