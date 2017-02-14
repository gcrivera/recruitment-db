var app = require('../app');
var config = require('../config');
var utils = require('../utils/utils');

var Linkedin = (function() {
  var that = {};

  that.makeArray = function(string, callback) {
    var stringArr = string.split('\r');
    stringArr.shift();
    var contactArr = [];
    stringArr.map(function(val, idx) {
      if (val) {
        val = val.replace(',,', ', ,');
        val = val.replace(',,', ', ,');
        var contact = val.match(/(([^,"]+|"[^"]*")|(\s))+/g);
        contact = contact.map(function(itm) {
          var quote = "'";
          if (itm.split(quote).length == 2) itm = itm.replace(quote, "''");
          else if (itm.split(quote).length == 3) {
            var arr = itm.split(quote);
            itm = arr[0].concat("''").concat(arr[1]).concat("''").concat(arr[2]);
          }
          return quote.concat(itm).concat(quote);
        });
        contactArr.push(contact);
      }
      if (idx == stringArr.length - 1) callback(contactArr);
    });
  }

  that.buildUploadQuery = function(contacts, callback) {
    var query = 'INSERT INTO linkedin (firstname, lastname, email, company, position, connection) VALUES';
    contacts.map(function(val, idx) {
      if (idx == contacts.length - 1) {
        query = query.concat(' (' + val[0] + ', ' + val[1] + ', ' + val[2] +', ' + val[3] +', ' + val[4] +', ' + val[5] + ')');
        callback(query);
      } else query = query.concat(' (' + val[0] + ', ' + val[1] + ', ' + val[2] +', ' + val[3] +', ' + val[4] +', ' + val[5] + '),');
    });
  }

  that.uploadContacts = function(contacts, callback) {
    that.makeArray(contacts, function(contacts) {
      that.buildUploadQuery(contacts, function(query) {
        app.client.query(query, function(err, result) {
          if (err) callback({success: false, err: err});
          else callback({success: true, result: result});
        });
      });
    });
  }

  that.deleteContacts = function(callback) {
    app.client.query('DELETE FROM linkedin', function(err, result) {
      if (err) callback({success: false, err: err});
      else callback({success: true, result: result});
    });
  }

  that.clean = function(params, callback) {
    var cleanParams = {};
    Object.keys(params).map(function(val, idx) {
      var keyVal = params[val];
      if (keyVal && !(val == 'connection-sel')) {
        if (val == 'connection' && !Array.isArray(keyVal)) keyVal = [keyVal];
        cleanParams[val] = keyVal;
      }
    });
    callback(cleanParams);
  }

  that.buildSearchQuery = function(params, callback) {
    var query = 'SELECT * FROM linkedin WHERE';
    var queryArr = [];
    Object.keys(params).map(function(val, idx) {
      var inj = idx + 1;
      var keyVal = params[val];
      if (keyVal) {
        if (val == 'firstName' || val == 'lastName') {
          if (idx == Object.keys(params).length - 1) query = query.concat(' ' + val + '=$' + inj);
          else query = query.concat(' ' + val + '=$' + inj + ' AND');
          queryArr.push(keyVal);
        } else if (val == 'connection') {
          var placeholders = keyVal.map(function(item, i) {
            queryArr.push(item);
            return '$' + (i + inj);
          }).join(',');
          if (idx == Object.keys(params).length - 1) query = query.concat(' ' + val + ' IN (' + placeholders + ')');
          else query = query.concat(' ' + val + ' IN (' + placeholders + ') AND');
        } else {
          if (idx == Object.keys(params).length - 1) query = query.concat(' ' + val + ' LIKE $' + inj + '');
          else query = query.concat(' ' + val + ' LIKE $' + inj + ' AND');
          queryArr.push('%' + keyVal + '%');
        }
      }
    });
    callback({query: query, queryArr: queryArr});
  }

  that.findContacts = function(params, callback) {
    that.clean(params, function(params) {
      that.buildSearchQuery(params, function(data) {
        app.client.query(data.query, data.queryArr, function(err, result) {
          if (err) callback({success: false, err: err});
          else callback({success: true, result: result});
        });
      });
    });
  }

  Object.freeze(that);
  return that;
})();

exports.Linkedin = Linkedin;
