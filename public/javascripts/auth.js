$(document).ready(function(){

  //clear
  $('input').on('focus', function() {
    $('p.register__error').remove();
    $('input').removeClass('register__error');
  });
  

  //register
  $('.register-button').on('click', function(e) {
    e.preventDefault();

    var data = {
      login: $('#register-login').val(),
      password: $('#register-password').val(),
      passwordConfirm: $('#register-password-confirm').val()
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/register'
    }).done(function(data) {
      if(!data.ok) {
        $('.sign-in__form').before('<p class="register__error">' + data.error + '</p>');
      } else {
        $(location).attr('href', '/');
      }
    });
  });

  //auth
  $('.login-button').on('click', function(e) {
    e.preventDefault();
    $('p.register__error').remove();
    $('.register__error').removeClass('register__error');

    var data = {
      login: $('#login-login').val(),
      password: $('#login-password').val()
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/login'
    }).done(function(data) {
      if(!data.ok) {
        $('.sign-in__form').before('<p class="register__error">' + data.error + '</p>');
      } else {
        $(location).attr('href', '/');
      }
    });
  });

});



