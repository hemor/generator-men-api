'use strict';

let mongoose = require('mongoose');


let <%= name %>Schema = new mongoose.Schema({

});


module.exports = mongoose.model('<%= name %>', <%= name %>Schema);
