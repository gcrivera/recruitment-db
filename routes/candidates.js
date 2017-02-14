var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Candidate = require('../models/Candidate');

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
router.get('/:candidateId', requireAuthentication);
router.put('/:candidateId', requireAuthentication);
router.delete('/:candidateId', requireAuthentication);
router.post('/find', requireAuthentication);

/*
  POST /candidates
  Request body:
    - First Name
    - Last Name
    - Linkedin URL
    - Location
    - Business Unit
    - Position
    - Rating
    - Met With
    - Date of Last Meeting
    - Other Notes
    - Source
    - Resume
  Response:
    - success: true if candidate creation succeeded; false otherwise
    - err: on error, an error message
*/
router.post('/', function(req, res) {
  Candidate.Candidate.createCandidate(req.body, function(data) {
    if (data.success) utils.sendSuccessResponse(res);
    else utils.sendErrorResponse(res, 400, data.err);
  });
});

/*
  GET /candidates/:candidateId
  No request parameters
  Response:
    - success: object containing candidate information for specified id.
    - err: on error, an error message
*/
router.get('/:candidateId', function(req, res) {
  Candidate.Candidate.getCandidate(req.params.candidateId, function(data) {
    if (data.success) utils.sendSuccessResponse(res, data.result);
    else utils.sendErrorResponse(res, 404, data.err);
  });
});


/*
  PUT /candidates/:candidateId
  Optional request body:
    - First Name
    - Last Name
    - Linkedin URL
    - Location
    - Business Unit
    - Seniority
    - Rating
    - Met With
    - Date of Last Meeting
    - Other Notes
    - Source
    - Resume
  Response:
    - success: true if candidate information was successfully updated; false
      otherwise
    - err: on error, an error message
*/
router.put('/:candidateId', function(req, res) {
  Candidate.Candidate.editCandidate(req.params.candidateId, req.body, function(data) {
    if (data.success) utils.sendSuccessResponse(res);
    else utils.sendErrorResponse(res, 400, data.err);
  });
});

/*
  DELETE /candidates/:candidateId
  No request parameters
  Response:
    - success: true if candidate was successfully deleted; false otherwise
    - err: on error, an error message
*/
router.delete('/:candidateId', function(req, res) {
  Candidate.Candidate.deleteCandidate(req.params.candidateId, function(data) {
    if (data.success) utils.sendSuccessResponse(res);
    else utils.sendErrorResponse(res, 400, data.err);
  });
});

/*
  POST /candidates/find
  Optional request body:
    - First Name
    - Last Name
    - Location
    - Business Unit
    - Seniority
    - Rating
    - Met With
    - Date of Last Meeting
  Response:
    - success: list of candidate objects that meet the search criteria.
    - err: on error, an error message
*/
router.post('/find', function(req, res) {
  Candidate.Candidate.findCandidate(req.body, function(data) {
    if (data.success) utils.sendSuccessResponse(res, data.result);
    else utils.sendErrorResponse(res, 404, data.err);
  });
});

module.exports = router;
