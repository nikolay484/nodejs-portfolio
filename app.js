var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');


var db = mongoose.connect('mongodb://localhost/portfolioAPI');

var Book = require('./models/bookModel');
var Project = require('./models/projectModel');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


bookRouter = require('./routes/bookRoutes')(Book);
projectRouter = require('./routes/projectRoutes')(Project, express, io);

app.use('/api/books', bookRouter);
app.use('/api/projects', projectRouter);
//app.use('/api/authors', authorRouter);


app.get('/',function(req, res) {
   res.sendFile(__dirname + '/public/app/views/index.html');
   // res.send('wellcome to my API');
});
app.get('/admin/*', function (req, res) {
   res.sendFile(__dirname + '/public/admin/views/index.html');
})

http.listen(port, function() {
   console.log('Gulp is running on PORT : ' + port);    
});