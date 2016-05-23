var mongoose = require('mongoose');
   // Schema =  

var projectModel = new mongoose.Schema({
    title: { type: String },
    category : { type: String },
    img_url : { type: String },
    description : { type: String },
    project_url : { type: String },
    enabled : { type: Boolean, default:true }
});

module.exports = mongoose.model('Project', projectModel);

