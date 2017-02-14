var Utils = (function() {

  var _utils = {};

  /*
    Send a 200 OK with success:true in the request body to the
    response argument provided.
    The caller of this function should return after calling
  */
  _utils.sendErrorResponse = function(res, errorCode, error) {
    res.status(errorCode).json({
      success: false,
      err: error
    }).end();
  };

  /*
    Send an error code with success:false and error message
    as provided in the arguments to the response argument provided.
    The caller of this function should return after calling
  */
  _utils.sendSuccessResponse = function(res, content) {
    res.status(200).json({
      success: true,
      content: content
    }).end();
  };

  _utils.sortCandidates = function(candidates, callback) {
    var ratingComp = {
      'A+': 0,
      'A': 1,
      'A-': 2,
      'B+': 3,
      'B': 4,
      'B-': 5,
      'C+': 6,
      'C': 7,
      'C-': 8,
      'F': 9,
      'NA': 10
    }
    candidates.sort(function(a, b) {
      if (!a.rating) a.rating = 'NA';
      if (!b.rating) b.rating = 'NA';
      if (ratingComp[a.rating] < ratingComp[b.rating]) return -1;
      else if (ratingComp[a.rating] > ratingComp[b.rating]) return 1;
      else {
        aDate = Date.parse(a.datemet);
        bDate = Date.parse(b.datemet);
        if (aDate > bDate) return -1;
        else if (aDate < bDate) return 1;
        else return 0;
      }
    });
    callback(candidates);
  }

  Object.freeze(_utils);
  return _utils;

})();

module.exports = Utils;
