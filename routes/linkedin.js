var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Linkedin = require('../models/Linkedin');
var timeout = require('connect-timeout');

/*
  Require authentication on ALL access to /*
  Clients which are not logged in will receive a 403 error code.
*/
var requireAuthentication = function(req, res, next) {
  if (!req.cookies.session) {
    utils.sendErrorResponse(res, 403, 'Must be logged in to use this feature.');
  } else {
    next();
  }
};

router.post('/', requireAuthentication);
router.delete('/', requireAuthentication);
router.post('/find', requireAuthentication);

/*
  POST /linkedin
  Request body:
    - contacts
  Response:
    - success: true if adding contacts to the db succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/', function(req, res) {
  Linkedin.Linkedin.uploadContacts(req.body.contacts, function(data) {
    if (data.success) utils.sendSuccessResponse(res);
    else utils.sendErrorResponse(res, 400, data.err);
  });
});

/*
  DELETE /linkedin
  No request parameters
  Response:
    - success: true if db clear succeeded; false otherwise
    - err: on error, an error message
*/
router.delete('/', function(req, res) {
  Linkedin.Linkedin.deleteContacts(function(data) {
    if (data.success) utils.sendSuccessResponse(res);
    else utils.sendErrorResponse(res, 400, data.err);
  });
});

/*
  POST /linkedin/find
  Optional request body:
    - First Name
    - Last Name
    - Company
    - Position
    - Connection
  Response:
    - success: list of contact objects that meet the search criteria.
    - err: on error, an error message
*/
router.post('/find', function(req, res) {
  Linkedin.Linkedin.findContacts(req.body, function(data) {
    if (data.success) utils.sendSuccessResponse(res, data.result);
    else utils.sendErrorResponse(res, 404, data.err);
  });
});


module.exports = router;
