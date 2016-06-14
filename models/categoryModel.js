var mongoose = require('mongoose');
// Schema =

var projectCategory = new mongoose.Schema({
    name: { type: String }
});

module.exports = mongoose.model('Category', projectCategory);

