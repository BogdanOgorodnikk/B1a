$(document).ready(function(){

    $('.client-button').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');
        
        var data = {
            headline: $('#client-headline').val(),
            post: $(".table__headline").attr('id'),
            owner: $(".create-client").attr('id')
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/tables/table'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.create-client__form').before('<p class="register__error">' + data.error + '</p>');
            } else {
              location.reload();
            }
          });
      });
      $('.editclient__button--click').on('click', function(e) {
        e.preventDefault();
        var id = $('.edittown__name').attr('id');
        var headline = $('.edittown__box--input').val();
      
        $(location).attr('href', `client/${id}/${headline}`);
      });
    });