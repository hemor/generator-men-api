'use strict';

<% if (modelName) { %>
let path = require('path');
let <%= modelName %> = require(path.relative(__dirname, '<%= modelPath %>')).<%= modelFileName %>;
<% } %>

function getAll(req, res) {
  res.json();
}

function create(req, res) {
  res.json();
}

function getOne(req, res) {
  res.json();
}

function update(req, res) {
  res.json();
}

function destroy(req, res) {
  res.json();
}


module.exports = {
  getAll,
  create,
  getOne,
  update,
  destroy
};
