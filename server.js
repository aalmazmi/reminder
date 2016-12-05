require('rootpath')();
var express = require('express');
var app = express();
var database = require('config.json'); 			// load the database config
var morgan = require('morgan'); 		// log requests to the console (express4)
var cfenv = require('cfenv');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var Todo = require('./app/models/todo');
var mongo = require('mongoskin');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var mongoose = require('mongoose'); 					// mongoose for mongodb
mongoose.connect('mongodb://reminder:reminder@jello.modulusmongo.net:27017/h8ojodYp'); 	// connect to mongoDB database on modulus.io

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
//app.use(express.static(__dirname + '/app/account')); 				// set the static files location /public/img will be /img for users

app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
 
// routes

app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use(methodOverride());

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

require('./app/routes.js')(app);


 var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
// start server

