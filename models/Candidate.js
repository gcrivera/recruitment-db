var app = require('../app');
var config = require('../config');
var utils = require('../utils/utils');

var Candidate = (function() {
  var that = {};

  that.checkFormat = function(candidate, query, queryArr, edit = true, callback) {
    if (edit) var start = 5;
    else var start = 4;
    if (!candidate.rating) candidate.rating = '';
    if (!candidate.date) candidate.date = null;
    if (!(candidate.linkedin.startsWith('http://') || candidate.linkedin.startsWith('https://')) && candidate.linkedin) {
      var http = 'http://';
      candidate.linkedin = http.concat(candidate.linkedin);
    }
    queryArr.push(candidate.linkedin);
    if (candidate.location) {
      candidate.location = candidate.location.split(',');
      var placeholders = candidate.location.map(function(item, i) {
        queryArr.push(item);
        var val = '$' + (start);
        start = start + 1;
        return val;
      }).join(',');
      if (edit) query = query.concat('location=ARRAY[' + placeholders + '], ');
      else query = query.concat('ARRAY[' + placeholders + '], ');
    } else {
      if (edit) query = query.concat('location=$' + start + ', ');
      else query = query.concat('$' + start + ', ')
      queryArr.push(null);
      start = start + 1;
    }

    if (candidate.businessUnit) {
      candidate.businessUnit = candidate.businessUnit.split(',');
      var placeholders = candidate.businessUnit.map(function(item, i) {
        queryArr.push(item);
        var val = '$' + (start);
        start = start + 1;
        return val;
      }).join(',');
      if (edit) query = query.concat('businessunit=ARRAY[' + placeholders + '], ');
      else query = query.concat('ARRAY[' + placeholders + '], ');
    } else {
      if (edit) query = query.concat('businessunit=$' + start + ', ');
      else query = query.concat('$' + start + ', ')
      queryArr.push(null);
      start = start + 1;
    }

    if(candidate.position) {
      candidate.position = candidate.position.split(',');
      var placeholders = candidate.position.map(function(item, i) {
        queryArr.push(item);
        var val = '$' + (start);
        start = start + 1;
        return val;
      }).join(',');
      if (edit) query = query.concat('position=ARRAY[' + placeholders + '], ');
      else query = query.concat('ARRAY[' + placeholders + '], ');
    } else {
      if (edit) query = query.concat('position=$' + start + ', ');
      else query = query.concat('$' + start + ', ')
      queryArr.push(null);
      start = start + 1;
    }

    if (candidate.metWith) {
      candidate.metWith = candidate.metWith.split(',');
      var placeholders = candidate.metWith.map(function(item, i) {
        queryArr.push(item);
        var val = '$' + (start);
        start = start + 1;
        return val;
      }).join(',');
      if (edit) query = query.concat('metwith=ARRAY[' + placeholders + '], ');
      else query = query.concat('ARRAY[' + placeholders + '], ');
    } else {
      if (edit) query = query.concat('metwith=$' + start + ', ');
      else query = query.concat('$' + start + ', ')
      queryArr.push(null);
      start = start + 1;
    }

    if (candidate.vertical) {
      candidate.vertical = candidate.vertical.split(',');
      var placeholders = candidate.vertical.map(function(item, i) {
        queryArr.push(item);
        var val = '$' + (start);
        start = start + 1;
        return val;
      }).join(',');
      if (edit) query = query.concat('vertical=ARRAY[' + placeholders + '], ');
      else query = query.concat('ARRAY[' + placeholders + '], ');
    } else {
      if (edit) query = query.concat('vertical=$' + start + ', ');
      else query = query.concat('$' + start + ', ')
      queryArr.push(null);
      start = start + 1;
    }

    if (candidate.company) {
      candidate.company = candidate.company.split(',');
      var placeholders = candidate.company.map(function(item, i) {
        queryArr.push(item);
        var val = '$' + (start);
        start = start + 1;
        return val;
      }).join(',');
      if (edit) query = query.concat('company=ARRAY[' + placeholders + '], ');
      else query = query.concat('ARRAY[' + placeholders + '], ');
    } else {
      if (edit) query = query.concat('company=$' + start + ', ');
      else query = query.concat('$' + start + ', ')
      queryArr.push(null);
      start = start + 1;
    }

    callback(candidate, query, queryArr, start);
  }

  that.createCandidate = function(candidate, callback) {
    var query = `INSERT INTO candidates
                    (firstname, lastname, linkedin, location, businessunit,
                     position, metwith, vertical, company, rating, employed, datemet, notes, source, resume)
                     VALUES ($1, $2, $3, `;
    var queryArr = [candidate.firstName, candidate.lastName];
    that.checkFormat(candidate, query, queryArr, false, function(candidate, query, queryArr, start) {
      var arr = [0, 1, 2, 3, 4, 5];
      arr.map(function(val) {
        if (val == 5) query = query.concat('$' + (start + val) + ')');
        else query = query.concat('$' + (start + val) + ', ');
      });
      queryArr.push(candidate.rating);
      queryArr.push(candidate.employed);
      queryArr.push(candidate.date);
      queryArr.push(candidate.notes);
      queryArr.push(candidate.source);
      queryArr.push(candidate.resume);
      app.client.query(query, queryArr, function(err, result) {
                      if (err) callback({success: false, err: err});
                      else callback({success: true, result: result});
                    });
    });
  }

  that.getCandidate = function(candidateId, callback) {
    app.client.query('SELECT * FROM candidates WHERE key=$1', [candidateId],
                    function(err, result) {
                      var candidate = result.rows[0];
                      Object.keys(candidate).map(function(val) {
                        if (Array.isArray(candidate[val])) {
                          candidate[val] = candidate[val][0].split(',');
                        }
                      });
                      if (err) callback({success: false, err: err});
                      else callback({success: true, result: result});
                    });
  }

  that.editCandidate = function(candidateId, candidate, callback) {
    var query = 'UPDATE candidates SET firstname=$2, lastname=$3, linkedin=$4, '
    var queryArr = [candidateId, candidate.firstName, candidate.lastName];
    that.checkFormat(candidate, query, queryArr, true, function(candidate, query, queryArr, start) {
      var arr = ['rating', 'datemet', 'notes', 'source', 'resume'];
      arr.map(function(val, idx) {
        if (idx == 4) query = query.concat('resume=$' + (start + idx) + ' WHERE key=$1');
        else query = query.concat(val + '=$' + (start + idx) + ', ');
      });
      queryArr.push(candidate.rating);
      queryArr.push(candidate.date);
      queryArr.push(candidate.notes);
      queryArr.push(candidate.source);
      queryArr.push(candidate.resume);
      app.client.query(query, queryArr, function(err, result) {
        console.log(err)
        console.log(query)
        console.log(queryArr)
                         if (err) callback({success: false, err: err});
                         else callback({success: true, result: result});
                      });
    });
  }

  that.deleteCandidate = function(candidateId, callback) {
    app.client.query(`DELETE FROM candidates WHERE key=$1`, [candidateId],
                    function(err, result) {
                      if (err) callback({success: false, err: err});
                      else callback({success: true, result: result});
                    });
  }

  that.clean = function(candidate, callback) {
    var cleanCandidate = {};
    Object.keys(candidate).map(function(val, idx) {
      var keyVal = candidate[val];
      if (val == 'createdFilter') {}
      else if (keyVal) {
        cleanCandidate[val] = keyVal;
      }
      if (idx == Object.keys(candidate).length - 1) {
        callback(cleanCandidate);
      }
    });
  }

  that.buildQuery = function(candidate, callback) {
    var query = 'SELECT * FROM candidates WHERE ';
    var queryArr = [];
    Object.keys(candidate).map(function(val, idx) {
      var keyVal = candidate[val];
      var inj = idx + 1;
      if (keyVal) {
        if (idx == 0) {
          if (val == 'location' || val == 'businessUnit' || val == 'position' || val == 'metWith' || val == 'vertical' || val == 'company') {
            if (!Array.isArray(keyVal)) keyVal = [keyVal];
            keyVal = keyVal[0].split(',');
            var placeholders = keyVal.map(function(item, i) {
              queryArr.push(item);
              return '$' + (i + inj);
            }).join(',');
            query = query.concat(val + ' && ARRAY[' + placeholders + ']');
          } else if (val == 'dateCreated') {
            var dateSplit = keyVal.split('-');
            var epochTime = Date.UTC(dateSplit[0], dateSplit[1], dateSplit[2]);
            if (candidate.createdFilter == 'after') {
              query = query.concat(val + ' > $' + inj + '::date');
            } else if (candidate.createdFilter == 'before') {
              query = query.concat(val + ' < $' + inj + '::date');
            } else {
              query = query.concat(val + ' = $' + inj + '::date');
            }
            queryArr.push(keyVal);
          } else {
            query = query.concat(val + '=$' + inj);
            queryArr.push(keyVal);
          }
        } else {
          if (val == 'location' || val == 'businessUnit' || val == 'position' || val == 'metWith' || val == 'vertical' || val == 'company') {
            if (!Array.isArray(keyVal)) keyVal = [keyVal];
            var placeholders = keyVal.map(function(item, i) {
              queryArr.push(item);
              return '$' + (i + inj);
            }).join(',');
            query = query.concat(' AND ' + val + ' && ARRAY[' + placeholders + ']');
          } else if (val == 'dateCreated') {
            if (candidate.createdFilter == 'after') {
              query = query.concat(' AND ' + val + ' > $' + inj + '::date');
            } else if (candidate.createdFilter == 'before') {
              query = query.concat(' AND ' + val + ' < $' + inj + '::date');
            } else {
              query = query.concat( ' AND ' + val + ' = $' + inj + '::date');
            }
            queryArr.push(keyVal);
          } else {
            query = query.concat(' AND ' + val + '=$' + inj);
            queryArr.push(keyVal);
          }
        }
      }
    });
    callback({query: query, queryArr: queryArr});
  }

  that.findCandidate = function(candidate, callback) {
    that.clean(candidate, function(cleanCandidate) {
      that.buildQuery(cleanCandidate, function(result) {
        if (Object.keys(cleanCandidate).length == 0) {
          result.query = 'SELECT * FROM candidates';
          result.queryArr = [];
        }
        app.client.query(result.query, result.queryArr,
          function(err, result) {
            if (err) callback({success: false, err: err});
            else {
              utils.sortCandidates(result.rows, function(candidates) {
                callback({success: true, result: candidates});
              });
            }
          });
      });
    });
  }

  Object.freeze(that);
  return that;

})();

exports.Candidate = Candidate;
