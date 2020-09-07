$(document).ready(function(){

    $('.opt__button--btn').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');
        
        var data = {
            opt: $('.opt__form--input').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/opts'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.new-table__form').before('<p class="register__error">' + data.error + '</p>');
            } else {
             $(location).attr('href', '/opts');
            }
          });
      });
      $('.optedit__button--btn').on('click', function(e) {
        e.preventDefault();
        var id = $('.optedit__text').attr('id');
        var opt = $('.optedit__line--input').val();

        $(location).attr('href', `edits/${id}/${opt}`);
    });
    });