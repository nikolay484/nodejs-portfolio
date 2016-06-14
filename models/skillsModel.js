var mongoose = require('mongoose');
// Schema =

var skillsModel = new mongoose.Schema({
    title: { type: String, unique: true,  required: true, index: true },
    level : { type : Number, default : 0 },
    enabled : { type: Boolean, default: true }
});

module.exports = mongoose.model('Skills', skillsModel);

