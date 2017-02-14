(function() {
  $(function () {
    if (!Cookies.get('session')) {
      window.location.assign('index');
    }

    var utils = Utils();

    utils.createNavBar();
    utils.fillConnection();

    var deleteBtn = $('#bulk-del-btn');
    deleteBtn.click(function(event) {
      var res = confirm('Are you sure you want to delete all linkedin contacts?');
      if (res) {
        $.ajax({
          url: '/linkedin/',
          type: 'DELETE',
          success: function(result) {
              alert('Linkedin contacts successfully deleted!');
              window.location.reload();
          }
        });
      }
    });

    var connectionSelOn = $('#connection-sel-on');
    connectionSelOn.change(function() {
      utils.checkConnections();
    });
    var connectionSelOff = $('#connection-sel-off');
    connectionSelOff.change(function() {
      utils.uncheckConnections();
    });

    var searchBtn = $('#linkedin-search-btn');
    searchBtn.click(function(event) {
      var table = $('#linkedin-table');
      if (table.length) {
        $('#linkedin-table_wrapper').remove();
      }
      var searchData = $("#linkedin-search-form").serializeArray();
      $.post('/linkedin/find', searchData, function(res) {
        utils.createLinkedinTable();
        utils.showLinkedinResults(res.content.rows);
      });
    });

    var resetBtn = $('#reset-btn');
    resetBtn.click(function(event) {
      window.location.reload();
    });
  });
})();
