var Utils = (function() {

  var _utils = {};

  _utils.createNavBar = function() {
    var body = $('.html-body');
    var navbar = $('<div></div>').attr('class', 'navbar');

    body.prepend(navbar);
    navbar.append($('<button>Home</button>').attr('id', 'home-page-btn').attr('class', 'button navbar-btn'));
    navbar.append($('<button>Create</button>').attr('id', 'create-page-btn').attr('class', 'button navbar-btn'));
    navbar.append($('<button>Search</button>').attr('id', 'search-page-btn').attr('class', 'button navbar-btn'));
    navbar.append($('<button>Logout</button>').attr('id', 'logout-btn').attr('class', 'button navbar-btn'));

    // Set up click listener for creation button
    var logoutBtn = $("#logout-btn");
    logoutBtn.click(function(event) {
      $.ajax({
        url: '/logout/',
        type: 'PUT',
        success: function(result) {
            window.location.assign('/index');
        }
      });
    });

    // Set up click listener for home page button
    var homeBtn = $("#home-page-btn");
    homeBtn.click(function(event) {
      window.location.assign('/home');
    });

    // Set up click listener for create page button
    var createBtn = $("#create-page-btn");
    createBtn.click(function(event) {
      window.location.assign('create');
    });

    // Set up click listener for search page button
    var searchBtn = $("#search-page-btn");
    searchBtn.click(function(event) {
      window.location.assign('search');
    });
  }

  _utils.fillLoc = function() {
    var inputList = $('#location-list');
    var datalist = $('<datalist></datalist>').attr('id', 'locations');
    inputList.append(datalist);
    searchConfig.locations.map(function(val) {
      var option = $('<option></option>').attr('name', 'location').attr('value', val).attr('id', val);
      datalist.append(option);
    });
  }

  _utils.fillBusinessUnit = function() {
    var inputList = $('#business-unit-list');
    var datalist = $('<datalist></datalist>').attr('id', 'business-units');
    inputList.append(datalist);
    searchConfig.businessUnit.map(function(val) {
      var option = $('<option></option>').attr('name', 'business-unit').attr('value', val).attr('id', val);
      datalist.append(option);
    });
  }

  _utils.fillPosition = function() {
    var inputList = $('#position-list');
    var datalist = $('<datalist></datalist>').attr('id', 'positions');
    inputList.append(datalist);
    searchConfig.position.map(function(val) {
      var option = $('<option></option>').attr('name', 'position').attr('value', val).attr('id', val);
      datalist.append(option);
    });
  }

  _utils.fillRating = function() {
    var ratingSelect = $('#rating-sel');
    searchConfig.rating.map(function(val, idx) {
      var option = $('<option>' + val + '</option>').attr('value', val).attr('id', idx);
      ratingSelect.append(option);
    });
  };

  _utils.fillMetWith = function() {
    var inputList = $('#met-with-list');
    var datalist = $('<datalist></datalist>').attr('id', 'met-withs');
    inputList.append(datalist);
    searchConfig.metWith.map(function(val) {
      var option = $('<option></option>').attr('name', 'met-with').attr('value', val).attr('id', val);
      datalist.append(option);
    });
  }

  _utils.fillVertical = function() {
    var inputList = $('#vertical-list');
    var datalist = $('<datalist></datalist>').attr('id', 'verticals');
    inputList.append(datalist);
    searchConfig.vertical.map(function(val) {
      var option = $('<option></option>').attr('name', 'verticals').attr('value', val).attr('id', val);
      datalist.append(option);
    });
  }

  _utils.fillCompany = function() {
    var inputList = $('#company-list');
    var datalist = $('<datalist></datalist>').attr('id', 'companies');
    inputList.append(datalist);
    searchConfig.company.map(function(val) {
      var option = $('<option></option>').attr('name', 'companies').attr('value', val).attr('id', val);
      datalist.append(option);
    });
  }

  _utils.fillConnection = function() {
    var connection = $('#connection');
    names.map(function(val) {
      var option = $('<input>' + val + '</input>').attr('type', 'checkbox').attr('name', 'connection').attr('value', val).attr('id', val).attr('class', 'connection').attr('checked', 'checked');
      connection.append(option).append($('<br>'));
    });
  };

  _utils.checkConnections = function() {
    $('.connection').each(function() {
      $(this).prop('checked', 'checked');
    })
  }

  _utils.uncheckConnections = function() {
    $('.connection').each(function() {
      $(this).removeAttr('checked');
    })
  }

  _utils.createTable = function() {
    var resetBtn = $('#reset-btn');
    var table = $('<table></table>').attr('id', 'res-table');
    resetBtn.after(table);
    table.append($('<thead><tr><th>Looking for Work?</th><th>First Name</th><th>Last Name</th><th>LinkedIn</th><th>Vertical</th><th>Location</th><th>Business Unit</th><th>Position</th><th>Rating</th><th>Met With</th><th>Company</th><th>Date Met</th><th>Notes</th><th>Source</th><th>Resume</th><th>Edit</th><th>Delete</th></tr></thead>'));
  }

  _utils.createLinkedinTable = function() {
    var resetBtn = $('#reset-btn');
    var table = $('<table></table>').attr('id', 'linkedin-table');
    resetBtn.after(table);
    table.append($('<thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Company</th><th>Position</th><th>Connection</th></tr></thead>'));
  }

  _utils.showResults = function(candidates) {
    var table = $('#res-table');
    var body = $('<tbody></tbody>');
    table.append(body);
    candidates.map(function(val, idx) {
      Object.keys(val).map(function(itm) {
        if (!val[itm]) val[itm] = '';
      });
      var row = $('<tr></tr>');
      body.append(row);
      var deleteBtn = $('<button>Delete</button>').attr('id', val.key).attr('class', 'button delete-candidate-btn');
      var resume = $('<td><button class="button">View</button></td>').attr('id', 'resume-' + val.key);
      var edit = $('<td><button class="button">Edit</button></td>').attr('id', 'edit-' + val.key);
      var linkedin = $('<a target="_blank" href="'+ val.linkedin + '">' + val.linkedin + '</a>');

      row.append($('<td>' + val.employed + '</td>'));
      row.append($('<td>' + val.firstname + '</td>'));
      row.append($('<td>' + val.lastname + '</td>'));
      row.append($('<td></td>').append(linkedin));
      row.append($('<td>' + val.vertical + '</td>'));
      row.append($('<td>' + val.location + '</td>'));
      row.append($('<td>' + val.businessunit + '</td>'));
      row.append($('<td>' + val.position + '</td>'));
      row.append($('<td>' + val.rating + '</td>'));
      row.append($('<td>' + val.metwith + '</td>'));
      row.append($('<td>' + val.company + '</td>'));
      if (!val.datemet) row.append($('<td></td>'));
      else row.append($('<td>' + val.datemet.slice(0,10) + '</td>'));
      row.append($('<td>' + val.notes + '</td>'));
      row.append($('<td>' + val.source + '</td>'));
      row.append(resume);
      row.append(edit);
      row.append($('<td></td>').append(deleteBtn));

      resume.click(function(event) {
        event.preventDefault();
        if (!val.resume) alert('This candidate does not have a resume on file!');
        else window.open(val.resume);
      });

      edit.click(function(event) {
        event.preventDefault();
        window.location.assign('edit?id=' + val.key);
      });
    });
    table.DataTable({ dom: 'Bfrtip', buttons: [
        {
            extend: 'excel',
            text: 'Export to Excel',
            exportOptions: {
                modifier: {
                    page: 'all'
                }
            }
        }
    ]});
  }

  _utils.showLinkedinResults = function(contacts) {
    var table = $('#linkedin-table');
    var body = $('<tbody></tbody>');
    table.append(body);
    contacts.map(function(val, idx) {
      var row = $('<tr></tr>');

      body.append(row);
      row.append($('<td>' + val.firstname + '</td>'));
      row.append($('<td>' + val.lastname + '</td>'));
      row.append($('<td><a href=mailto:'+ val.email + '>' + val.email + '</td>'));
      row.append($('<td>' + val.company + '</td>'));
      row.append($('<td>' + val.position + '</td>'));
      row.append($('<td>' + val.connection + '</td>'));
    });
    table.DataTable({ dom: 'Bfrtip', buttons: [
        {
            extend: 'excel',
            text: 'Export to Excel',
            exportOptions: {
                modifier: {
                    page: 'all'
                }
            }
        }
    ]});
  }

  _utils.fillForm = function(candidate) {
    $('#first-name').attr('value', candidate.firstname);
    $('#last-name').attr('value', candidate.lastname);
    $('#linkedin').attr('value', candidate.linkedin);

    var verticalInput = $('#vertical-list');
    if (candidate.vertical && !(candidate.vertical[0] == "")) {
      candidate.vertical.map(function(val) {
        verticalInput.after($('<div class="filter">' + val + '<button class="delete-vertical-btn delete-btn" value="' + val + '">x</button></div>'));
      });
    }

    var locationInput = $('#location-list');
    if (candidate.location && !(candidate.location[0] == "")) {
      candidate.location.map(function(val) {
        locationInput.after($('<div class="filter">' + val + '<button class="delete-loc-btn delete-btn" value="' + val + '">x</button></div>'));
      });
    }

    var bUInput = $('#business-unit-list');
    if (candidate.businessunit && !(candidate.businessunit[0] == "")) {
      candidate.businessunit.map(function(val) {
        bUInput.after($('<div class="filter">' + val + '<button class="delete-bu-btn delete-btn" value="' + val + '">x</button></div>'));
      });
    }

    var positionInput = $('#position-list');
    if (candidate.position && !(candidate.position[0] == "")) {
      candidate.position.map(function(val) {
        positionInput.after($('<div class="filter">' + val + '<button class="delete-pos-btn delete-btn" value="' + val + '">x</button></div>'));
      });
    }

    $('#' + ratings[candidate.rating]).attr('selected', 'selected');

    var metWithInput = $('#met-with-list');
    if (candidate.metwith && !(candidate.metwith[0] == "")) {
      candidate.metwith.map(function(val) {
        metWithInput.after($('<div class="filter">' + val + '<button class="delete-met-with-btn delete-btn" value="' + val + '">x</button></div>'));
      });
    }

    var companyInput = $('#company-list');
    if (candidate.company && !(candidate.company[0] == "")) {
      candidate.company.map(function(val) {
        companyInput.after($('<div class="filter">' + val + '<button class="delete-company-btn delete-btn" value="' + val + '">x</button></div>'));
      });
    }

    var date = $('#date');
    if (candidate.datemet) date.attr('value', candidate.datemet.slice(0,10));

    if (candidate.employed) $('#employed-radio-yes').attr('checked', 'checked');
    else $('#employed-radio-no').attr('checked', 'checked');

    var notes = $('<textarea>' + candidate.notes + '</textarea>').attr('name', 'notes').attr('class', 'short-ans-box');
    var noteText = $('<p>Other Notes:</p>');
    date.after(noteText);
    noteText.append($('<br>'));
    noteText.append(notes);

    var source = $('<textarea>' + candidate.source + '</textarea>').attr('name', 'source').attr('class', 'short-ans-box');
    var sourceText = $('<p>Source:</p>');
    notes.after(sourceText);
    sourceText.append($('<br>'));
    sourceText.append(source);

    var resumeBtn = $('#current-resume-btn');
    resumeBtn.click(function(event) {
      event.preventDefault();
      if (!candidate.resume) alert('This candidate does not have a resume on file!');
      else window.open(candidate.resume);
    });
  }

  Object.freeze(_utils);
  return _utils;
});
