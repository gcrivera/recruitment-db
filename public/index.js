(function() {
  $(function () {
    var signInBtn = $('#sign-in-btn');
    var password = $('#password');

    signInBtn.click(function(event) {
      $.post('login/', {password: password.val()}, function(data) {
        if (data.success) window.location.assign('home');
      }).fail(function() {
        alert('Incorrect password!');
        window.location.reload();
      });
    });

    password.keydown(function(event) {
      if (event.which == 13) {
        $.post('login/', {password: password.val()}, function(data) {
          if (data.success) window.location.assign('home');
        }).fail(function() {
          alert('Incorrect password!');
          window.location.reload();
        });
      }
    });
  });
})();
