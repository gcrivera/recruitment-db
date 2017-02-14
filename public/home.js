(function() {
  $(function () {
    if (!Cookies.get('session')) {
      window.location.assign('index');
    }
    var linkedinBtn = $('#linkedin-btn');
    var internalBtn = $('#internal-btn');
    var logoutBtn = $('#logout-btn');
    var homeBtn = $('#home-btn');

    homeBtn.click(function(event) {
      window.location.reload();
    });

    logoutBtn.click(function(event) {
      $.ajax({
        url: 'logout/',
        type: 'PUT',
        success: function(result) {
            window.location.assign('index');
        }
      });
    });

    internalBtn.click(function(event) {
      window.location.assign('/internal/search');
    });

    linkedinBtn.click(function(event) {
      window.location.assign('/linkedin/search');
    });
  });
})();
