var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var pg = require('pg');
var config = require('./config');
var utils = require('./utils/utils');

// Require routes
var candidates = require('./routes/candidates');
var linkedin = require('./routes/linkedin');

var app = express();

// instantiate a new client
// the client will read connection information from
// the same environment variables used by postgres cli tools
var client = new pg.Client(config.dbConfig);

// Set up database connection
client.connect(function (err) {
  if (err) console.log(err);
  else console.log('Database connection successful...');
});

// Set up some middleware to use
process.env.PWD = process.cwd();
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(process.env.PWD, '/public/'), {
    extensions: ['html'],
}));

// Set up our routes
app.use('/candidates', candidates);
app.use('/linkedin', linkedin);

/*
  POST /login
  Request body:
    - password
  Response:
    - success: true if login succeeded; false otherwise
    - err: on error, an error message
*/
app.post('/login', function(req, res) {
  if (req.body.password == config.password) {
    res.cookie("session", true);
    utils.sendSuccessResponse(res);
  } else utils.sendErrorResponse(res, 403, 'Incorrect password!');
});

/*
  PUT /logout
  No request parameters
  Response:
    - success: true if logout succeeded; false otherwise
    - err: on error, an error message
    - err handled by the authentication middleware (never gets here if not logged in)
*/
app.put('/logout', function(req, res) {
  res.clearCookie('session');
  utils.sendSuccessResponse(res);
});

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on specified port...');
});

exports.client = client;
