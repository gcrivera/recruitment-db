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

    var urlSplit = window.location.href.split('=');
    var candidateId = urlSplit[1];
    $.get('/candidates/' + candidateId, function(data) {
      var currentCandidate = data.content.rows[0];
      utils.fillForm(currentCandidate);

      locations = locations.concat(currentCandidate.location);
      businessUnits = businessUnits.concat(currentCandidate.businessunit);
      positions = positions.concat(currentCandidate.position);
      metWiths = metWiths.concat(currentCandidate.metwith);

      var deleteLocBtn = $('.delete-loc-btn');
      deleteLocBtn.click(function(event) {
        event.preventDefault();
        $(this).parent().remove();
        var index = locations.indexOf($(this).val());
        locations.splice(index, 1);
      });

      var deleteBUBtn = $('.delete-bu-btn');
      deleteBUBtn.click(function(event) {
        event.preventDefault();
        $(this).parent().remove();
        var index = businessUnits.indexOf($(this).val());
        businessUnits.splice(index, 1);
      });

      var deletePosBtn = $('.delete-pos-btn');
      deletePosBtn.click(function(event) {
        event.preventDefault();
        $(this).parent().remove();
        var index = positions.indexOf($(this).val());
        positions.splice(index, 1);
      });

      var deleteMetWithBtn = $('.delete-met-with-btn');
      deleteMetWithBtn.click(function(event) {
        event.preventDefault();
        $(this).parent().remove();
        var index = metWiths.indexOf($(this).val());
        metWiths.splice(index, 1);
      });

      var submitBtn = $('#submit-btn');
      submitBtn.click(function(event) {
        var candidateData = $("#edit-form").serializeArray();

        if (!window.FileReader) {
          alert('Uploading files is not supported by your browser!');
        } else {
          candidateData.push({name: 'location', value: locations});
          candidateData.push({name: 'businessUnit', value: businessUnits});
          candidateData.push({name: 'position', value: positions});
          candidateData.push({name: 'metWith', value: metWiths});
          candidateData.push({name: 'vertical', value: verticals});
          candidateData.push({name: 'company', value: companies});

          var $i = $('#resume');
          var input = $i[0];
          var file = input.files[0];
          if (file) {
            var fr = new FileReader();
            fr.onload = function() {
              candidateData.push({name: 'resume', value: fr.result});
              $.ajax({
                url: '/candidates/' + candidateId,
                type: 'PUT',
                data: candidateData,
                success: function(result) {
                    alert('Candidate information successfully updated!');
                    window.location.assign('search');
                }
              });
            }
            fr.readAsDataURL(file);
          } else {
            candidateData.push({name: 'resume', value: currentCandidate.resume});
            $.ajax({
              url: '/candidates/' + candidateId,
              type: 'PUT',
              data: candidateData,
              success: function(result) {
                  alert('Candidate information successfully updated!');
                  window.location.assign('search');
              }
            });
          }
        }
      });
    });

    var resetBtn = $('#reset-btn');
    resetBtn.click(function(event) {
      window.location.reload();
    });
  });
})();
