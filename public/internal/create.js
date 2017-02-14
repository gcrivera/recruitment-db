(function() {
  $(function () {
    if (!Cookies.get('session')) {
      window.location.assign('index');
    }

    var utils = Utils();

    utils.createNavBar();

    // Fill selecter boxes with options
    utils.fillVertical();
    utils.fillLoc();
    utils.fillBusinessUnit();
    utils.fillPosition();
    utils.fillRating();
    utils.fillMetWith();
    utils.fillCompany();

    var verticalInput = $('#vertical-list');
    var verticals = [];
    verticalInput.keydown(function(event) {
      if (event.which == 13) {
        event.preventDefault();
        verticals.push(verticalInput.val());
        verticalInput.after($('<div class="filter">' + verticalInput.val() + '<button class="delete-vertical-btn delete-btn" value="' + verticalInput.val() + '">x</button></div>'));
        verticalInput.val('');
        var deleteVerticalBtn = $('.delete-vertical-btn');
        deleteVerticalBtn.click(function(event) {
          event.preventDefault();
          $(this).parent().remove();
          var index = verticals.indexOf($(this).val());
          verticals.splice(index, 1);
        });
      }
    });

    var locInput = $('#location-list');
    var locations = [];
    locInput.keydown(function(event) {
      if (event.which == 13) {
        event.preventDefault();
        locations.push(locInput.val());
        locInput.after($('<div class="filter">' + locInput.val() + '<button class="delete-loc-btn delete-btn" value="' + locInput.val() + '">x</button></div>'));
        locInput.val('');
        var deleteLocBtn = $('.delete-loc-btn');
        deleteLocBtn.click(function(event) {
          event.preventDefault();
          $(this).parent().remove();
          var index = locations.indexOf($(this).val());
          locations.splice(index, 1);
        });
      }
    });

    var buInput = $('#business-unit-list');
    var businessUnits = [];
    buInput.keydown(function(event) {
      if (event.which == 13) {
        event.preventDefault();
        businessUnits.push(buInput.val());
        buInput.after($('<div class="filter">' + buInput.val() + '<button class="delete-bu-btn delete-btn" value="' + buInput.val() + '">x</button></div>'));
        buInput.val('');
        var deleteBUBtn = $('.delete-bu-btn');
        deleteBUBtn.click(function(event) {
          event.preventDefault();
          $(this).parent().remove();
          var index = businessUnits.indexOf($(this).val());
          businessUnits.splice(index, 1);
        });
      }
    });

    var positionInput = $('#position-list');
    var positions = [];
    positionInput.keydown(function(event) {
      if (event.which == 13) {
        event.preventDefault();
        positions.push(positionInput.val());
        positionInput.after($('<div class="filter">' + positionInput.val() + '<button class="delete-pos-btn delete-btn" value="' + positionInput.val() + '">x</button></div>'));
        positionInput.val('');
        var deletePosBtn = $('.delete-pos-btn');
        deletePosBtn.click(function(event) {
          event.preventDefault();
          $(this).parent().remove();
          var index = positions.indexOf($(this).val());
          positions.splice(index, 1);
        });
      }
    });

    var metWithInput = $('#met-with-list');
    var metWiths = [];
    metWithInput.keydown(function(event) {
      if (event.which == 13) {
        event.preventDefault();
        metWiths.push(metWithInput.val());
        metWithInput.after($('<div class="filter">' + metWithInput.val() + '<button class="delete-met-with-btn delete-btn" value="' + metWithInput.val() + '">x</button></div>'));
        metWithInput.val('');
        var deleteMetWithBtn = $('.delete-met-with-btn');
        deleteMetWithBtn.click(function(event) {
          event.preventDefault();
          $(this).parent().remove();
          var index = metWiths.indexOf($(this).val());
          metWiths.splice(index, 1);
        });
      }
    });

    var companyInput = $('#company-list');
    var companies = [];
    companyInput.keydown(function(event) {
      if (event.which == 13) {
        event.preventDefault();
        companies.push(companyInput.val());
        companyInput.after($('<div class="filter">' + companyInput.val() + '<button class="delete-company-btn delete-btn" value="' + companyInput.val() + '">x</button></div>'));
        companyInput.val('');
        var deleteVerticalBtn = $('.delete-vertical-btn');
        deleteVerticalBtn.click(function(event) {
          event.preventDefault();
          $(this).parent().remove();
          var index = companies.indexOf($(this).val());
          companies.splice(index, 1);
        });
      }
    });

    var dateMet = $('#date-met-input');
    dateMet.focus(function(event) {
      var today = new Date().toISOString();
      $(this).attr('type', 'date');
      $(this).attr('value', today.slice(0, 10));
    });

    // Set up click listener for create button
    var createBtn = $("#create-btn");
    createBtn.click(function(event) {
      // Pull search data from form
      var candidateData = $("#create-form").serializeArray();
      candidateData.push({name: 'location', value: locations});
      candidateData.push({name: 'businessUnit', value: businessUnits});
      candidateData.push({name: 'position', value: positions});
      candidateData.push({name: 'metWith', value: metWiths});
      candidateData.push({name: 'vertical', value: verticals});
      candidateData.push({name: 'company', value: companies});

      if (!window.FileReader) {
        alert('Uploading files is not supported by your browser!');
      } else {
        var $i = $('#resume');
        var input = $i[0];
        var file = input.files[0];
        if (file) {
          var fr = new FileReader();
          fr.onload = function() {
            candidateData.push({name: 'resume', value: fr.result});
            $.post('/candidates/', candidateData, function(data) {
              alert('Candidate successfully created!');
              window.location.reload();
            }).fail(function() {alert('Unable to create candidate!')});
          }
          fr.readAsDataURL(file);
        } else {
          $.post('/candidates/', candidateData, function(data) {
            alert('Candidate successfully created!');
            window.location.reload();
          }).fail(function() {alert('Unable to create candidate!')});
        }
      }
    });

    var resetBtn = $('#reset-btn');
    resetBtn.click(function(event) {
      window.location.reload();
    });
  });
})();
