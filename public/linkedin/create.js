(function() {
  $(function () {
    if (!Cookies.get('session')) {
      window.location.assign('index');
    }

    var utils = Utils();

    utils.createNavBar();

    var uploadBtn = $('#upload-btn');
    uploadBtn.click(function(event) {
      var $i = $('#csv');
      var input = $i[0];
      var file = input.files[0];
      if (file) {
        var fr = new FileReader();
        fr.onload = function() {
          $.post('/linkedin/', { contacts: fr.result }, function(data) {
            alert('Contacts successfully created!');
            window.location.reload();
          }).fail(function() {alert('Unable to create contacts!')});
        }
        fr.readAsText(file);
      } else {
        alert("No file selected!");
      }
    });
  });
})();
