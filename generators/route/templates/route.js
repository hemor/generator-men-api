'use strict';

let path = require('path');
let express = require('express');
let router = express.Router();
let validator = require(`${path.relative(__dirname, '<%= middlewarePath %>')}/ajv-validator`);
<% if (controllerName) { %>
let <%= controllerNameString %> = require(path.relative(__dirname, '<%= controllerPath %>')).<%= controllerName %>;


router.get('/', <%= controllerNameString %>.getAll);
<% if (validatorName) { %>
router.post('/', validator('create_<%= validatorName %>'), <%= controllerNameString %>.create);
<% } else { %>
router.post('/', <%= controllerNameString %>.create);
<% } %>
router.get('/:id', <%= controllerNameString %>.getOne);
<% if (validatorName) { %>
router.patch('/:id', validator('update_<%= validatorName %>'), <%= controllerNameString %>.update);
<% } else { %>
router.patch('/:id', <%= controllerNameString %>.update);
<% } %>
router.delete('/:id', <%= controllerNameString %>.destroy);
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
