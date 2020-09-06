$(document).ready(function(){

    $('.firm__button--btn').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');
        
        var data = {
            title: $('.firm__form--input').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/firms'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.new-table__form').before('<p class="register__error">' + data.error + '</p>');
            } else {
             $(location).attr('href', '/firms');
            }
          });
      });
    });