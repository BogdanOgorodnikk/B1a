$(document).ready(function(){

    $('.pith-create__button').on('click', function(e) {
        e.preventDefault();
        $('p.register__error').remove();
        $('.register__error').removeClass('register__error');
        
        var data = {
            title: $('#pith-create__title').val(),
            number: $('#pith-create__number').val(),
            price: $('#pith-create__price').val(),
            data: $('#pith-create__data').val(),
            rosdb: $('#pith-create__rosdb').val(),
            client: $(".pith-create__headline").attr('id')
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/clientpiths/pith'
          }).done(function(data) {
              console.log(data);
            if(!data.ok) {
              $('.pith-create__form').before('<p class="register__error">' + data.error + '</p>');
            } else {
              location.reload();
            }
          });
      });
      $('#pith-edit__click').on('click', function(e) {
        e.preventDefault();
        
           var id = $('.pith-edit__id').attr('id');
           var title = $('#pith-edit__title').val();
           var number = $('#pith-edit__number').val();
           var price = $('#pith-edit__price').val();
           var data = $('#pith-edit__data').val();
           var rosdb = $('#pith-edit__rosdb').val();
           var math = $('#pith-edit__math').val();

           if(price < 0) {
            $('.user-edit__form').before('<p class="register__error">' + 'Ви ввели не правильне число в ціну' + '</p>');
        } else if(number < 0) {
            $('.user-edit__form').before('<p class="register__error">' + 'Ви ввели не правильне число в кількість' + '</p>');
        } else {
          $(location).attr('href', `${id}/${data}/${title}/${number}/${price}/${rosdb}/${math}`);
        }
      }); 

      var checkpith = document.querySelectorAll('.client-product__math--check');
      for(var i = 0; i < checkpith.length; i++) {
        checkpith[i].onclick = function() {
          var id = this.parentElement.id;
          var math = this.value;
          $(location).attr('href', `pithmath/${id}/${math}`)
        }
      }
    });