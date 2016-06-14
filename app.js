var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    multer = require('multer')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = mongoose.connect('mongodb://localhost/portfolioAPI');


var port = process.env.PORT || 3000;

var storage = multer.diskStorage({ //multers disk storage settings
   destination: function (req, file, cb) {
      cb(null, './uploads/')
   },
   filename: function (req, file, cb) {
      cb( null , file.originalname)
   }
});

var upload = multer({ //multer settings
   storage: storage
}).single('file');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api = require('./routes/api')(app, express, io);


app.use('/api', api);
//app.use('/api/authors', authorRouter);


app.post('/uploads', function(req, res) {
   upload(req,res,function(err){
      if(err){
         res.json({error_code:1,err_desc:err});
         return;
      }
      res.json({error_code:0,err_desc: null, name: req.file.path});
   })

});

app.use('/uploads/',express.static(__dirname + '/uploads'));
app.use('/fonts/',express.static(__dirname + '/fonts'));

app.get('/fonts/:filename', function(req, res) {
   res.sendFile(__dirname + '/public/prod/libs/font-awesome/fonts/'+ req.params.filename);
});


app.get('/',function(req, res) {
   res.sendFile(__dirname + '/public/prod/index.html');
});
app.get('/about',function(req, res) {
   res.sendFile(__dirname + '/public/prod/index.html');
});
app.get('/portfolio',function(req, res) {
   res.sendFile(__dirname + '/public/prod/index.html');
});

app.get('/homepage/:folder/:filename', function(req , res){
   console.log(req.params);
   res.sendFile(__dirname + '/public/prod/' + req.params.folder + '/' + req.params.filename);
})
app.get('/:filename',function(req, res) {
   res.sendFile(__dirname + '/public/prod/' + req.params.filename);
});

app.get('/libs/jquery.mixitup.min.js',function(req, res) {
   res.sendFile(__dirname + '/public/prod/libs/mixitup/jquery.mixitup.min.js');
});
app.get('/libs/angular.concat.js',function(req, res) {
   res.sendFile(__dirname + '/public/prod/libs/angular/angular.concat.js');
});
app.get('/libs/imagesloaded.pkgd.min.js',function(req, res) {
   res.sendFile(__dirname + '/public/prod/libs/imagesloaded/imagesloaded.pkgd.min.js');
});
app.get('/libs/masonry.pkgd.min.js',function(req, res) {
   res.sendFile(__dirname + '/public/prod/libs/masonry/masonry.pkgd.min.js');
});
app.get('/libs/bootstrap.min.js',function(req, res) {
   res.sendFile(__dirname + '/public/prod/libs/bootstrap/js/bootstrap.min.js');
});
app.get('/libs/jquery.js',function(req, res) {
   res.sendFile(__dirname + '/public/prod/libs/jquery/jquery.js');
});
app.get('/libs/bootstrap.min.css',function(req, res) {
   res.sendFile(__dirname + '/public/prod/libs/bootstrap/css/bootstrap.min.css');
});
app.get('/css/style.min.css',function(req, res) {
   res.sendFile(__dirname + '/public/prod/css/style.min.css');
});
app.get('/libs/font-awesome.min.css',function(req, res) {
   res.sendFile(__dirname + '/public/prod/libs/font-awesome/css/font-awesome.min.css');
});



app.get('/admin/*', function (req, res) {
   res.sendFile(__dirname + '/public/admin/views/index.html');
})

http.listen(port, function() {
   console.log('Gulp is running on PORT : ' + port);    
});