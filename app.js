var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = mongoose.connect('mongodb://localhost/portfolioAPI');



var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api = require('./routes/api')(app, express, io);

app.use('/api', api);
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