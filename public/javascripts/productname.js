$(document).ready(function(){

    $('.productname__button--btn').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');
        
        var data = {
            title: $('.productname__form--input').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/productnames'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.new-table__form').before('<p class="register__error">' + data.error + '</p>');
            } else {
             $(location).attr('href', '/productnames');
            }
          });
      });

      $('.productnameedit__button--btn').on('click', function(e) {
        e.preventDefault();
        var id = $('.productnameedit__text').attr('id');
        var title = $('.productnameedit__line--input').val();

        $(location).attr('href', `edits/${id}/${title}`);
    });
});