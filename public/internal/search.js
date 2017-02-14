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


    // Set up click listener for search button
    var searchBtn = $("#search-btn");
    searchBtn.click(function(event) {
      var table = $('#res-table');
      if (table.length) {
        $('#res-table_wrapper').remove();
      }
      // Pull search data from form
      var searchData = $("#search-form").serializeArray();
      searchData.push({name: 'location', value: locations});
      searchData.push({name: 'businessUnit', value: businessUnits});
      searchData.push({name: 'position', value: positions});
      searchData.push({name: 'metWith', value: metWiths});
      searchData.push({name: 'vertical', value: verticals});
      searchData.push({name: 'company', value: companies});

      $.post('/candidates/find', searchData, function(res) {
        utils.createTable();
        utils.showResults(res.content);

        var deleteBtn = $(".delete-candidate-btn");
        // Set up click listener for delete buttons
        deleteBtn.click(function(event) {
          event.preventDefault();
          var res = confirm('Are you sure you want to delete this contact?');
          if (res) {
            $.ajax({
              url: '/candidates/' + event.target.id,
              type: 'DELETE',
              success: function(result) {
                  alert('Candidate successfully deleted!');
                  window.location.reload();
              }
            });
          }
        });
      }).fail(function() {alert('Unable to complete search!')});
    });

    var resetBtn = $('#reset-btn');
    resetBtn.click(function(event) {
      window.location.reload();
    });

  });
})();
